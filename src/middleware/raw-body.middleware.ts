import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as rawBody from 'raw-body';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    rawBody(
      req,
      {
        encoding: 'utf-8',
      },
      (err, string) => {
        if (err) return next(err);
        req['rawBody'] = string;
        next();
      },
    );
  }
}
