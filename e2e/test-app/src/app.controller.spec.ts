import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { InMemoryDBService } from '../../../lib/services';
import { User } from './user';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';

describe('AppController', () => {
  let appController: AppController;
  let service: InMemoryDBService<User>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController, InMemoryDBModule],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
    service = app.get(InMemoryDBService);
  });

  describe('root', () => {
    // it('should return "Hello World!"', () => {
    //   expect(appController.getHello()).toBe('Hello World!');
    // });
  });
});
