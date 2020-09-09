import { InMemoryDBEntity } from '../interfaces';
import { inMemoryDBServiceFactory } from '../factories';
import { InMemoryDBEntityController } from './in-memory-db.controller';
import { InMemoryDBService } from '../services';

describe('In Memory DB Controller', () => {
  interface TestEntity extends InMemoryDBEntity {
    someField: string;
  }

  let controller: InMemoryDBEntityController<TestEntity>;
  let service: InMemoryDBService<TestEntity>;

  const sampleRecords: TestEntity[] = [
    { id: '1', someField: 'AAA' },
    { id: '2', someField: 'BBB' },
    { id: '3', someField: 'CCC' },
  ];

  class MockController extends InMemoryDBEntityController<TestEntity> {
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
      spy = jest.spyOn(service, 'get');
    });

    test('should call service get spy when given valid id', () => {
      // act
      controller.get('1');
      // assert
      expect(spy).toHaveBeenCalledWith('1');
    });
  });

  describe('getMany', () => {
    test('should call service getMany spy when given list of ids', () => {
      // arrange
      const spy = spyOn(service, 'getMany');
      const testEntityMock = ['1', '2', '3'];
      // act
      controller.getMany(testEntityMock);
      // assert
      expect(spy).toHaveBeenCalledWith(testEntityMock);
    });

    test('should call service getAll spy when no ids have been given', () => {
      // arrange
      const spy = spyOn(service, 'getAll');
      // act
      controller.getMany();
      // assert
      expect(spy).toHaveBeenCalledWith();
    });
  });

  describe('create', () => {
    test('should call create when given a valid record', () => {
      // arrange
      const spy = jest.spyOn(service, 'create');
      const testEntityMock = sampleRecords[0];
      // act
      controller.create(testEntityMock);
      // assert
      expect(spy).toHaveBeenCalledWith(testEntityMock);
    });

    test('should call create many when given valid records list', () => {
      // arrange
      const spy = jest.spyOn(service, 'createMany');
      // act
      controller.create(sampleRecords);
      // assert
      expect(spy).toHaveBeenCalledWith(sampleRecords);
    });
  });

  describe('update', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'update');
    });

    test('should call update when given a valid record and id', () => {
      // arrange
      const testEntityMock = { someField: 'DDD' };
      // act
      controller.update('1', testEntityMock);
      // assert
      expect(spy).toHaveBeenCalledWith({ id: '1', ...testEntityMock });
    });
  });

  describe('updateMany', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'updateMany');
    });

    test('should call update many when given valid records list', () => {
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
      spy = jest.spyOn(service, 'delete');
    });

    test('should call delete when given a valid id', () => {
      // act
      controller.delete('1');
      // assert
      expect(spy).toHaveBeenCalledWith('1');
    });
  });

  describe('deleteMany', () => {
    let spy;

    beforeEach(() => {
      spy = jest.spyOn(service, 'deleteMany');
    });

    test('should call delete many when given valid ids list', () => {
      // arrange
      const testEntityMock = ['1', '2', '3'];
      // act
      controller.deleteMany(testEntityMock);
      // assert
      expect(spy).toHaveBeenCalledWith(testEntityMock);
    });
  });
});
