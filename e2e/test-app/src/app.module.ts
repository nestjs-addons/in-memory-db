import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '../../../lib';
import { AppController } from './';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { CustomerProductModule } from './customer-product/customer-product.module';

@Module({
  imports: [
    InMemoryDBModule.forFeature('product'),
    InMemoryDBModule.forFeature('customer'),
    InMemoryDBModule.forRoot(),
    ProductModule,
    CustomerProductModule,
  ],
  controllers: [AppController, ProductController],
  providers: [],
})
export class AppModule {}
