import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { InMemoryDBModule } from '../../../../lib';
import { Customer } from './customer';

describe('Customer Controller', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      imports: [InMemoryDBModule.forFeature('customer')],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  test('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  describe('CRUD Operations for Customer', () => {
    const customer: Customer = { id: 1, firstName: 'Kamil', lastName: 'Myśliwiec', company: 'NestJs', title: 'Owner' };

    test('createCustomer', () => {
      // arrange
      const expectedResult = customer;

      // act
      jest.spyOn(controller, 'createCustomer')
        .mockImplementation(() => expectedResult);

      // assert
      expect(controller.createCustomer(customer)).toBe(expectedResult);
    });

    test('getCustomers', () => {
      // arrange
      const expectedResult = [customer];

      // act
      jest.spyOn(controller, 'getCustomers')
        .mockImplementation(() => expectedResult);

      // assert
      expect(controller.getCustomers()).toBe(expectedResult);
    });

    test('updateCustomer', () => {
      // arrange
      customer.company = 'NestJS';
      const expectedResult = customer;

      // act
      jest.spyOn(controller, 'updateCustomer')
        .mockImplementation(() => expectedResult);

      // assert
      expect(controller.updateCustomer(customer)).toBe(expectedResult);
    });

    test('deleteCustomer', () => {
      // arrange
      const expectedResult = null;

      // act
      jest.spyOn(controller, 'deleteCustomer')
        .mockImplementation(() => expectedResult);

      // assert
      expect(controller.deleteCustomer(1)).toBe(expectedResult);
    });

    test('getCustomer', () => {
      // arrange
      const expectResult = customer;

      // act
      jest.spyOn(controller, 'getCustomer')
        .mockImplementation(() => expectResult);

      // assert
      expect(controller.getCustomer(1)).toBe(expectResult);
    });
  });
});
