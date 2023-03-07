import { Controller, Get, Param } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { ApiPaginatedResponse } from '../../shared/decorators/api-paginated-response';
import { Brand } from './entities/brand.entity';
import { ApiSingleResponse } from '../../shared/decorators/api-single-response';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('brands')
@ApiTags('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  // @Post()
  // create(@Body() createBrandDto: CreateBrandDto) {
  //   return this.brandsService.create(createBrandDto);
  // }

  @Get()
  @ApiPaginatedResponse(Brand)
  @ApiOperation({ summary: 'Retrieve all brands' })
  findAll() {
    return this.brandsService.findAll();
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
