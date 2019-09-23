import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { InMemoryDBService, InjectInMemoryDBService } from '../../../../lib';
import { Customer } from './customer';

@Controller('api/')
export class CustomerController {
    constructor(@InjectInMemoryDBService('customer') private readonly inMemoryDBService: InMemoryDBService<Customer>) { }

    @Get('customers')
    getCustomers(): Customer[] {
        return this.inMemoryDBService.getAll();
    }

    @Get('customers/:id')
    getCustomer(@Param('id') id: number): Customer {
        return this.inMemoryDBService.get(id);
    }

    @Post('customers')
    createCustomer(@Body() customer: Customer): Customer {
        return this.inMemoryDBService.create(customer);
    }

    @Put('customers/:id')
    updateCustomer(@Body() customer: Customer): void {
        return this.inMemoryDBService.update(customer);
    }

    @Delete('customers/:id')
    deleteCustomer(@Param('id') id: number): void {
        return this.inMemoryDBService.delete(id);
    }
}
