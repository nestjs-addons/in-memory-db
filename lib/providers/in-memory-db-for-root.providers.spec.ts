import { FactoryProvider } from '@nestjs/common/interfaces';

import { getInMemoryDBServiceToken } from '../common/in-memory-db.utils';
import { createInMemoryDBForRootProviders } from './in-memory-db-for-root.providers';
import { InMemoryDBConfig } from '../interfaces';
import { inMemoryDBServiceFactory } from '../factories';

describe('createInMemoryDBForRootProviders', () => {
  test('returns correct providers array given featureName and featureConfig', () => {
    // arrange
    const inputFeatureConfig: Partial<InMemoryDBConfig> = {};

    const expectedProviders: Array<FactoryProvider<any>> = [
      {
        provide: getInMemoryDBServiceToken(),
        useFactory: inMemoryDBServiceFactory(inputFeatureConfig),
      },
    ];

    // act
    const actualProviders = createInMemoryDBForRootProviders(
      inputFeatureConfig,
    );

    // assert
    expect(actualProviders[0].provide).toEqual(expectedProviders[0].provide);
    expect(actualProviders[0].useFactory()).toEqual(
      expectedProviders[0].useFactory(),
    );
  });
});
