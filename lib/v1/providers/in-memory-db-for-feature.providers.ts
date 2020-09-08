import { InMemoryDBV1Config } from '../interfaces';
import { getInMemoryDBV1ServiceToken } from '../common';
import { inMemoryDBV1ServiceFactory } from '../factories';
import { FactoryProvider } from '@nestjs/common/interfaces';

export function createInMemoryDBV1ForFeatureProviders(
  featureName: string,
  featureConfig: Partial<InMemoryDBV1Config>,
): FactoryProvider[] {
  const providers: FactoryProvider[] = [
    {
      provide: getInMemoryDBV1ServiceToken(featureName),
      useFactory: inMemoryDBV1ServiceFactory(featureConfig, featureName),
    },
  ];
  return providers;
}
