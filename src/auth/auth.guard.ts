import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log(AuthGuard.name);
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      this.logger.warn('No authorization header');
      throw new UnauthorizedException('No authorization header');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      this.logger.warn('No token found');
      throw new UnauthorizedException('No token found');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      request.user = decoded;
      return true;
    } catch (error) {
      this.logger.error('Invalid token', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
