import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { ProductModule } from '../src/product/product.module';
import * as request from 'supertest';
import { Product } from '../src/product/product';

describe('ProductController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const fixture: TestingModule = await Test.createTestingModule({
            imports: [ProductModule],
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
    });

    describe('Create, Update, Read & Delete Products', () => {
        const product: Product = { id: 1, name: 'Cheeseburger', cost: 3.99, units: 10000 };

        test('/api/products (POST) - Create Product 1', () => {
            return request(app.getHttpServer())
                .post('/api/products')
                .send(product)
                .expect(201)
                .expect(product);
        });

        test('/api/products/1 (PUT) - Update Product 1', () => {
            product.cost = 3.5;
            return request(app.getHttpServer())
                .put('/api/products/1')
                .send(product)
                .expect(200)
                .expect({});
        });

        test('/api/products/1 (GET) - Get Product 1', () => {
            return request(app.getHttpServer())
                .get('/api/products/1')
                .expect(200)
                .expect(product);
        });

        test('/api/products/ (GET) - Get All Products', () => {
            return request(app.getHttpServer())
                .get('/api/products')
                .expect(200)
                .expect([product]);
        });

        test('/api/products/1 (DELETE) - Delete Product 1', () => {
            return request(app.getHttpServer())
                .delete('/api/products/1')
                .expect(200)
                .expect({});
        });

        test('/api/products (GET) - Get All Products = []', () => {
            return request(app.getHttpServer())
                .get('/api/products')
                .expect(200)
                .expect([]);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
