import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { InMemoryDBService, InjectInMemoryDBService } from '../../../../lib';
import { Product } from './product';

@Controller('api/')
export class ProductController {
  constructor(
    @InjectInMemoryDBService('product')
    private readonly inMemoryDBService: InMemoryDBService<Product>,
  ) {}

  @Get('products')
  getProducts(): Product[] {
    return this.inMemoryDBService.getAll();
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string): Product {
    return this.inMemoryDBService.get(id);
  }

  @Post('products')
  createProduct(@Body() product: Product): Product {
    return this.inMemoryDBService.create(product);
  }

  @Put('products/:id')
  updateProduct(@Body() product: Product): void {
    return this.inMemoryDBService.update(product);
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string): void {
    return this.inMemoryDBService.delete(id);
  }
}
