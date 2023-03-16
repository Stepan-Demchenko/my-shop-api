import { ApiResponseProperty } from '@nestjs/swagger';
import { AbstractEntity } from '../../../core/entity/abstract.entity';

export class CategoryDto extends AbstractEntity {
  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  image: string;

  @ApiResponseProperty()
  productsCount: number;
}
