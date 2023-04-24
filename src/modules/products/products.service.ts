import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Order } from '../../shared/constants/order';
import { DEFAULT_PAGE_LIMIT } from '../../shared/constants/default-page-limit.constant';
import { PageOptionsDto } from '../../shared/dto/page-options.dto';
import { PageMetaDto } from '../../shared/dto/page-meta.dto';
import { PageDto } from '../../shared/dto/page.dto';
import { OrderDto } from '../../shared/dto/order.dto';
import { ProductsFilterDto } from './dto/products-filter.dto';
import { SearchDto } from '../../shared/dto/search.dto';
import { ResponseModel } from '../../shared/models/response';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(
    productsFilter: ProductsFilterDto,
    pageOptionsDto: PageOptionsDto,
    order: OrderDto,
  ): Promise<PageDto<Product>> {
    const qBuilder = this.productRepository.createQueryBuilder('product');
    const baseQuery = qBuilder
      .innerJoinAndSelect('product.brand', 'brand')
      .where('product.category = :categoryId', {
        categoryId: productsFilter.categoryId,
      });

    if (productsFilter.brandIds) {
      baseQuery.andWhere('brand.id IN (:...ids)', {
        ids: productsFilter.brandIds,
      });
    }

    const [entities, itemsCount] = await baseQuery
      .orderBy('product.rate', order.orderByRate)
      .addOrderBy('product.createdAt', order.orderByDate)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.limit)
      .getManyAndCount();

    const pageMetaDto = new PageMetaDto({ itemsCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  async search(searchDto: SearchDto): Promise<PageDto<Product>> {
    const qBuilder = this.productRepository.createQueryBuilder('product');
    const [entities, itemsCount] = await qBuilder
      .where('product.title ILIKE :title', { title: `%${searchDto.search}%` })
      .innerJoinAndSelect('product.brand', 'brand')
      .innerJoinAndSelect('product.category', 'category')
      .skip(searchDto.skip)
      .take(searchDto.limit)
      .getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      itemsCount,
      pageOptionsDto: searchDto,
    });
    return new PageDto(entities, pageMetaDto);
  }

  async mostPopular(categoryId: number) {
    const qBuilder = this.productRepository.createQueryBuilder('product');
    const popularProducts = await qBuilder
      .where('product.category = :categoryId', { categoryId: categoryId })
      .orderBy('product.rate', Order.DESC)
      .innerJoinAndSelect('product.brand', 'brand')
      .innerJoinAndSelect('product.category', 'category')
      .take(DEFAULT_PAGE_LIMIT)
      .getMany();
    return new PageDto(popularProducts);
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneOrFail({
      where: {
        id,
      },
      relations: { brand: true, category: true },
    });
    return new ResponseModel(product);
  }

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
