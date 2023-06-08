import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { UtilityResponse } from 'src/shared/utility.type';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseMapperInterceptor<T> implements NestInterceptor<T, UtilityResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<UtilityResponse<T>> {
    const { statusCode } = context.switchToHttp().getResponse();

    return next.handle().pipe(map((data): UtilityResponse<T> => ({ data, statusCode, message: 'success' })));
  }
}
