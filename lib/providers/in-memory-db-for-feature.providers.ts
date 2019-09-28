import { InMemoryDBConfig } from '../interfaces';
import { getInMemoryDBServiceToken } from '../common';
import { inMemoryDBServiceFactory } from '../factories';
import { FactoryProvider } from '@nestjs/common/interfaces';

export function createInMemoryDBForFeatureProviders(
  featureName: string,
  featureConfig: Partial<InMemoryDBConfig>,
) {
  const providers: FactoryProvider[] = [
    {
      provide: getInMemoryDBServiceToken(featureName),
      useFactory: inMemoryDBServiceFactory(featureConfig, featureName),
    },
  ];
  return providers;
}
