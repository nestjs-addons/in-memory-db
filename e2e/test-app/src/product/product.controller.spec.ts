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

  test('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
