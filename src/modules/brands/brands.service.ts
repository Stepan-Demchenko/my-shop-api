import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { PageDto } from '../../shared/dto/page.dto';
import { ResponseModel } from '../../shared/models/response';
import { PageOptionsDto } from '../../shared/dto/page-options.dto';
import { BrandFilterDto } from './dto/brand-filter-dto';
import { PageMetaDto } from '../../shared/dto/page-meta.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}
  create(createBrandDto: CreateBrandDto) {
    return 'This action adds a new brand';
  }

  async findAll(
    pageOptionsDto: PageOptionsDto,
    brandFilterDto: BrandFilterDto,
  ) {
    const qBuilder = this.brandRepository.createQueryBuilder('brand');
    if (brandFilterDto.categoryId) {
      qBuilder
        .leftJoin('brand.products', 'product')
        .where('product.category.id = :categoryId', {
          categoryId: brandFilterDto.categoryId,
        });
    }
    const [entities, itemsCount] = await qBuilder
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.limit)
      .getManyAndCount();

    const pageMetaDto = new PageMetaDto({ itemsCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number) {
    const data = await this.brandRepository
      .createQueryBuilder('brand')
      .where('brand.id = :id', { id })
      .getOneOrFail();
    return new ResponseModel(data);
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
