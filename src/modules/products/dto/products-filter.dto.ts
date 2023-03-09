import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumberString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductsFilterDto {
  @ApiProperty({ type: 'number' })
  @IsNumberString()
  readonly categoryId: number;

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) =>
    value
      .trim()
      .split(',')
      .map((id) => (id ? Number(id) : undefined)),
  )
  readonly brandIds: number[];
}
