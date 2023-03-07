import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiPaginatedResponse } from '../../shared/decorators/api-paginated-response';
import { Category } from './entities/category.entity';
import { ApiSingleResponse } from '../../shared/decorators/api-single-response';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseModel } from '../../shared/models/response';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // @Post()
  // create(@Body() createCategoryDto: CreateCategoryDto) {
  //   return this.categoriesService.create(createCategoryDto);
  // }

  @Get()
  @ApiOperation({ summary: 'Retrieve all categories' })
  @ApiPaginatedResponse(Category)
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiSingleResponse(Category)
  @ApiOperation({ summary: 'Retrieve category by id' })
  findOne(@Param('id') id: number): Promise<ResponseModel<Category>> {
    return this.categoriesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoriesService.update(+id, updateCategoryDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoriesService.remove(+id);
  // }
}
