import { FactoryProvider } from '@nestjs/common/interfaces';

import { getInMemoryDBServiceToken } from '../common/in-memory-db.utils';
import { createInMemoryDBForFeatureProviders } from './in-memory-db-for-feature.providers';
import { InMemoryDBConfig } from '../interfaces';
import { inMemoryDBServiceFactory } from '../factories';

describe('createInMemoryDBForFeatureProviders', () => {
  test('returns correct providers array given featureName and featureConfig', () => {
    // arrange
    const inputFeatureName = 'myFeature';
    const inputFeatureConfig: Partial<InMemoryDBConfig> = {};

    const expectedProviders: Array<FactoryProvider<any>> = [
      {
        provide: getInMemoryDBServiceToken(inputFeatureName),
        useFactory: inMemoryDBServiceFactory(
          inputFeatureConfig,
          inputFeatureName,
        ),
      },
    ];

    // act
    const actualProviders = createInMemoryDBForFeatureProviders(
      inputFeatureName,
      inputFeatureConfig,
    );

    // assert
    expect(actualProviders[0].provide).toEqual(expectedProviders[0].provide);
    expect(actualProviders[0].useFactory()).toEqual(
      expectedProviders[0].useFactory(),
    );
  });
});
