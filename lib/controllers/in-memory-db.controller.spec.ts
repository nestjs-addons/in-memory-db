import { InMemoryDBEntity } from '../interfaces';
import { inMemoryDBServiceFactory } from '../factories';
import { InMemoryDbEntityController } from './in-memory-db.controller';
import { InMemoryDBService } from '../services';

describe('In Memory DB Controller', () => {
  interface TestEntity extends InMemoryDBEntity {
    someField: string;
  }

  let controller: InMemoryDbEntityController<TestEntity>;
  let service: InMemoryDBService<TestEntity>;

  const sampleRecords: TestEntity[] = [
    { id: 1, someField: 'AAA' },
    { id: 2, someField: 'BBB' },
    { id: 3, someField: 'CCC' },
  ];

  beforeEach(() => {
    service = inMemoryDBServiceFactory<TestEntity>()();

    class MockController extends InMemoryDbEntityController<TestEntity> {
      constructor(protected dbService: InMemoryDBService<TestEntity>) {
        super(dbService);
      }
    }
    controller = new MockController(service);
  });

  describe('getAsync', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'getAsync');
    });

    test('should return expected record if given valid id', () => {
      // act
      controller.getAsync(1);
      // assert
      expect(spy).toHaveBeenCalledWith(1);
    });
  });

  describe('getManyAsync', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'getManyAsync');
    });

    test('should return expected record if given valid id', () => {
      // arrange
      const testEntityMock = [1, 2, 3];
      // act
      controller.getManyAsync(testEntityMock);
      // assert
      expect(spy).toHaveBeenCalledWith(testEntityMock);
    });
  });

  describe('getAllAsync', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'getAllAsync');
    });

    test('should return expected record if given valid id', () => {
      // act
      controller.getAllAsync();
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('createAsync', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'createAsync');
    });

    test('should return expected record if given valid id', () => {
      // arrange
      const testEntityMock = sampleRecords[0];
      // act
      controller.createAsync(testEntityMock);
      // assert
      expect(spy).toHaveBeenCalledWith(testEntityMock);
    });
  });

  describe('createManyAsync', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'createManyAsync');
    });

    test('should return expected record if given valid id', () => {
      // arrange
      const testEntityMock = sampleRecords;
      // act
      controller.createManyAsync(testEntityMock);
      // assert
      expect(spy).toHaveBeenCalledWith(testEntityMock);
    });
  });

  describe('updateAsync', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'updateAsync');
    });

    test('should return expected record if given valid id', () => {
      // arrange
      const testEntityMock = { someField: 'DDD' };
      // act
      controller.updateAsync(1, testEntityMock);
      // assert
      expect(spy).toHaveBeenCalledWith({ id: 1, ...testEntityMock });
    });
  });

  describe('updateManyAsync', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'updateManyAsync');
    });

    test('should return expected record if given valid id', () => {
      // arrange
      const testEntityMock = sampleRecords;
      // act
      controller.updateManyAsync(testEntityMock);
      // assert
      expect(spy).toHaveBeenCalledWith(testEntityMock);
    });
  });

  describe('deleteAsync', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'deleteAsync');
    });

    test('should return expected record if given valid id', () => {
      // act
      controller.deleteAsync(1);
      // assert
      expect(spy).toHaveBeenCalledWith(1);
    });
  });

  describe('getAsync', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'getAsync');
    });

    test('should return expected record if given valid id', () => {
      // act
      controller.getAsync(1);
      // assert
      expect(spy).toHaveBeenCalledWith(1);
    });
  });

  describe('deleteManyAsync', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'deleteManyAsync');
    });

    test('should return expected record if given valid id', () => {
      // arrange
      const testEntityMock = [1, 2, 3];
      // act
      controller.deleteManyAsync(testEntityMock);
      // assert
      expect(spy).toHaveBeenCalledWith(testEntityMock);
    });
  });
});
