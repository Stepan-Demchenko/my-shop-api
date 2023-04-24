import { Controller, Get, Param, Query } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { ApiPaginatedResponse } from '../../shared/decorators/api-paginated-response';
import { Brand } from './entities/brand.entity';
import { ApiSingleResponse } from '../../shared/decorators/api-single-response';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '../../shared/dto/page-options.dto';
import { BrandFilterDto } from './dto/brand-filter-dto';

@Controller('brands')
@ApiTags('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  @ApiQuery({ type: () => PageOptionsDto })
  @ApiQuery({ type: () => BrandFilterDto })
  @ApiPaginatedResponse(Brand)
  @ApiOperation({ summary: 'Retrieve brands' })
  findAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Query() brandFilterDto: BrandFilterDto,
  ) {
    return this.brandsService.findAll(pageOptionsDto, brandFilterDto);
  }

  @Get(':id')
  @ApiSingleResponse(Brand)
  @ApiOperation({ summary: 'Retrieve brand by id' })
  findOne(@Param('id') id: number) {
    return this.brandsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
  //   return this.brandsService.update(+id, updateBrandDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.brandsService.remove(+id);
  // }
}
