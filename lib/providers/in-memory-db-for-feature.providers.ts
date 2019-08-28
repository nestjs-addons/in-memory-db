import { InMemoryDBConfig } from '../interfaces';
import { Provider } from '@nestjs/common';
import { getInMemoryDBServiceToken } from '../common';
import { inMemoryDBServiceFactory } from '../factories';

export function createInMemoryDBForFeatureProviders(
  featureName: string,
  featureConfig: Partial<InMemoryDBConfig> = {},
) {
  const providers: Provider[] = [
    {
      provide: getInMemoryDBServiceToken(featureName),
      useFactory: inMemoryDBServiceFactory(featureConfig, featureName),
    },
  ];
  return providers;
}
