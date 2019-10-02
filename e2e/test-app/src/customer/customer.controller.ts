import { Controller, UseInterceptors } from '@nestjs/common';
import { InMemoryDBService, InjectInMemoryDBService, InMemoryDBEntityController as InMemoryDBEntityController } from '../../../../lib';
import { Customer } from './customer';
import { SimulatedDelayInterceptor } from '../../../../lib/interceptors/simulated-delay.interceptor';

@UseInterceptors(new SimulatedDelayInterceptor(50))
@Controller('api/customers')
export class CustomerController extends InMemoryDBEntityController<Customer> {

  constructor(
    @InjectInMemoryDBService('customer') protected readonly inMemoryDBService: InMemoryDBService<Customer>
  ) {
      super(inMemoryDBService);
    }

}
