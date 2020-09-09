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

  describe('CRUD Operations for ', () => {
    const customer: Customer = {
      id: '1',
      firstName: 'Kamil',
      lastName: 'Myśliwiec',
      company: 'NestJs',
      title: 'Owner',
    };

    test('create', () => {
      // arrange
      const expectedResult = customer;

      // act
      jest.spyOn(controller, 'create').mockImplementation(() => expectedResult);

      // assert
      expect(controller.create(customer)).toBe(expectedResult);
    });

    test('getAll', () => {
      // arrange
      const expectedResult = [customer];

      // act
      jest
        .spyOn(controller, 'getMany')
        .mockImplementation(() => expectedResult);

      // assert
      expect(controller.getMany()).toBe(expectedResult);
    });

    test('get', () => {
      // arrange
      const expectResult = customer;

      // act
      jest.spyOn(controller, 'get').mockImplementation(() => expectResult);

      // assert
      expect(controller.get('1')).toBe(expectResult);
    });

    test('update', () => {
      // arrange
      customer.company = 'NestJS';
      const expectedResult = customer;

      // act
      jest.spyOn(controller, 'update').mockImplementation(() => expectedResult);

      // assert
      expect(controller.update(customer.id, { ...customer })).toBe(
        expectedResult,
      );
    });

    test('delete', () => {
      // arrange
      const expectedResult = null;

      // act
      jest.spyOn(controller, 'delete').mockImplementation(() => expectedResult);

      // assert
      expect(controller.delete('1')).toBe(expectedResult);
    });
  });
});
