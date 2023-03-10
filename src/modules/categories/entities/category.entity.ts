import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { AbstractEntity } from '../../../core/entity/abstract.entity';
import { Product } from '../../products/entities/product.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity()
@Unique(['name'])
export class Category extends AbstractEntity {
  @Column()
  @ApiResponseProperty()
  name: string;

  @Column()
  @ApiResponseProperty()
  image: string;

  @OneToMany(() => Product, (product: Product) => product.category)
  products: Product[];
}
