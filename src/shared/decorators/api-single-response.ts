import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { Product } from '../../modules/products/entities/product.entity';
import { Brand } from '../../modules/brands/entities/brand.entity';
import { ResponseModel } from '../models/response';
import { CategoryDto } from '../../modules/categories/dto/category.dto';

export const ApiSingleResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(ResponseModel, Product, Brand, CategoryDto),
    ApiOkResponse({
      description: 'Successfully received single entity',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseModel) },
          {
            properties: {
              data: {
                type: 'object',
                $ref: getSchemaPath(model),
              },
              meta: {
                type: 'object',
                nullable: true,
              },
            },
          },
        ],
      },
    }),
  );
};
