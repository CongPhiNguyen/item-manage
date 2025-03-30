// src/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';
// import { Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    // const request: Request = ctx.getRequest<Request>();
    const status: number = exception.getStatus() || 200;

    // Logging request details
    // console.error({
    //   statusCode: status,
    //   message: exception.message,
    //   path: request.url,
    //   method: request.method,
    //   timestamp: new Date().toISOString(),
    // });

    const responseBody: any = {
      status: {
        success: false,
        message: exception.message,
      },
      data: null,
    };

    response.status(status).json(responseBody);
  }
}
