import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Order } from '../../shared/constants/order';
import { PageOptionsDto } from '../../shared/dto/page-options.dto';
import { PageMetaDto } from '../../shared/dto/page-meta.dto';
import { PageDto } from '../../shared/dto/page.dto';
import { DEFAULT_PAGE_LIMIT } from '../../shared/constants/default-page-limit.constant';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async mostPopular() {
    const qBuilder = this.productRepository.createQueryBuilder('product');
    // const itemCount = await qBuilder.getCount();
    // const entities = await qBuilder
    //   .orderBy('product.rate', Order.DESC)
    //   .skip(pageOptionsDto.skip)
    //   .take(pageOptionsDto.take)
    //   .getMany();
    //
    // const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    //
    // return new PageDto(entities, pageMetaDto);
    return {
      data: await qBuilder
        .orderBy('product.rate', Order.DESC)
        .innerJoinAndSelect('product.brand', 'brand')
        .innerJoinAndSelect('product.category', 'category')
        .take(DEFAULT_PAGE_LIMIT)
        .getMany(),
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneOrFail({
      where: {
        id,
      },
      relations: { brand: true, category: true },
    });
    return {
      data: product,
    };
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
