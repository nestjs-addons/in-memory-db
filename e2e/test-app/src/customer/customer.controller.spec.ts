import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { InMemoryDBModule } from '../../../../lib';

describe('Customer Controller', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      imports: [InMemoryDBModule.forFeature('customer')],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
