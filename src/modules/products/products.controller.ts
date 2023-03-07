import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import { ApiPaginatedResponse } from '../../shared/decorators/api-paginated-response';
import { ApiSingleResponse } from '../../shared/decorators/api-single-response';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   return this.productsService.create(createProductDto);
  // }

  // @Get()
  // findAll() {}

  @Get('most-popular')
  @ApiTags('most-popular')
  @ApiOperation({ summary: 'Retrieve most populars products' })
  @ApiPaginatedResponse(Product)
  mostPopularProducts() {
    return this.productsService.mostPopular();
  }

  @Get(':id')
  @ApiSingleResponse(Product)
  @ApiOperation({ summary: 'Retrieve product by id' })
  findOne(@Query('id') id: number) {
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
