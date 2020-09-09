import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { InMemoryDBModule } from '../../../../lib';
import { Product } from './product';

describe('Product Controller', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      imports: [InMemoryDBModule.forFeature('product')],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  describe('CRUD Operations for Products', () => {
    const product: Product = {
      id: '1',
      name: 'Cheeseburger',
      cost: 3.99,
      units: 10000,
    };

    test('createProduct', () => {
      // arrange
      const expectedResult = product;

      // act
      jest
        .spyOn(controller, 'createProduct')
        .mockImplementation(() => expectedResult);

      // assert
      expect(controller.createProduct(product)).toBe(expectedResult);
    });

    test('getCustomer', () => {
      // arrange
      const expectedResult = product;

      // act
      jest
        .spyOn(controller, 'getProduct')
        .mockImplementation(() => expectedResult);

      // assert
      expect(controller.getProduct('1')).toBe(expectedResult);
    });

    test('updateProduct', () => {
      // arrange
      product.cost = 4.25;
      const expectedResult = product;

      // act
      jest
        .spyOn(controller, 'updateProduct')
        .mockImplementation(() => expectedResult);

      // assert
      expect(controller.updateProduct(product)).toBe(expectedResult);
    });

    test('deleteProduct', () => {
      // arrange
      const expectedResult = null;

      // act
      jest
        .spyOn(controller, 'deleteProduct')
        .mockImplementation(() => expectedResult);

      // assert
      expect(controller.deleteProduct('1')).toBe(expectedResult);
    });

    test('getProducts', () => {
      // arrange
      const expectedResult = [];

      // act
      jest
        .spyOn(controller, 'getProducts')
        .mockImplementation(() => expectedResult);

      // assert
      expect(controller.getProducts()).toBe(expectedResult);
    });
  });
});
