import { MigrationInterface, QueryRunner } from 'typeorm';
import { Brand } from '../modules/brands/entities/brand.entity';
import { Category } from '../modules/categories/entities/category.entity';
import { Product } from '../modules/products/entities/product.entity';
import { getProductsFromDirectoryFiles } from '../core/functions/get-products-from-directory-files';

export class AddPcsAndCameras1677837622670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const productRepository = queryRunner.connection.getRepository(Product);
    const brandRepository = queryRunner.connection.getRepository(Brand);
    const categoryRepository = queryRunner.connection.getRepository(Category);
    const fetchedBrands = await brandRepository.find();
    const newBrands: Brand[] = [
      {
        id: undefined,
        image:
          'https://video.rozetka.com.ua/img_superportal/smartfony_tv_i_elektronika/brand/canon.jpg',
        name: 'canon',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      {
        id: undefined,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/9/95/Panasonic_logo.svg',
        name: 'panasonic',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      {
        id: undefined,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/d/d6/Logo_of_the_Eastman_Kodak_Company_%282006%E2%80%932016%29.svg',
        name: 'kodak',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
    ];
    const allBrands: Brand[] = [...fetchedBrands, ...newBrands];
    const categories: Category[] = [
      {
        name: 'фото і відео',
        image:
          'https://video.rozetka.com.ua/img_superportal/smartfony_tv_i_elektronika/foto_i_video.jpg',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        id: undefined,
      },
      {
        name: "Комп'ютери, неттопи, моноблоки",
        image:
          'https://video.rozetka.com.ua/img_superportal/kompyutery_i_noutbuki/kompyutery.png',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        id: undefined,
      },
    ];

    const pcs: Product[] = await getProductsFromDirectoryFiles(
      'src/data/pcs',
      categories[1],
      allBrands,
    );

    const cameras: Product[] = await getProductsFromDirectoryFiles(
      'src/data/cameras',
      categories[0],
      allBrands,
    );

    await brandRepository.save(newBrands);
    await categoryRepository.save(categories);
    await productRepository.save([...pcs, ...cameras]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
