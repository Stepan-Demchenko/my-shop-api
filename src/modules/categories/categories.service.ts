import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ResponseModel } from '../../shared/models/response';
import { PageDto } from '../../shared/dto/page.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async findAll() {
    const allCategories = await this.categoryRepository
      .createQueryBuilder('category')
      .loadRelationCountAndMap('category.productsCount', 'category.products')
      .getMany();
    return new PageDto(allCategories);
  }

  async findOne(id: number): Promise<ResponseModel<Category>> {
    const data = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.id = :id', { id })
      .loadRelationCountAndMap('category.productsCount', 'category.products')
      .getOneOrFail();
    return new ResponseModel(data);
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
