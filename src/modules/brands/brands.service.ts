import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { PageDto } from '../../shared/dto/page.dto';
import { ResponseModel } from '../../shared/models/response';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}
  create(createBrandDto: CreateBrandDto) {
    return 'This action adds a new brand';
  }

  async findAll() {
    const allBrands = await this.brandRepository
      .createQueryBuilder('brand')
      .getMany();
    return new PageDto(allBrands);
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
