import { Module } from '@nestjs/common';
import { InMemoryDBV1Module } from '../../../lib';
import { AppController } from './';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { CustomerProductModule } from './customer-product/customer-product.module';

@Module({
  imports: [
    InMemoryDBV1Module.forFeature('product'),
    InMemoryDBV1Module.forFeature('customer'),
    InMemoryDBV1Module.forRoot(),
    ProductModule,
    CustomerProductModule,
  ],
  controllers: [AppController, ProductController],
  providers: [],
})
export class AppModule {}
