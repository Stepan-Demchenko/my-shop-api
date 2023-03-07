import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../../core/entity/shop-base.entity';
import { Brand } from '../../brands/entities/brand.entity';
import { Category } from '../../categories/entities/category.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity()
export class Product extends AbstractEntity {
  @ApiResponseProperty()
  @Column()
  title: string;

  @ApiResponseProperty()
  @Column({ type: 'int' })
  price: number;

  @ApiResponseProperty()
  @Column({ type: 'varchar' })
  description: string;

  @ApiResponseProperty()
  @Column({ type: 'int' })
  quantityInStock: number;

  @ApiResponseProperty()
  @Column('text', { array: true })
  images: string[];

  @ApiResponseProperty()
  @Column({ type: 'smallint' })
  rate: number;

  @ApiResponseProperty()
  @Column({ type: 'smallint' })
  discount: number;

  @ApiResponseProperty({ type: () => Brand })
  @ManyToOne(() => Brand, (brand: Brand) => brand.products)
  brand: Brand;

  @ApiResponseProperty({ type: () => Category })
  @ManyToOne(() => Category, (category: Category) => category.products)
  category: Category;
}
