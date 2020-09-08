import { Controller } from '@nestjs/common';
import {
  InMemoryDBV1Service,
  InjectInMemoryDBV1Service,
  InMemoryDBV1EntityController,
} from '../../../../lib';
import { Customer } from './customer';

@Controller('api/customers')
export class CustomerController extends InMemoryDBV1EntityController<Customer> {
  constructor(
    @InjectInMemoryDBV1Service('customer')
    protected readonly inMemoryDBService: InMemoryDBV1Service<Customer>,
  ) {
    super(inMemoryDBService);
  }
}
