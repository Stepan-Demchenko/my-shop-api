import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PageDto } from '../dto/page.dto';
import { Product } from '../../modules/products/entities/product.entity';
import { Brand } from '../../modules/brands/entities/brand.entity';
import { CategoryDto } from '../../modules/categories/dto/category.dto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(PageDto, Product, Brand, CategoryDto),
    ApiOkResponse({
      description: 'Successfully received model list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              status: {
                type: 'integer',
              },
            },
          },
        ],
      },
    }),
  );
};
