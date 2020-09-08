import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { CustomerProductModule } from '../src/customer-product/customer-product.module';
import * as request from 'supertest';
import { Product } from '../src/product/product';
import { Customer } from '../src/customer/customer';

describe('ProductController & CustomerController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const fixture: TestingModule = await Test.createTestingModule({
      imports: [CustomerProductModule],
    }).compile();

    app = fixture.createNestApplication();
    await app.init();
  });

  describe('Verifies their are no records', () => {
    test('/api/products (GET) - Get All Products = []', () => {
      return request(app.getHttpServer())
        .get('/api/products')
        .expect(200)
        .expect([]);
    });

    test('/api/customers (GET) - Get All Customers = []', () => {
      return request(app.getHttpServer())
        .get('/api/customers')
        .expect(200)
        .expect([]);
    });
  });

  describe('Create, Update, Read & Delete Customers & Products', () => {
    const product: Product = {
      id: '1',
      name: 'Cheeseburger',
      cost: 3.99,
      units: 10000,
    };
    const customer: Customer = {
      id: '1',
      firstName: 'Kamil',
      lastName: 'Myśliwiec',
      company: 'NestJS',
      title: 'Founder',
    };

    describe('Create', () => {
      test('/api/products (POST) - Create Product 1', () => {
        return request(app.getHttpServer())
          .post('/api/products')
          .send(product)
          .expect(201)
          .expect(product);
      });

      test('/api/customers (POST) - Create Customer 1', () => {
        return request(app.getHttpServer())
          .post('/api/customers')
          .send(customer)
          .expect(201)
          .expect(customer);
      });
    });

    describe('Update', () => {
      test('/api/products/1 (PUT) - Update Product 1', () => {
        product.cost = 3.5;
        return request(app.getHttpServer())
          .put('/api/products/1')
          .send(product)
          .expect(200)
          .expect({});
      });

      test('/api/customers/1 (PUT) - Update Customer 1', () => {
        customer.title = 'CEO & Founder';
        return request(app.getHttpServer())
          .put('/api/customers/1')
          .send(customer)
          .expect(200)
          .expect({});
      });
    });

    describe('Get', () => {
      test('/api/products/1 (GET) - Get Product 1', () => {
        return request(app.getHttpServer())
          .get('/api/products/1')
          .expect(200)
          .expect(product);
      });

      test('/api/customers/1 (GET) - Get Customer 1', () => {
        return request(app.getHttpServer())
          .get('/api/customers/1')
          .expect(200)
          .expect(customer);
      });

      test('/api/products (GET) - Get All Products', () => {
        return request(app.getHttpServer())
          .get('/api/products')
          .expect(200)
          .expect([product]);
      });

      test('/api/customers (GET) - Get All Customers', () => {
        return request(app.getHttpServer())
          .get('/api/customers')
          .expect(200)
          .expect([customer]);
      });
    });

    describe('Delete', () => {
      test('/api/products/1 (DELETE) - Delete Products 1', () => {
        return request(app.getHttpServer())
          .delete('/api/products/1')
          .expect(200)
          .expect({});
      });

      test('/api/customers/1 (DELETE) - Delete Customer 1', () => {
        return request(app.getHttpServer())
          .delete('/api/customers/1')
          .expect(200)
          .expect({});
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
