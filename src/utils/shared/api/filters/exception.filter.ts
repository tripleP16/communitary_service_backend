import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);
    const logger = new Logger();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    logger.error(
      `Status: ${status.toString()} message: ${typeof message === 'string' ? message : message['message']}`,
    );
    response.status(status).json({
      data: null,
      message: typeof message === 'string' ? message : message['message'],
      success: false,
      error: message,
    });
  }
}
