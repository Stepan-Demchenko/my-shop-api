import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { ApiPaginatedResponse } from '../../shared/decorators/api-paginated-response';
import { ApiSingleResponse } from '../../shared/decorators/api-single-response';
import { PageOptionsDto } from '../../shared/dto/page-options.dto';
import { PageDto } from '../../shared/dto/page.dto';
import { OrderDto } from '../../shared/dto/order.dto';
import { ProductsFilterDto } from './dto/products-filter.dto';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productsService.create(createProductDto);
  // }

  @Get()
  @ApiOperation({ summary: 'Retrieve all products by different conditions' })
  @ApiQuery({ type: () => ProductsFilterDto })
  @ApiQuery({ type: () => PageOptionsDto })
  @ApiPaginatedResponse(Product)
  findAll(
    @Query() productsFilter: ProductsFilterDto,
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() order: OrderDto,
  ): Promise<PageDto<Product>> {
    return this.productsService.findAll(productsFilter, pageOptionsDto, order);
  }

  @Get('popular')
  @ApiTags('popular')
  @ApiOperation({ summary: 'Retrieve most populars products' })
  @ApiPaginatedResponse(Product)
  mostPopularProducts() {
    return this.productsService.mostPopular();
  }

  @Get('search')
  @ApiTags('search')
  searchProducts(@Query('search') search: string) {
    return this.productsService.search(search);
  }

  @Get(':id')
  @ApiSingleResponse(Product)
  @ApiOperation({ summary: 'Retrieve product by id' })
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
