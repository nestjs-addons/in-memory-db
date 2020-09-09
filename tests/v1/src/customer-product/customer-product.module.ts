import { Module } from '@nestjs/common';
import { InMemoryDBV1Module } from '../../../../lib';
import { ProductController } from '../product/product.controller';
import { CustomerController } from '../customer/customer.controller';

@Module({
  imports: [
    InMemoryDBV1Module.forFeature('customer'),
    InMemoryDBV1Module.forFeature('product'),
  ],
  controllers: [ProductController, CustomerController],
})
export class CustomerProductModule {}
