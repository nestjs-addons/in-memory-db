import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '../../../../lib';
import { CustomerController } from './customer.controller';

@Module({
  imports: [InMemoryDBModule.forFeature('customer')],
  controllers: [CustomerController],
  providers: [],
})
export class CustomerModule {}
