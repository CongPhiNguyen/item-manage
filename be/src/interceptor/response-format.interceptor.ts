import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseData<T> {
  status: {
    success: boolean;
    message?: string;
  };
  data: T;
}

@Injectable()
export class ResponseFormatInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: T) => {
        return {
          status: {
            success: true,
          },
          data: data,
        };
      }),
    );
  }
}
