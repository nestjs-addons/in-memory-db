import { marbles } from 'rxjs-marbles';
import { InMemoryDBService } from './in-memory-db.service';
import { inMemoryDBServiceFactory } from '../factories';

describe('In Memory DB Service', () => {
  interface TestEntity {
    id: number;
    someField: string;
  }

  let service: InMemoryDBService<TestEntity>;

  const sampleRecords: TestEntity[] = [
    { id: 1, someField: 'AAA' },
    { id: 2, someField: 'BBB' },
    { id: 3, someField: 'CCC' },
  ];

  beforeEach(() => {
    service = inMemoryDBServiceFactory<TestEntity>()();
  });

  describe('get', () => {
    test('should return expected record if given valid id', () => {
      // arrange
      service.records = [...sampleRecords];
      const expectedRecord = sampleRecords[0];

      // act
      const actualRecord = service.get(1);

      // assert
      expect(actualRecord).toEqual(expectedRecord);
    });

    test('should return undefined if given invalid id', () => {
      // arrange
      service.records = [...sampleRecords];
      const expectedRecord = undefined;

      // act
      const actualRecord = service.get(-1);

      // assert
      expect(actualRecord).toEqual(expectedRecord);
    });
  });

  describe('getAsync', () => {
    test(
      'should return expected record as an observable if given valid id',
      marbles(m => {
        // arrange
        service.records = [...sampleRecords];
        const expectedRecord = m.cold('a|', sampleRecords[0]);

        // act
        const actualRecord = m.cold('a|', service.getAsync(1));

        // assert
        m.expect(actualRecord).toBeObservable(expectedRecord);
      }),
    );

    test(
      'should return observable with no value given invalid id',
      marbles(m => {
        // arrange
        service.records = [...sampleRecords];
        const expectedRecord = m.cold('a|', {});

        // act
        const actualRecord = m.cold('a|', service.getAsync(-1));

        // assert
        m.expect(actualRecord).toBeObservable(expectedRecord);
      }),
    );
  });

  describe('getMany', () => {
    test('should return expected records if given valid ids', () => {
      // arrange
      service.records = [...sampleRecords];
      const expectedRecords = [...[sampleRecords[0], sampleRecords[1]]];

      // act
      const actualRecords = service.getMany([1, 2]);

      // assert
      expect(actualRecords).toEqual(expectedRecords);
    });

    test('should return only expected records if given an invalid id', () => {
      // arrange
      service.records = [...sampleRecords];
      const expectedRecords = [sampleRecords[0]];

      // act
      const actualRecords = service.getMany([-1, 1]);

      // assert
      expect(actualRecords).toEqual(expectedRecords);
    });
  });

  describe('getManyAsync', () => {
    test(
      'should return expected records as observable if given valid ids',
      marbles(m => {
        // arrange
        service.records = [...sampleRecords];
        const expectedRecord = m.cold('a|', [
          ...[sampleRecords[0], sampleRecords[1]],
        ]);

        // act
        const actualRecord = m.cold('a|', service.getManyAsync([1, 2]));

        // assert
        m.expect(actualRecord).toBeObservable(expectedRecord);
      }),
    );

    test(
      'should return only expected records as observables if given an invalid id',
      marbles(m => {
        // arrange
        service.records = [...sampleRecords];
        const expectedRecord = m.cold('a|', [sampleRecords[0]]);

        // act
        const actualRecords = m.cold('a|', service.getManyAsync([-1, 1]));

        // assert
        m.expect(actualRecords).toBeObservable(expectedRecord);
      }),
    );
  });

  describe('getAll', () => {
    test('should return all expected records', () => {
      // arrange
      service.records = [...sampleRecords];
      const expectedRecords = service.records;

      // act
      const actualRecords = service.getAll();

      // assert
      expect(actualRecords).toEqual(expectedRecords);
    });
    test('should return empty array if no records', () => {
      // arrange
      service.records = [];
      const expectedRecords = [];

      // act
      const actualRecords = service.getAll();

      // assert
      expect(actualRecords).toEqual(expectedRecords);
    });
  });

  describe('getAllAsync', () => {
    test(
      'should return all expected records as observable',
      marbles(m => {
        // arrange
        service.records = [...sampleRecords];
        const expectedRecords = m.cold('a|', service.records);

        // act
        const actualRecords = m.cold('a|', service.getAllAsync());

        // assert
        m.expect(actualRecords).toBeObservable(expectedRecords);
      }),
    );
    test(
      'should return empty array as observable if no records',
      marbles(m => {
        // arrange
        service.records = [];
        const expectedRecords = m.cold('a|', []);

        // act
        const actualRecords = m.cold('a|', service.getAllAsync());

        // assert
        m.expect(actualRecords).toBeObservable(expectedRecords);
      }),
    );
  });

  describe('create', () => {
    test('should update records with correct items', () => {
      // arrange
      // service.records = [];
      const itemToAdd: Partial<TestEntity> = { someField: 'Test' };
      const expectedRecords = [...[{ ...itemToAdd, id: 1 }]];

      // act
      service.create(itemToAdd);

      // assert
      expect(service.records).toEqual(expectedRecords);
    });
    test('should return generated id', () => {
      // arrange
      service.records = [];
      const itemToAdd: Partial<TestEntity> = { someField: 'Test' };
      const expectedRecord = { someField: 'Test', id: 1 };

      // act
      const actualRecord = service.create(itemToAdd);

      // assert
      expect(expectedRecord).toEqual(actualRecord);
    });
  });

  describe('createAsync', () => {
    test(
      'should update records with correct items asyncronously',
      marbles(m => {
        // arrange
        service.records = [];
        const itemToAdd: Partial<TestEntity> = { someField: 'Test' };
        const expectedRecords = m.cold('a|', [...[{ ...itemToAdd, id: 1 }]]);

        // act
        service.createAsync(itemToAdd);
        const actualRecords = m.cold('a|', service.records);

        // assert
        m.expect(actualRecords).toBeObservable(expectedRecords);
      }),
    );
    test(
      'should return generated id as observable',
      marbles(m => {
        // arrange
        service.records = [];
        const itemToAdd: Partial<TestEntity> = { someField: 'Test' };
        const expectedRecord = m.cold('a|', { ...itemToAdd, id: 1 });

        // act
        const actualRecord = m.cold('a|', service.createAsync(itemToAdd));

        // assert
        m.expect(actualRecord).toBeObservable(expectedRecord);
      }),
    );
  });

  describe('createMany', () => {
    test('should update records with correct items', () => {
      // arrange
      service.records = [];
      const item1ToAdd: Partial<TestEntity> = { someField: 'Test' };
      const item2ToAdd: Partial<TestEntity> = { someField: 'Another' };
      const expectedRecords = [
        { ...item1ToAdd, id: 1 },
        { ...item2ToAdd, id: 2 },
      ];
      // act
      const createdRecords = service.createMany([item1ToAdd, item2ToAdd]);

      // assert
      expect(service.records).toEqual(expectedRecords);
      // expect(createdRecords).toEqual(expectedRecords);
    });
    test('should return generated ids', () => {
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

  describe('createManyAsync', () => {
    test(
      'should update records with correct items asynchronously',
      marbles(m => {
        // arrange
        service.records = [];
        const item1ToAdd: Partial<TestEntity> = { someField: 'Test' };
        const item2ToAdd: Partial<TestEntity> = { someField: 'Another' };
        const expectedRecords = m.cold('a|', [
          ...[
            { ...item1ToAdd, id: 1 },
            { ...item2ToAdd, id: 2 },
          ],
        ]);

        // act
        const createdRecords = m.cold(
          'a|',
          service.createManyAsync([item1ToAdd, item2ToAdd]),
        );
        const actualRecords = m.cold('a|', service.records);

        // assert
        m.expect(actualRecords).toBeObservable(expectedRecords);
        m.expect(createdRecords).toBeObservable(expectedRecords);
      }),
    );
    test(
      'should return generated ids asyncronously',
      marbles(m => {
        // arrange
        service.records = [];
        const item1ToAdd: Partial<TestEntity> = { someField: 'Test' };
        const item2ToAdd: Partial<TestEntity> = { someField: 'Another' };

        const expectedGeneratedRecords = m.cold('a|', [
          { ...item1ToAdd, id: 1 },
          { ...item2ToAdd, id: 2 },
        ]);

        // act
        const actualGeneratedRecords = m.cold(
          'a|',
          service.createManyAsync([item1ToAdd, item2ToAdd]),
        );

        // assert
        m.expect(actualGeneratedRecords).toBeObservable(
          expectedGeneratedRecords,
        );
      }),
    );
  });

  describe('update', () => {
    test('should update record as expected', () => {
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

  describe('updateAsync', () => {
    test(
      'should update record as expected asyncronously',
      marbles(m => {
        // arrange
        const originRecord: TestEntity = { id: 1, someField: 'AAA' };
        const updatedRecord: TestEntity = { id: 1, someField: 'BBB' };
        service.records = [...[originRecord]];
        const expectedRecord = m.cold('a|', updatedRecord);

        // act
        service.updateAsync(updatedRecord);

        // assert
        const actualUpdatedRecord = m.cold(
          'a|',
          service.records.find(record => record.id === originRecord.id),
        );

        m.expect(actualUpdatedRecord).toBeObservable(expectedRecord);
      }),
    );
  });

  describe('updateMany', () => {
    test('should update records as expected', () => {
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

  describe('updateManyAsync', () => {
    test(
      'should update records as expected asynronously',
      marbles(m => {
        // arrange
        const originRecords: TestEntity[] = [
          { id: 1, someField: 'AAA' },
          { id: 2, someField: 'BBB' },
          { id: 3, someField: 'CCC' },
        ];
        const updatedRecords: TestEntity[] = [
          { id: 1, someField: 'YYY' },
          { id: 2, someField: 'ZZZ' },
        ];
        service.records = [...originRecords];
        const expectedRecords = m.cold('a|', updatedRecords);

        // act
        service.updateManyAsync(updatedRecords);

        // assert
        const actualUpdatedRecords = m.cold(
          'a|',
          service.records.filter(record =>
            updatedRecords.map(o => o.id).includes(record.id),
          ),
        );

        m.expect(actualUpdatedRecords).toBeObservable(expectedRecords);
      }),
    );
  });

  describe('delete', () => {
    test('should remove record as expected', () => {
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

  describe('deleteAsync', () => {
    test('should remove record as expected asyncronously', () => {
      // arrange
      service.records = [
        { id: 1, someField: 'AAA' },
        { id: 2, someField: 'BBB' },
      ];

      // act
      service.deleteAsync(2);

      // assert
      const secondRecord = service.records.find(record => record.id === 2);
      expect(secondRecord).toEqual(undefined);
      expect(service.records.length).toEqual(1);
    });
  });

  describe('deleteMany', () => {
    test('should remove records as expected', () => {
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

  describe('deleteManyAsync', () => {
    test('should remove records as expected asyncronously', () => {
      // arrange
      service.records = [
        { id: 1, someField: 'AAAA' },
        { id: 2, someField: 'BBB' },
        { id: 3, someField: 'CCC' },
      ];

      // act
      service.deleteManyAsync([1, 2]);

      // assert
      const thirdRecord = service.records[0];
      expect(thirdRecord).toEqual({ id: 3, someField: 'CCC' });
      expect(service.records.length).toEqual(1);
    });
  });

  describe('query', () => {
    test('should return expected records for given predicate', () => {
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

  describe('queryAsync', () => {
    test(
      'should return expected records for given predicate as observable',
      marbles(m => {
        // arrange
        service.records = [
          { id: 1, someField: 'AAA' },
          { id: 2, someField: 'BBB' },
        ];
        const expectedFoundRecord = m.cold('a|', service.records[1]);

        // act
        const foundRecord = m.cold(
          'a|',
          service.queryAsync(record => record.someField === 'BBB'),
        );

        // assert
        m.expect(foundRecord).toBeObservable(expectedFoundRecord);
      }),
    );
  });

  describe('seed', () => {
    const recordFactory = (idx: number): Partial<TestEntity> => ({
      someField: `${idx}`,
    });

    test.each([
      [0, 0],
      [9, 9],
      [10, 10],
      [11, 11],
      [10, null],
      [10, undefined],
    ])(
      'should seed %p records given input amount of %p',
      (expectedAmount: number, inputAmount: number) => {
        // act
        service.seed(recordFactory, inputAmount);

        // assert
        expect(service.records.length).toEqual(expectedAmount);
      },
    );

    test.each([
      [0, 0],
      [9, 9],
      [10, 10],
      [11, 11],
      [10, null],
      [10, undefined],
    ])(
      'should generate correct seed records of %p given input amount of %p',
      (expectedAmount: number, inputAmount: number) => {
        // arrange
        const expectedRecords = [...Array(expectedAmount).keys()].map(i => ({
          ...recordFactory(i),
          id: i + 1,
        }));

        // act
        service.seed(recordFactory, inputAmount);

        // assert
        expect(service.records).toEqual(expectedRecords);
      },
    );
  });
});
