import { getInMemoryDBServiceToken } from './in-memory-db.utils';

describe('getInMemoryDBServiceToken', () => {
  test.each([
    ['oneInMemoryDBService', 'one'],
    ['InMemoryDBService', ''],
    ['InMemoryDBService', null],
    ['InMemoryDBService', undefined],
  ])(
    'should return %p token given input featureName of %p',
    (expectedToken: string, featureName: string) => {
      // act
      const actualToken = getInMemoryDBServiceToken(featureName);

      // assert
      expect(actualToken).toEqual(expectedToken);
    },
  );
});
