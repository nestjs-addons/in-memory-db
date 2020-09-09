import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import {
  InMemoryDBV1Service,
  InjectInMemoryDBV1Service,
} from '../../../../lib';
import { Product } from './product';

@Controller('api/')
export class ProductController {
  constructor(
    @InjectInMemoryDBV1Service('product')
    private readonly inMemoryDBService: InMemoryDBV1Service<Product>,
  ) {}

  @Get('products')
  getProducts(): Product[] {
    return this.inMemoryDBService.getAll();
  }

  @Get('products/:id')
  getProduct(@Param('id') id: number): Product {
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
  deleteProduct(@Param('id') id: number): void {
    return this.inMemoryDBService.delete(id);
  }
}
