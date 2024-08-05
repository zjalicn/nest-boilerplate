import { Injectable } from '@nestjs/common';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class ProductService extends StripeService {
  async findAll() {
    const products = await this.stripeClient.products.list({
      limit: 10,
    });
    return products;
  }

  async findOne(id: string) {
    const product = await this.stripeClient.products.retrieve(id);
    return product;
  }
}
