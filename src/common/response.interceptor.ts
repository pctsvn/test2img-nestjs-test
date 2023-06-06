import {
  NestInterceptor,
  Logger,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';
import mapValues from 'lodash/mapValues';
import { ObjectId } from 'mongodb';

export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new Logger('ResponseInterceptor', {
    timestamp: true,
  });

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => this.signLinks(data)),
      map((data) => (data === undefined ? {} : data)),
      map((data) => {
        const req: Request = ctx.switchToHttp().getRequest();
        const res: Response = ctx.switchToHttp().getResponse();

        this.log(req, res);

        return data.data ||
          (res.getHeader('content-type') &&
            (res.getHeader('content-type') as string).includes('text/html'))
          ? data
          : { success: true, data };
      }),
    );
  }

  private log(req: Request, res: Response): void {
    const { method, url, ip, user } = req as any;
    const { statusCode } = res;

    this.logger.log(
      `${ip} ${user ? 'user' : '-'} ${
        user ? user._id : '-'
      } [${new Date().toISOString()}] "${method} ${url} HTTP/1.0" ${statusCode}`,
    );
  }

  private signLinks(data: any): any {
    switch (typeof data) {
      case 'object':
        if (data instanceof ObjectId) {
          return data.toHexString();
        }

        if (data instanceof Date) {
          return data;
        }

        if (Array.isArray(data)) {
          return data.map(this.signLinks.bind(this));
        }

        if (data) {
          return mapValues(data, this.signLinks.bind(this));
        }

        return data;
      case 'string':
        return data;
      default:
        return data;
    }
  }
}
