import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { UserModule } from './user/user.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    StripeModule.forRoot(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    }),
    DrizzleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
