import { getInMemoryDBV1ServiceToken } from './in-memory-db.utils';

describe('getInMemoryDBV1ServiceToken', () => {
  test.each([
    ['oneInMemoryDBV1Service', 'one'],
    ['InMemoryDBV1Service', ''],
    ['InMemoryDBV1Service', null],
    ['InMemoryDBV1Service', undefined],
  ])(
    'should return %p token given input featureName of %p',
    (expectedToken: string, featureName: string) => {
      // act
      const actualToken = getInMemoryDBV1ServiceToken(featureName);

      // assert
      expect(actualToken).toEqual(expectedToken);
    },
  );
});
