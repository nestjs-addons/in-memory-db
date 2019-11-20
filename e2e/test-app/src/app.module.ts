import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '../../../lib';
import { AppController } from './';
import { CustomerProductModule } from './customer-product/customer-product.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    InMemoryDBModule.forRoot(),
    ProductModule,
    CustomerProductModule,
  ],
  controllers: [AppController],

  providers: [],
})
export class AppModule {}
