//to main same error format in application

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

//https://stackoverflow.com/a/75957306/18077529
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const res: any = exception.getResponse();
    const status = exception.getStatus();

    let message = res;
    if (res.message) {
      message =Array.isArray(res.message)?res.message.join(','):res.message;
    }
    // console.log('res is', res);
    response.status(status).json({
      status: status,
      message: message,
    });
  }
}
