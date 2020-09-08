import { Module } from '@nestjs/common';
import { InMemoryDBV1Module } from '../../../../lib';
import { ProductController } from './product.controller';

@Module({
  imports: [InMemoryDBV1Module.forFeature('product')],
  controllers: [ProductController],
})
export class ProductModule {}
