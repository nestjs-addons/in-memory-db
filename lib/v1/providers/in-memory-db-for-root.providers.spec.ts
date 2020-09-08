import { FactoryProvider } from '@nestjs/common/interfaces';

import { getInMemoryDBV1ServiceToken } from '../common/in-memory-db.utils';
import { createInMemoryDBV1ForRootProviders } from './in-memory-db-for-root.providers';
import { InMemoryDBV1Config } from '../interfaces';
import { inMemoryDBV1ServiceFactory } from '../factories';

describe('createInMemoryDBV1ForRootProviders', () => {
  test('returns correct providers array given featureName and featureConfig', () => {
    // arrange
    const inputFeatureConfig: Partial<InMemoryDBV1Config> = {};

    const expectedProviders: Array<FactoryProvider<any>> = [
      {
        provide: getInMemoryDBV1ServiceToken(),
        useFactory: inMemoryDBV1ServiceFactory(inputFeatureConfig),
      },
    ];

    // act
    const actualProviders = createInMemoryDBV1ForRootProviders(
      inputFeatureConfig,
    );

    // assert
    expect(actualProviders[0].provide).toEqual(expectedProviders[0].provide);
    expect(actualProviders[0].useFactory()).toEqual(
      expectedProviders[0].useFactory(),
    );
  });
});
