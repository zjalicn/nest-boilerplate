export class CreateCheckoutSessionDto {
  email: string;
  priceId: string;
  quantity: number;
  success_url: string;
  cancel_url: string;
}
