import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { eq } from 'drizzle-orm';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import Stripe from 'stripe';

@Injectable()
export class EventHandlerService extends DrizzleService {
  // @OnEvent('product.created', { async: true })
  // async createProductReference(message: Stripe.Product) {
  //   const stripeProductId = message.id;
  //   const userId = '0';

  //   const result = this.db.insert(productReferenceTable).values({
  //     stripeProductId,
  //     userId,
  //   });

  //   console.log(
  //     `Create Product Reference for product with Id ${stripeProductId}`,
  //   );
  //   return result;
  // }

  // @OnEvent('price.created', { async: true })
  // async createPriceReference(message: Stripe.Price) {
  //   const { id, product, nickname } = message;

  //   const res = await this.db.insert(stripePrices).values({
  //     id,
  //     stripeProductId: product as string,
  //     description: nickname ?? undefined,
  //   });

  //   console.log(`Created Price Reference for price with Id ${id}`);
  //   return res;
  // }

  // @OnEvent('price.updated', { async: true })
  // async updatePriceReference(message: Stripe.Price) {
  //   const { id, product, nickname } = message;

  //   const price = await this.db.query.stripePrices.findFirst({
  //     where: eq(stripePrices.id, id),
  //   });

  //   if (price) {
  //     const res = await this.db.update(stripePrices).set({
  //       id,
  //       stripeProductId: product as string,
  //       description: nickname ?? undefined,
  //     });

  //     console.log(`Updated Price Reference for price with Id ${id}`);
  //     return res;
  //   }

  //   console.log(`Failed to update price with id: ${id}, table entry not found`);
  //   return null;
  // }

  @OnEvent('checkout.session.completed', { async: true })
  async handleCheckoutSessionCompleted(message: Stripe.Checkout.Session) {
    console.log('Checkout Session Completed');
    console.log(message);
    // do something with the event
  }
}
