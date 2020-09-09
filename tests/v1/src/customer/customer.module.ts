import { Module } from '@nestjs/common';
import { InMemoryDBV1Module } from '../../../../lib';
import { CustomerController } from './customer.controller';

@Module({
  imports: [InMemoryDBV1Module.forFeature('customer')],
  controllers: [CustomerController],
  providers: [],
})
export class CustomerModule {}
