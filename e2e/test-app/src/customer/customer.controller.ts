import { Controller } from '@nestjs/common';
import { InMemoryDBService, InjectInMemoryDBService, InMemoryDbEntityController } from '../../../../lib';
import { Customer } from './customer';

@Controller('api/customers')
export class CustomerController extends InMemoryDbEntityController<Customer> {

  constructor(
    @InjectInMemoryDBService('customer') protected readonly inMemoryDBService: InMemoryDBService<Customer>
  ) {
      super(inMemoryDBService);
    }

}
