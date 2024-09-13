import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthRequest } from './dto/auth-request';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';

// @Public() // either add the public decorator per route
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // or add the public decorator per method
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() request: AuthRequest) {
    const token = this.authService.validateUser(request);

    if (!token) {
      throw new HttpException('Invalid Credentials', 401);
    }
    return token;
  }
}
