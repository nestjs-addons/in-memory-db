import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '../../../../lib';
import { ProductController } from '../product/product.controller';
import { CustomerController } from '../customer/customer.controller';

@Module({
  imports: [
    InMemoryDBModule.forFeature('customer'),
    InMemoryDBModule.forFeature('product'),
  ],
  controllers: [ProductController, CustomerController],
})
export class CustomerProductModule {}
