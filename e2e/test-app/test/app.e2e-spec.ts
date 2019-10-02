import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule, User } from '../src';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Verifies their are no records on creation', () => {
    test('/api/users (GET) - Get All Users = []', () => {
      return request(app.getHttpServer())
        .get('/api/users')
        .expect(200)
        .expect([]);
    });
    test('/api/user/:id (GET) Get User 1 = {}', () => {
      return request(app.getHttpServer())
        .get('/api/user/1')
        .expect(200)
        .expect({});
    });
  });

  describe('Create, Update, Read and Delete User', () => {
    const user: User = { id: 1, firstName: 'John', lastName: 'Doe' };

    test('/api/user (POST) - Create New User', () => {
      return request(app.getHttpServer())
        .post('/api/user')
        .send(user)
        .expect(201)
        .expect(user);
    });
    test('/api/user/1 (PUT) - Update User 1', () => {
      user.firstName = 'Jane';
      return request(app.getHttpServer())
        .put('/api/user/1')
        .send(user)
        .expect(200)
        .expect({});
    });
    test('/api/user/1 (GET) - Get User 1', () => {
      return request(app.getHttpServer())
        .get('/api/user/1')
        .expect(200)
        .expect(user);
    });
    test('/api/user/1 (DELETE) - Delete User 1', () => {
      return request(app.getHttpServer())
        .delete('/api/user/1')
        .expect(200)
        .expect({});
    });
    test('/api/users (GET) - Get All Users = []', () => {
      return request(app.getHttpServer())
        .get('/api/users')
        .expect(200)
        .expect([]);
    });
  });

  describe('Create, Update, Read, Delete Users Asyncronously', () => {
    const user: User = { id: 1, firstName: 'John', lastName: 'Doe' };

    test('/api/user/async (POST) - Create New User Async', () => {
      return request(app.getHttpServer())
        .post('/api/user/async')
        .send(user)
        .expect(201)
        .expect(user);
    });
    test('/api/user/1/async (PUT) - Updates User 1 Async', () => {
      user.firstName = 'Jane';
      return request(app.getHttpServer())
        .put('/api/user/1/async')
        .send(user)
        .expect(200)
        .expect({});
    });
    test('/api/user/1/async (GET) - Gets Updated User 1 Async', () => {
      return request(app.getHttpServer())
        .get('/api/user/1/async')
        .expect(200)
        .expect(user);
    });
    test('/api/user/1/async (DELETE) - Deletes User 1 Async', () => {
      return request(app.getHttpServer())
        .delete('/api/user/1/async')
        .expect(200)
        .expect({});
    });
  });

  describe('Create, Update Read & Delete 3 Users & Query By First & Last Name', () => {
    const user1: User = { id: 1, firstName: 'John', lastName: 'Doe' };
    const user2: User = { id: 2, firstName: 'Jane', lastName: 'Doe' };
    const user3: User = { id: 3, firstName: 'Joe', lastName: 'Shmoe' };

    test('/api/users (POST) - Create 3 Users', () => {
      return request(app.getHttpServer())
        .post('/api/users')
        .send([user1, user2, user3])
        .expect(201)
        .expect([user1, user2, user3]);
    });
    test('/api/users/firstName/Joe (GET) - Gets Users by First Name Joe', () => {
      return request(app.getHttpServer())
        .get('/api/users/firstName/Joe')
        .expect(200)
        .expect([user3]);
    });
    test('/api/users/lastName/Doe (GET) - Gets Users by Last Name Doe', () => {
      return request(app.getHttpServer())
        .get('/api/users/lastName/Doe')
        .expect(200)
        .expect([user1, user2]);
    });
    test('/api/users (PUT) - Update Users 1 and 2', () => {
      user1.lastName = 'Buck';
      user2.lastName = 'Buck';

      return request(app.getHttpServer())
        .put('/api/users')
        .send([user1, user2])
        .expect(200)
        .expect({});
    });
    test('/api/users (GET) - Gets All 3 Users', () => {
      return request(app.getHttpServer())
        .get('/api/users')
        .expect(200)
        .expect([user1, user2, user3]);
    });
    test('/api/users (DELETE) - Deletes All 3 Users', () => {
      return request(app.getHttpServer())
        .delete('/api/users')
        .send([1, 2, 3])
        .expect(200)
        .expect({});
    });
    test('/api/users (GET) - Gets All Users = []', () => {
      return request(app.getHttpServer())
        .get('/api/users')
        .expect(200)
        .expect([]);
    });
  });

  describe('Create, Update Read & Delete 3 Users & Query By First & Last Name Asyncronously', () => {
    const user1: User = { id: 1, firstName: 'John', lastName: 'Doe' };
    const user2: User = { id: 2, firstName: 'Jane', lastName: 'Doe' };
    const user3: User = { id: 3, firstName: 'Joe', lastName: 'Shmoe' };

    test('/api/users/async (POST) - Create 3 Users Asyncronously', () => {
      return request(app.getHttpServer())
        .post('/api/users/async')
        .send([user1, user2, user3])
        .expect(201)
        .expect([user1, user2, user3]);
    });
    test('/api/users/firstName/Joe/async (GET) - Gets Users by First Name Joe Asyncronously', () => {
      return request(app.getHttpServer())
        .get('/api/users/firstName/Joe/async')
        .expect(200)
        .expect([user3]);
    });
    test('/api/users/lastName/Doe/async (GET) - Gets Users by Last Name Doe Asyncronously', () => {
      return request(app.getHttpServer())
        .get('/api/users/lastName/Doe/async')
        .expect(200)
        .expect([user1, user2]);
    });
    test('/api/users/async (PUT) - Updates Users 1 and 2 Async', () => {
      return request(app.getHttpServer())
        .put('/api/users/async')
        .send([user1, user2])
        .expect(200)
        .expect({});
    });
    test('/api/users/async (GET) - Gets All 3 Users Async', () => {
      return request(app.getHttpServer())
        .get('/api/users/async')
        .expect(200)
        .expect([user1, user2, user3]);
    });
    test('/api/users/async (DELETE) - Deletes All 3 Users Async', () => {
      return request(app.getHttpServer())
        .delete('/api/users/async')
        .send([1, 2, 3])
        .expect(200)
        .expect({});
    });
    test('/api/users/async (GET) - Gets All Users Async = []', () => {
      return request(app.getHttpServer())
        .get('/api/users/async')
        .expect(200)
        .expect([]);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
