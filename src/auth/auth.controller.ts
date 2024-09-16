import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthRequest } from './dto/auth-request';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() request: AuthRequest, @Res() res: Response) {
    const token = await this.authService.validateUser(request);
    const user = await this.authService.validateToken(token);

    // Remove sensitive information from the user object.
    // Should maybe be done when signing the token to store sensitive information in the token.
    delete user.password;
    delete user.stripeCustomerId;

    if (!token) {
      throw new HttpException('Invalid Credentials', 401);
    }

    return res.send({ user, token });
  }

  @Public()
  @Post('validate')
  async validateToken(
    @Body() request: { token: string },
    @Res() res: Response,
  ) {
    const user = await this.authService.validateToken(request.token);

    return res.send({ user, isValid: !!user });
  }
}
