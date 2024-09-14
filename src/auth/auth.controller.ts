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

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() request: AuthRequest) {
    const token = await this.authService.validateUser(request);

    if (!token) {
      throw new HttpException('Invalid Credentials', 401);
    }
    return token;
  }
}
