import { IsOptional } from 'class-validator';

export class BrandFilterDto {
  @IsOptional()
  categoryId: number;
}
