import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { CustomerModule } from '../src/customer/customer.module';
import * as request from 'supertest';
import { Customer } from '../src/customer/customer';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const fixture: TestingModule = await Test.createTestingModule({
      imports: [CustomerModule],
    }).compile();

    app = fixture.createNestApplication();
    await app.init();
  });

  describe('Verifies their are no records', () => {
    test('/api/customers (GET) - Get All Customers = []', () => {
      return request(app.getHttpServer())
        .get('/api/customers')
        .expect(200)
        .expect([]);
    });
  });

  describe('Create, Update, Read & Delete Customer', () => {
    const customer: Customer = {
      id: '1',
      firstName: 'Kamil',
      lastName: 'Myśliwiec',
      company: 'NestJS',
      title: 'Founder',
    };

    test('/api/customers (POST) - Create Customer 1', () => {
      return request(app.getHttpServer())
        .post('/api/customers')
        .send(customer)
        .expect(201)
        .expect(customer);
    });

    test('/api/customers/1 (PUT) - Update Customer 1', () => {
      customer.title = 'CEO & Founder';
      return request(app.getHttpServer())
        .put('/api/customers/1')
        .send(customer)
        .expect(200)
        .expect({});
    });

    test('/api/customers/1 (GET) - Get Customer 1', () => {
      return request(app.getHttpServer())
        .get('/api/customers/1')
        .expect(200)
        .expect(customer);
    });

    test('/api/customers (GET) - Get All Customers', () => {
      return request(app.getHttpServer())
        .get('/api/customers')
        .expect(200)
        .expect([customer]);
    });

    test('/api/customers/1 (DELETE) - Delete Customer 1', () => {
      return request(app.getHttpServer())
        .delete('/api/customers/1')
        .expect(200)
        .expect({});
    });

    test('/api/customers (GET) - Get All Customers = []', () => {
      return request(app.getHttpServer())
        .get('/api/customers')
        .expect(200)
        .expect([]);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
