import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { STRIPE_CLIENT } from 'src/stripe/constants';

@Injectable()
export class StripeService {
  stripeClient: Stripe;
  constructor(@Inject(STRIPE_CLIENT) private stripe: Stripe) {
    this.stripeClient = this.stripe;
  }
}
