import { DynamicModule, Module, Provider } from '@nestjs/common';
import Stripe from 'stripe';
import { STRIPE_CLIENT } from './constants';

@Module({})
export class StripeModule {
  static forRoot(apiKey: string, config: Stripe.StripeConfig): DynamicModule {
    const stripeProvider: Provider = {
      provide: STRIPE_CLIENT,
      useValue: new Stripe(apiKey, config),
    };

    return {
      module: StripeModule,
      providers: [stripeProvider],
      exports: [stripeProvider],
      global: true,
    };
  }
}
