import { Product } from '../../modules/products/entities/product.entity';
import { readdir, readFile } from 'fs/promises';

export async function extractProductsDataFromFile(
  directory: string,
): Promise<Pick<Product, 'description' | 'title' | 'images'>[]> {
  let result: Pick<Product, 'description' | 'title' | 'images'>[] = [];
  const files: string[] = await readdir(directory);
  const filesContent = await Promise.all(
    files.map((file: string) => {
      return readFile(directory + '/' + file, 'utf8');
    }),
  ).then((productsStr: Awaited<string>[]) => {
    return productsStr
      .map((productFileData: string) => JSON.parse(productFileData))
      .map((v) => JSON.parse(v));
  });
  result = filesContent.flat(1);
  return result;
}
