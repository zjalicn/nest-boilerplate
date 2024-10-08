import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleProvider } from 'src/drizzle/drizzle.provider';
import * as schema from 'src/drizzle/schema';
import Stripe from 'stripe';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import { CheckoutSessionUrlData } from './types';
import { eq } from 'drizzle-orm';

@Injectable()
export class ShopService {
  stripeClient: Stripe;
  constructor(
    @Inject(DrizzleProvider) private readonly db: NodePgDatabase<typeof schema>,
    // @Inject(StripeService) private readonly stripe: StripeService,
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
  ) {
    this.stripeClient = this.stripe;
  }

  async createOrRetrieveCustomer(email: string) {
    // fetch customer from db

    // if customer exists, return customer id

    const customer = await this.stripeClient.customers.create({
      email,
    });

    // const user = await this.db.query.userTable.findFirst({
    //   where: eq(schema.userTable.email, email),
    // });

    // return user.stripeCustomerId;
    return customer.id;
  }

  async getBillingPortalLink(customerId: string) {
    const { url } = await this.stripeClient.billingPortal.sessions.create({
      customer: customerId,
      return_url: 'http://localhost:3000/',
    });

    return url;
  }

  async getCheckoutSessionUrl(data: CheckoutSessionUrlData) {
    const session = await this.stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer: data.customerId,
      mode: 'payment',
      success_url: data.success_url,
      cancel_url: data.cancel_url,
      line_items: [
        {
          price: data.priceId,
          quantity: data.quantity,
        },
      ],
    });

    return session;
  }
}
