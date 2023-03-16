import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { AbstractEntity } from '../../../core/entity/abstract.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
@Unique(['name'])
export class Category extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Product, (product: Product) => product.category)
  products: Product[];
}
