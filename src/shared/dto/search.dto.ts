import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from './page-options.dto';

export class SearchDto extends PageOptionsDto {
  @ApiProperty()
  search: string;
}
