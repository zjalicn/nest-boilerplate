import { Body, Controller, Post } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session-dto';

@Controller('api/shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  async create(@Body() createCheckoutDto: CreateCheckoutSessionDto) {
    const { username, id, priceId, quantity, cancel_url, success_url } =
      createCheckoutDto;
    const customerId = await this.shopService.createOrRetrieveCustomer(
      username,
      id,
    );
    const session = await this.shopService.getCheckoutSessionUrl({
      customerId,
      priceId,
      quantity,
      success_url,
      cancel_url,
    });

    return session;
  }
}
