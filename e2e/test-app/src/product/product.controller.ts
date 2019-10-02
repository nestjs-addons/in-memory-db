import { Controller, UseInterceptors } from '@nestjs/common';
import { InjectInMemoryDBService, InMemoryDBEntityController, InMemoryDBService } from '../../../../lib';
import { SimulatedDelayInterceptor } from '../../../../lib/interceptors/simulated-delay.interceptor';
import { Product } from './product';

@UseInterceptors(new SimulatedDelayInterceptor(1000))
@Controller('api/products')
export class ProductController extends InMemoryDBEntityController<Product> {
    constructor(
        @InjectInMemoryDBService('product') protected readonly inMemoryDBService: InMemoryDBService<Product>
    ) {
        super(inMemoryDBService);
    }
}
