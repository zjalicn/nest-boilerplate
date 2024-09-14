import { Body, Controller, Post } from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller('api/shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  async create(@Body() req: any) {
    const customerId = await this.shopService.createOrRetrieveCustomer(
      'niko',
      '1',
    );
    const session = await this.shopService.getCheckoutSessionUrl({
      customerId,
      priceId: 'price_1PywkdKI5Vbl5VruKP5JLZhr',
      quantity: 1,
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    return session;
  }
}
