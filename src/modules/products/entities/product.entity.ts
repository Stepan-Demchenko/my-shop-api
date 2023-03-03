import { Column, Entity, ManyToOne } from 'typeorm';
import { ShopBaseEntity } from '../../../core/entity/shop-base.entity';
import { Brand } from '../../brands/entities/brand.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Product extends ShopBaseEntity {
  @Column()
  title: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'int' })
  quantityInStock: number;

  @Column('text', { array: true })
  images: string[];

  @Column({ type: 'smallint' })
  rate: number;

  @Column({ type: 'smallint' })
  discount: number;

  @ManyToOne(() => Brand, (brand: Brand) => brand.products)
  brand: Brand;

  @ManyToOne(() => Category, (category: Category) => category.products)
  category: Category;
}
