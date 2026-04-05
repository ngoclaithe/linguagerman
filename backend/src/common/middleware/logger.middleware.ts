import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, headers } = request;
    const startTime = Date.now();

    response.on('finish', () => {
      const { statusCode } = response;
      const duration = Date.now() - startTime;
      const range = headers['range'] || 'no-range';

      this.logger.log(
        `${method} ${originalUrl} ${statusCode} - Range: ${range} - ${duration}ms`,
      );
    });

    next();
  }
}
