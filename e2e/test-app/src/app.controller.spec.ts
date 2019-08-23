import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { User } from './user';
import { InMemoryDBModule } from '../../../lib';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController, InMemoryDBModule],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('can create instance', () => {
      expect(appController).toBeTruthy();
    });
  });
});
