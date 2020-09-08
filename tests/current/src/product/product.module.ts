import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '../../../../lib';
import { ProductController } from './product.controller';

@Module({
  imports: [InMemoryDBModule.forFeature('product')],
  controllers: [ProductController],
})
export class ProductModule {}
