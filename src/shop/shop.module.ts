import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { StripeModule } from 'src/stripe/stripe.module';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';

@Module({
  imports: [DrizzleModule, StripeModule],
  providers: [ShopService],
  controllers: [ShopController],
})
export class ShopModule {}
