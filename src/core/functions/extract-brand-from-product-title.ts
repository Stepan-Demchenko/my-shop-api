import { Brand } from '../../modules/brands/entities/brand.entity';

export function extractBrandFromProductTitle(
  title: string,
  brands: Brand[],
): string {
  const brandsName: string = brands.map((brand: Brand) => brand.name).join('|');
  const regex = new RegExp(brandsName, 'i');
  const match = title.match(regex);
  if (match) {
    return match[0].toLowerCase();
  }
  return null;
}
