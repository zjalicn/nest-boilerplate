import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { DrizzleService } from 'src/drizzle/drizzle.service';
import { productReferenceTable } from 'src/drizzle/schema';
import Stripe from 'stripe';

@Injectable()
export class EventHandlerService extends DrizzleService {
  @OnEvent('product.created', { async: true })
  async createProductReference(message: Stripe.Product) {
    const stripeProductId = message.id;
    const userId = '0';

    const result = this.db.insert(productReferenceTable).values({
      stripeProductId,
      userId,
    });
    console.log(
      `Create Product Reference for product with Id ${stripeProductId}`,
    );
    return result;
  }
}
