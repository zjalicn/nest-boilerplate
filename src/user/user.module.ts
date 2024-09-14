import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { ShopService } from 'src/shop/shop.service';

@Module({
  imports: [DrizzleModule],
  providers: [UserService, ShopService],
  controllers: [UserController],
})
export class UserModule {}
