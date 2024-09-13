import {
  Controller,
  Inject,
  Post,
  RawBodyRequest,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EventEmitter2 } from '@nestjs/event-emitter';
import Stripe from 'stripe';
import { STRIPE_CLIENT } from 'src/stripe/constants';
import { Public } from 'src/decorators/public.decorator';

@Controller('api/webhooks')
export class EventHandlerController {
  stripeClient: Stripe;

  constructor(
    @Inject(STRIPE_CLIENT) private stripe: Stripe,
    private eventEmitter: EventEmitter2,
  ) {
    this.stripeClient = this.stripe;
  }

  @Public()
  @Post('')
  async handleEvent(@Req() req: RawBodyRequest<Request>, @Res() res: Response) {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event: Stripe.Event;

    try {
      // Verify the event with Stripe's library
      event = this.stripeClient.webhooks.constructEvent(
        req.rawBody,
        sig!,
        webhookSecret,
      );
    } catch (err) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    const eventType = req.body.type;
    const eventBody = req.body.data.object;

    try {
      console.log('Emitting event: ', eventType);
      this.eventEmitter.emitAsync(eventType, eventBody);
      res.json({ received: true });
    } catch (err) {
      console.log(`Failed to process event: ${eventType}`, err);
      res.status(500).send(`Failed to process event: ${eventType}`);
    }
  }
}
