import { marbles } from 'rxjs-marbles';
import { InMemoryDBMap } from './in-memory-db-map';
import { InMemoryDBMapConfig } from '../interfaces';

describe('In Memory DB Map', () => {
  interface TestEntity {
    id?: number;
    someField: string;
  }

  let service: InMemoryDBMap<number, TestEntity>;

  const sampleMap = new Map<number, TestEntity>([
    [1, { id: 1, someField: 'AAA' }],
    [2, { id: 2, someField: 'BBB' }],
    [3, { id: 3, someField: 'CCC' }],
  ]);

  const defaultMapConfig: InMemoryDBMapConfig<number, TestEntity> = {
    setKey: (key: number, record: TestEntity) => {
      record = { ...record, id: key };
    },
    getKey: (record: TestEntity) => record.id,
    generateKey: (records: TestEntity[], keyGetter = this.getKey): number => {
      if (records && records.length > 0) {
        return Math.max(...records.map(r => keyGetter(r))) + 1;
      }
    },
  };

  beforeEach(() => {
    service = new InMemoryDBMap<number, TestEntity>(
      defaultMapConfig,
      sampleMap,
    );
  });

  describe('get', () => {
    test('should return expected record if given valid id', () => {
      // arrange
      const expected = sampleMap.get(1);

      // act
      const actual = service.get(1);

      // assert
      expect(actual).toEqual(expected);
    });

    test('should return undefined if given invalid id', () => {
      // arrange
      const expectedRecord = undefined;

      // act
      const actualRecord = service.get(-1);

      // assert
      expect(actualRecord).toEqual(expectedRecord);
    });
  });

  describe('getMany', () => {
    test('should return expected records if given valid ids', () => {
      // arrange
      const expected = [...[sampleMap.get(1), sampleMap.get(2)]];

      // act
      const actual = service.getMany([1, 2]);

      // assert
      expect(actual).toEqual(expected);
    });

    test('should return only expected records if given an invalid id', () => {
      // arrange
      const expected = [sampleMap.get(1)];

      // act
      const actual = service.getMany([-1, 1]);

      // assert
      expect(actual).toEqual(expected);
    });
  });

  describe('getAll', () => {
    test('should return all expected records', () => {
      // arrange
      const expected = Array.from(sampleMap.values());

      // act
      const actual = service.getAll();

      // assert
      expect(actual).toEqual(expected);
    });
    test('should return empty array if no records', () => {
      // arrange
      const expected = [];

      // act
      const actual = service.getAll();

      // assert
      expect(actual).toEqual(expected);
    });
  });

  describe('create', () => {
    test('should create records with correct items', () => {
      // arrange
      const inputMap = new Map<number, TestEntity>();
      service = new InMemoryDBMap<number, TestEntity>(
        defaultMapConfig,
        inputMap,
      );
      const itemToAdd: TestEntity = { someField: 'Test' };
      const expected = new Map<number, TestEntity>([[1, itemToAdd]]);

      // act
      service.create(itemToAdd);

      // assert
      expect(inputMap).toEqual(expected);
    });
    test('should return generated id', () => {
      // arrange
      const itemToAdd: TestEntity = { someField: 'Test' };
      const expected = 1;

      // act
      const actual = service.create(itemToAdd);

      // assert
      expect(actual).toEqual(expected);
    });
  });

  describe('createMany', () => {
    test('should update records with correct items', () => {
      // arrange
      const inputMap = new Map<number, TestEntity>();
      service = new InMemoryDBMap<number, TestEntity>(
        defaultMapConfig,
        inputMap,
      );
      const item1ToAdd: TestEntity = { someField: 'Test' };
      const item2ToAdd: TestEntity = { someField: 'Another' };
      const expected = new Map<number, TestEntity>([
        [1, item1ToAdd],
        [2, item2ToAdd],
      ]);

      // act
      const actual = service.createMany([item1ToAdd, item2ToAdd]);

      // assert
      expect(inputMap).toEqual(expected);
      expect(actual).toEqual(expected);
    });
    test('should return generated ids', () => {
      // arrange
      const inputMap = new Map<number, TestEntity>();
      service = new InMemoryDBMap<number, TestEntity>(
        defaultMapConfig,
        inputMap,
      );
      const item1ToAdd: TestEntity = { someField: 'Test' };
      const item2ToAdd: TestEntity = { someField: 'Another' };
      const expected = [1, 2];

      // act
      const actual = service.createMany([item1ToAdd, item2ToAdd]);

      // assert
      expect(actual).toEqual(expected);
    });
  });

  describe('update', () => {
    test('should update record as expected', () => {
      // arrange
      const expected: TestEntity = { id: 1, someField: 'BBB' };

      // act
      service.update(expected);

      // assert
      expect(service.get(1)).toEqual(expected);
    });
  });

  describe('updateMany', () => {
    test('should update records as expected', () => {
      // arrange
      const expected: TestEntity[] = [
        { id: 1, someField: 'YYY' },
        { id: 2, someField: 'ZZZ' },
      ];

      // act
      service.updateMany(expected);

      // assert
      const actual = service
        .getAll()
        .filter(record => expected.map(o => o.id).includes(record.id));

      expect(actual).toEqual(expected);
    });
  });

  describe('delete', () => {
    test('should remove record as expected', () => {
      // act
      service.delete(3);

      // assert
      const secondRecord = service.get(3);
      expect(secondRecord).toEqual(undefined);
      expect(service.getAll().length).toEqual(2);
    });
  });

  describe('deleteMany', () => {
    test('should remove records as expected', () => {
      // act
      service.deleteMany([1, 2]);

      // assert
      const thirdRecord = service.get(3);
      expect(thirdRecord).toEqual({ id: 3, someField: 'CCC' });
      expect(service.getAll().length).toEqual(1);
    });
  });
});
