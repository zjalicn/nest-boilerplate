import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NextFunction, Request } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(private readonly requestService: AuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(AuthMiddleware.name);
    next();
  }
}
