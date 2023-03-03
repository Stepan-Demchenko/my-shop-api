import { MigrationInterface, QueryRunner } from 'typeorm';
import { Product } from '../modules/products/entities/product.entity';
import { Brand } from '../modules/brands/entities/brand.entity';
import { Category } from '../modules/categories/entities/category.entity';
import { getProductsFromDirectoryFiles } from '../core/functions/get-products-from-directory-files';

export class AddProducts1677582468562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const productRepository = queryRunner.connection.getRepository(Product);
    const brandRepository = queryRunner.connection.getRepository(Brand);
    const categoryRepository = queryRunner.connection.getRepository(Category);
    const brands: Brand[] = [
      {
        id: undefined,
        image:
          'https://video.rozetka.com.ua/img_superportal/kompyutery_i_noutbuki/logo/apple.png',
        name: 'apple',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      {
        id: undefined,
        image:
          'https://video.rozetka.com.ua/img_superportal/kompyutery_i_noutbuki/logo/asus.png',
        name: 'asus',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      {
        id: undefined,
        image:
          'https://video.rozetka.com.ua/img_superportal/kompyutery_i_noutbuki/logo/acer.png',
        name: 'acer',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      {
        id: undefined,
        image:
          'https://video.rozetka.com.ua/img_superportal/kompyutery_i_noutbuki/logo/dell.png',
        name: 'dell',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      {
        id: undefined,
        image:
          'https://video.rozetka.com.ua/img_superportal/kompyutery_i_noutbuki/logo/hp.png',
        name: 'hp',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      {
        id: undefined,
        image:
          'https://video.rozetka.com.ua/img_superportal/kompyutery_i_noutbuki/logo/samsung.png',
        name: 'samsung',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      {
        id: undefined,
        image:
          'https://video.rozetka.com.ua/img_superportal/smartfony_tv_i_elektronika/brand/lg.jpg',
        name: 'lg',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      {
        id: undefined,
        image:
          'https://video.rozetka.com.ua/img_superportal/smartfony_tv_i_elektronika/brand/sony.jpg',
        name: 'sony',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
      {
        id: undefined,
        image:
          'https://video.rozetka.com.ua/img_superportal/smartfony_tv_i_elektronika/brand/philips.jpg',
        name: 'philips',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      },
    ];
    const categories: Category[] = [
      {
        name: 'ноутбуки',
        image:
          'https://video.rozetka.com.ua/img_superportal/kompyutery_i_noutbuki/noutbuki.png',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        id: undefined,
      },
      {
        name: 'мобільні телефони',
        image:
          'https://video.rozetka.com.ua/img_superportal/smartfony_tv_i_elektronika/mobilnye_telefony.jpg',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        id: undefined,
      },
      {
        name: 'телевізори',
        image:
          'https://video.rozetka.com.ua/img_superportal/smartfony_tv_i_elektronika/televizory.jpg',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        id: undefined,
      },
      {
        name: 'планшети',
        image:
          'https://video.rozetka.com.ua/img_superportal/smartfony_tv_i_elektronika/planshety.jpg',
        products: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        id: undefined,
      },
    ];

    const notebooks = await getProductsFromDirectoryFiles(
      'src/data/notebooks',
      categories[0],
      brands,
    );

    const phones = await getProductsFromDirectoryFiles(
      'src/data/phones',
      categories[1],
      brands,
    );

    const tabs = await getProductsFromDirectoryFiles(
      'src/data/tabs',
      categories[3],
      brands,
    );

    const tvs = await getProductsFromDirectoryFiles(
      'src/data/tvs',
      categories[2],
      brands,
    );
    await brandRepository.save(
      brands.sort((x, y) => x.name.localeCompare(y.name)),
    );
    await categoryRepository.save(
      categories.sort((x, y) => x.name.localeCompare(y.name)),
    );
    const products = [...notebooks, ...tvs, ...phones, ...tabs];
    await productRepository.save(products);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
