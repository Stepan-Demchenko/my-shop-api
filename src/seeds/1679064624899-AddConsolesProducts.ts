import { MigrationInterface, QueryRunner } from 'typeorm';
import { Product } from '../modules/products/entities/product.entity';
import { Brand } from '../modules/brands/entities/brand.entity';
import { Category } from '../modules/categories/entities/category.entity';
import { getProductsFromDirectoryFiles } from '../core/functions/get-products-from-directory-files';

export class AddConsolesProducts1679064624899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const productRepository = queryRunner.connection.getRepository(Product);
    const brandRepository = queryRunner.connection.getRepository(Brand);
    const categoryRepository = queryRunner.connection.getRepository(Category);
    const fetchedBrands = await brandRepository.find();
    const newBrands: Brand[] = [
      {
        id: undefined,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/0/0d/Nintendo.svg',
        name: 'nintendo',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      {
        id: undefined,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
        name: 'microsoft',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      {
        id: undefined,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/1/13/SEGA_logo.svg',
        name: 'sega',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
    ];
    const allBrands: Brand[] = [...fetchedBrands, ...newBrands];
    const categories: Category[] = [
      {
        name: 'ігрові консолі та дитячі приставки',
        image:
          'https://video.rozetka.com.ua/img_superportal/gaming/gaming-main/igrovye_pristavki.jpg',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        id: undefined,
      },
    ];

    const consoles: Product[] = await getProductsFromDirectoryFiles(
      'src/data/consoles',
      categories[0],
      allBrands,
    );

    await brandRepository.save(newBrands);
    await categoryRepository.save(categories);
    await productRepository.save(consoles);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
