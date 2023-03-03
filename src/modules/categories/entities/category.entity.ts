import { Column, Entity, OneToMany, Unique } from "typeorm";
import { ShopBaseEntity } from '../../../core/entity/shop-base.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
@Unique(['name'])
export class Category extends ShopBaseEntity {
  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Product, (product: Product) => product.category)
  products: Product[];
}
