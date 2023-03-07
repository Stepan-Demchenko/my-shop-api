import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResponseModel } from '../../shared/models/response';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseModel<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseModel<T>> {
    return next.handle().pipe(
      map(({ data, meta }) => {
        return {
          status: context.switchToHttp().getResponse().statusCode,
          data,
          meta,
        };
      }),
    );
  }
}
