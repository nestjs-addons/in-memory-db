import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { User } from 'src/user';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Verifies their are no records on creation', () => {
    it('/api/users (GET) - Get All Users = []', () => {
      return request(app.getHttpServer())
        .get('/api/users')
        .expect(200)
        .expect([]);
    });
    it('/api/user/:id (GET) Get User 1 = {}', () => {
      return request(app.getHttpServer())
        .get('/api/user/1')
        .expect(200)
        .expect({});
    });
  });

  describe('Create, Update, Read and Delete User', () => {
    const user: User = { id: 1, firstName: 'John', lastName: 'Doe' };

    it('/api/user (POST) - Create New User', () => {
      return request(app.getHttpServer())
        .post('/api/user')
        .send(user)
        .expect(201)
        .expect(user);
    });
    it('/api/user/1 (PUT) - Update User 1', () => {
      user.firstName = 'Jane';
      return request(app.getHttpServer())
        .put('/api/user/1')
        .send(user)
        .expect(200)
        .expect({});
    });
    it('/api/user/1 (GET) - Get User 1', () => {
      return request(app.getHttpServer())
        .get('/api/user/1')
        .expect(200)
        .expect(user);
    });
    it('/api/user/1 (DELETE) - Delete User 1', () => {
      return request(app.getHttpServer())
        .delete('/api/user/1')
        .expect(200)
        .expect({});
    });
    it('/api/users (GET) - Get All Users = []', () => {
      return request(app.getHttpServer())
        .get('/api/users')
        .expect(200)
        .expect([]);
    });
  });

  describe('Create, Update Read & Delete 3 Users & Query By First & Last Name', () => {
    const user1: User = { id: 1, firstName: 'John', lastName: 'Doe' };
    const user2: User = { id: 2, firstName: 'Jane', lastName: 'Doe' };
    const user3: User = { id: 3, firstName: 'Joe', lastName: 'Shmoe' };

    it('/api/users (POST) - Create 2 Users', () => {
      return request(app.getHttpServer())
        .post('/api/users')
        .send([user1, user2, user3])
        .expect(201)
        .expect([user1, user2, user3]);
    });
    it('/api/users/firstName/Joe (GET) - Gets Users by First Name Joe', () => {
      return request(app.getHttpServer())
        .get('/api/users/firstName/Joe')
        .expect(200)
        .expect([user3]);
    });
    it('/api/users/lastName/Doe (GET) - Gets Users by Last Name Doe', () => {
      return request(app.getHttpServer())
        .get('/api/users/lastName/Doe')
        .expect(200)
        .expect([user1, user2]);
    });
    it('/api/users (PUT) - Update Users 1 and 2', () => {
      user1.lastName = 'Buck';
      user2.lastName = 'Buck';

      return request(app.getHttpServer())
        .put('/api/users')
        .send([user1, user2])
        .expect(200)
        .expect({});
    });
    it('/api/users (GET) - Gets All 3 Users', () => {
      return request(app.getHttpServer())
        .get('/api/users')
        .expect(200)
        .expect([user1, user2, user3]);
    });
    it('/api/users (DELETE) - Deletes All 3 Users', () => {
      return request(app.getHttpServer())
        .delete('/api/users')
        .send([1, 2, 3])
        .expect(200)
        .expect({});
    });
    it('/api/users (GET) - Gets All Users = []', () => {
      return request(app.getHttpServer())
        .get('/api/users')
        .expect(200)
        .expect([]);
    });
  });
});
