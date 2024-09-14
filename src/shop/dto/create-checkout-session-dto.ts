export class CreateCheckoutSessionDto {
  username: string;
  id: string;
  priceId: string;
  quantity: number;
  success_url: string;
  cancel_url: string;
}
