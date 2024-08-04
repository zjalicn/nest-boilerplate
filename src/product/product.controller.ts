import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    try {
      return this.productService.findAll();
    } catch (error) {
      console.error('Error listing products:', error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.productService.findOne(id);
    } catch (error) {
      console.error(`Error listing product with Id ${id}`, error);
    }
  }
}
