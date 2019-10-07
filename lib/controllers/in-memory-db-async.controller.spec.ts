import { InMemoryDBEntity } from '../interfaces';
import { inMemoryDBServiceFactory } from '../factories';
import { InMemoryDbEntityAsyncController } from './in-memory-db-async.controller';
import { InMemoryDBService } from '../services';

describe('In Memory DB Async Controller', () => {
  interface TestEntity extends InMemoryDBEntity {
    someField: string;
  }

  let controller: InMemoryDbEntityAsyncController<TestEntity>;
  let service: InMemoryDBService<TestEntity>;

  const sampleRecords: TestEntity[] = [
    { id: 1, someField: 'AAA' },
    { id: 2, someField: 'BBB' },
    { id: 3, someField: 'CCC' },
  ];

  class MockController extends InMemoryDbEntityAsyncController<TestEntity> {
    constructor(protected dbService: InMemoryDBService<TestEntity>) {
      super(dbService);
    }
  }

  beforeEach(() => {
    service = inMemoryDBServiceFactory<TestEntity>()();
    controller = new MockController(service);
  });

  describe('get', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'getAsync');
    });

    test('should call service getAsync spy when given valid id', () => {
      // act
      controller.get(1);
      // assert
      expect(spy).toHaveBeenCalledWith(1);
    });
  });

  describe('getMany', () => {
    test('should call service getManyAsync spy when given list of ids', () => {
      // arrange
      const spy = spyOn(service, 'getManyAsync');
      const testEntityMock = [1, 2, 3];
      // act
      controller.getMany(testEntityMock);
      // assert
      expect(spy).toHaveBeenCalledWith(testEntityMock);
    });

    test('should call service getAllAsync spy when no ids have been given', () => {
      // arrange
      const spy = spyOn(service, 'getAllAsync');
      // act
      controller.getMany();
      // assert
      expect(spy).toHaveBeenCalledWith();
    });
  });

  describe('create', () => {
    test('should call createAsync when given a valid record', () => {
      // arrange
      const spy = jest.spyOn(service, 'createAsync');
      const testEntityMock = sampleRecords[0];
      // act
      controller.create(testEntityMock);
      // assert
      expect(spy).toHaveBeenCalledWith(testEntityMock);
    });

    test('should call createManyAsync when given valid records list', () => {
      // arrange
      const spy = jest.spyOn(service, 'createManyAsync');
      // act
      controller.create(sampleRecords);
      // assert
      expect(spy).toHaveBeenCalledWith(sampleRecords);
    });
  });

  describe('update', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'updateAsync');
    });

    test('should call updateAsync when given a valid record and id', () => {
      // arrange
      const testEntityMock = { someField: 'DDD' };
      // act
      controller.update(1, testEntityMock);
      // assert
      expect(spy).toHaveBeenCalledWith({ id: 1, ...testEntityMock });
    });
  });

  describe('updateMany', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'updateManyAsync');
    });

    test('should call updateManyAsync when given valid records list', () => {
      // arrange
      const testEntityMock = sampleRecords;
      // act
      controller.updateMany(testEntityMock);
      // assert
      expect(spy).toHaveBeenCalledWith(testEntityMock);
    });
  });

  describe('delete', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'deleteAsync');
    });

    test('should call deleteAsync when give a valid id', () => {
      // act
      controller.delete(1);
      // assert
      expect(spy).toHaveBeenCalledWith(1);
    });
  });

  describe('deleteMany', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'deleteManyAsync');
    });

    test('should call deleteManyAsync when given valid ids list', () => {
      // arrange
      const testEntityMock = [1, 2, 3];
      // act
      controller.deleteMany(testEntityMock);
      // assert
      expect(spy).toHaveBeenCalledWith(testEntityMock);
    });
  });
});
