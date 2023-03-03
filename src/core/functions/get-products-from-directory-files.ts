import { Category } from '../../modules/categories/entities/category.entity';
import { Brand } from '../../modules/brands/entities/brand.entity';
import { Product } from '../../modules/products/entities/product.entity';
import { extractProductsDataFromFile } from './extract-products-from-file';
import { extractBrandFromProductTitle } from './extract-brand-from-product-title';
import { faker } from '@faker-js/faker/locale/en';

export async function getProductsFromDirectoryFiles(
  pathToData: string,
  category: Category,
  brands: Brand[],
): Promise<Product[]> {
  const products: Pick<Product, 'description' | 'title' | 'images'>[] =
    await extractProductsDataFromFile(pathToData);

  return products.map(
    (product: Pick<Product, 'description' | 'title' | 'images'>) => {
      // Extract brand name from the title of product
      const brandName: string = extractBrandFromProductTitle(
        product.title,
        brands,
      );

      // find brand entity by the name
      const brand: Brand = brands.find(
        (savedBrand: Brand) => savedBrand.name.toLowerCase() === brandName,
      );
      return {
        ...product,
        title: product.title || faker.commerce.productDescription(),
        rate: +faker.commerce.price(0, 5),
        price: +faker.commerce.price(10000, 80000),
        discount: +faker.commerce.price(10, 80),
        quantityInStock: +faker.commerce.price(1000, 10000),
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        category,
        brand,
      };
    },
  );
}
