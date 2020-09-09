import { FactoryProvider } from '@nestjs/common/interfaces';

import { getInMemoryDBV1ServiceToken } from '../common/in-memory-db.utils';
import { createInMemoryDBV1ForFeatureProviders } from './in-memory-db-for-feature.providers';
import { InMemoryDBV1Config } from '../interfaces';
import { inMemoryDBV1ServiceFactory } from '../factories';

describe('createInMemoryDBV1ForFeatureProviders', () => {
  test('returns correct providers array given featureName and featureConfig', () => {
    // arrange
    const inputFeatureName = 'myFeature';
    const inputFeatureConfig: Partial<InMemoryDBV1Config> = {};

    const expectedProviders: Array<FactoryProvider<any>> = [
      {
        provide: getInMemoryDBV1ServiceToken(inputFeatureName),
        useFactory: inMemoryDBV1ServiceFactory(
          inputFeatureConfig,
          inputFeatureName,
        ),
      },
    ];

    // act
    const actualProviders = createInMemoryDBV1ForFeatureProviders(
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
