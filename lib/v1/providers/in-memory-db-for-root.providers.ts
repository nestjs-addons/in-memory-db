import { FactoryProvider } from '@nestjs/common/interfaces';

import { inMemoryDBV1ServiceFactory } from '../factories';
import { getInMemoryDBV1ServiceToken } from '../common';
import { InMemoryDBV1Config } from '../interfaces';

export function createInMemoryDBV1ForRootProviders(
  featureConfig: Partial<InMemoryDBV1Config>,
) {
  const providers: FactoryProvider[] = [
    {
      provide: getInMemoryDBV1ServiceToken(),
      useFactory: inMemoryDBV1ServiceFactory(featureConfig),
    },
  ];
  return providers;
}
