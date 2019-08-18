import { InMemoryDBEntity } from '../interfaces';
import { InMemoryDBService } from './in-memory-db.service';

describe('In Memory DB Service', () => {
  interface TestEntity extends InMemoryDBEntity {
    someField: string;
  }

  let service: InMemoryDBService<TestEntity>;

  const sampleRecords: TestEntity[] = [
    { id: 1, someField: 'AAA' },
    { id: 2, someField: 'BBB' },
    { id: 3, someField: 'CCC' },
  ];

  beforeEach(() => {
    service = new InMemoryDBService<TestEntity>({});
  });

  describe('get', () => {
    it('should return expected record if given valid id', () => {
      // arrange
      service.records = [...sampleRecords];
      const expectedRecord = sampleRecords[0];

      // act
      const actualRecord = service.get(1);

      // assert
      expect(actualRecord).toEqual(expectedRecord);
    });

    it('should return undefined if given invalid id', () => {
      // arrange
      service.records = [...sampleRecords];
      const expectedRecord = undefined;

      // act
      const actualRecord = service.get(-1);

      // assert
      expect(actualRecord).toEqual(expectedRecord);
    });
  });
  describe('getMany', () => {
    it('should return expected records if given valid ids', () => {
      // arrange
      service.records = [...sampleRecords];
      const expectedRecords = [...[sampleRecords[0], sampleRecords[1]]];

      // act
      const actualRecords = service.getMany([1, 2]);

      // assert
      expect(actualRecords).toEqual(expectedRecords);
    });

    it('should return only expected records if given an invalid id', () => {
      // arrange
      service.records = [...sampleRecords];
      const expectedRecords = [sampleRecords[0]];

      // act
      const actualRecords = service.getMany([-1, 1]);

      // assert
      expect(actualRecords).toEqual(expectedRecords);
    });
  });
  describe('getAll', () => {
    it('should return all expected records', () => {
      // arrange
      service.records = [...sampleRecords];
      const expectedRecords = service.records;

      // act
      const actualRecords = service.getAll();

      // assert
      expect(actualRecords).toEqual(expectedRecords);
    });
    it('should return empty array if no records', () => {
      // arrange
      service.records = [];
      const expectedRecords = [];

      // act
      const actualRecords = service.getAll();

      // assert
      expect(actualRecords).toEqual(expectedRecords);
    });
  });
  describe('create', () => {
    it('should update records with correct items', () => {
      // arrange
      service.records = [];
      const itemToAdd: Partial<TestEntity> = { someField: 'Test' };
      const expectedRecords = [...[{ ...itemToAdd, id: 1 }]];

      // act
      service.create(itemToAdd);

      // assert
      expect(service.records).toEqual(expectedRecords);
    });
    it('should return generated id', () => {
      // arrange
      service.records = [];
      const itemToAdd: Partial<TestEntity> = { someField: 'Test' };
      const expectedRecord = { ...itemToAdd, id: 1 };

      // act
      const actualRecord = service.create(itemToAdd);

      // assert
      expect(actualRecord).toEqual(expectedRecord);
    });
  });
  describe('createMany', () => {
    it('should update records with correct items', () => {
      // arrange
      service.records = [];
      const item1ToAdd: Partial<TestEntity> = { someField: 'Test' };
      const item2ToAdd: Partial<TestEntity> = { someField: 'Another' };
      const expectedRecords = [
        ...[{ ...item1ToAdd, id: 1 }, { ...item2ToAdd, id: 2 }],
      ];

      // act
      const createdRecords = service.createMany([item1ToAdd, item2ToAdd]);

      // assert
      expect(service.records).toEqual(expectedRecords);
      expect(createdRecords).toEqual(expectedRecords);
    });
    it('should return generated ids', () => {
      // arrange
      service.records = [];
      const item1ToAdd: Partial<TestEntity> = { someField: 'Test' };
      const item2ToAdd: Partial<TestEntity> = { someField: 'Another' };

      const expectedGeneratedRecords = [
        { ...item1ToAdd, id: 1 },
        { ...item2ToAdd, id: 2 },
      ];

      // act
      const actualGeneratedRecords = service.createMany([
        item1ToAdd,
        item2ToAdd,
      ]);

      // assert
      expect(actualGeneratedRecords).toEqual(expectedGeneratedRecords);
    });
  });
  describe('update', () => {
    it('should update record as expected', () => {
      // arrange
      const originalRecord: TestEntity = { id: 1, someField: 'AAA' };
      const expectedUpdatedRecord: TestEntity = { id: 1, someField: 'BBB' };
      service.records = [...[originalRecord]];

      // act
      service.update(expectedUpdatedRecord);

      // assert
      const actualUpdatedRecord = service.records.find(
        record => record.id === originalRecord.id,
      );

      expect(actualUpdatedRecord).toEqual(expectedUpdatedRecord);
    });
  });
  describe('updateMany', () => {
    it('should update records as expected', () => {
      // arrange
      const originalRecords: TestEntity[] = [
        { id: 1, someField: 'AAA' },
        { id: 2, someField: 'BBB' },
        { id: 3, someField: 'CCC' },
      ];
      const expectedUpdatedRecords: TestEntity[] = [
        { id: 1, someField: 'YYY' },
        { id: 2, someField: 'ZZZ' },
      ];
      service.records = [...originalRecords];

      // act
      service.updateMany(expectedUpdatedRecords);

      // assert
      const actualUpdatedRecords = service.records.filter(record =>
        expectedUpdatedRecords.map(o => o.id).includes(record.id),
      );

      expect(actualUpdatedRecords).toEqual(expectedUpdatedRecords);
    });
  });
  describe('delete', () => {
    it('should remove record as expected', () => {
      // arrange
      service.records = [
        { id: 1, someField: 'AAA' },
        { id: 2, someField: 'BBB' },
      ];

      // act
      service.delete(2);

      // assert
      const secondRecord = service.records.find(record => record.id === 2);
      expect(secondRecord).toEqual(undefined);
      expect(service.records.length).toEqual(1);
    });
  });
  describe('deleteMany', () => {
    it('should remove records as expected', () => {
      // arrange
      service.records = [
        { id: 1, someField: 'AAA' },
        { id: 2, someField: 'BBB' },
        { id: 3, someField: 'CCC' },
      ];

      // act
      service.deleteMany([1, 2]);

      // assert
      const thirdRecord = service.records[0];
      expect(thirdRecord).toEqual({ id: 3, someField: 'CCC' });
      expect(service.records.length).toEqual(1);
    });
  });
  describe('query', () => {
    it('should return expected records for given predicate', () => {
      // arrange
      service.records = [
        { id: 1, someField: 'AAA' },
        { id: 2, someField: 'BBB' },
      ];
      const expectedFoundRecord = [service.records[1]];

      // act
      const foundRecord = service.query(record => record.someField === 'BBB');

      // assert
      expect(foundRecord).toEqual(expectedFoundRecord);
    });
  });
});
