import { Body, Controller, Post } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session-dto';

@Controller('api/shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  async create(@Body() createCheckoutDto: CreateCheckoutSessionDto) {
    const { username, id } = createCheckoutDto;
    const customerId = await this.shopService.createOrRetrieveCustomer(
      username,
      id,
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
