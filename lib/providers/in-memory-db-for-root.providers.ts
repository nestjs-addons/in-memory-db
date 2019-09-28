import { FactoryProvider } from '@nestjs/common/interfaces';

import { inMemoryDBServiceFactory } from '../factories';
import { getInMemoryDBServiceToken } from '../common';
import { InMemoryDBConfig } from '../interfaces';

export function createInMemoryDBForRootProviders(
  featureConfig: Partial<InMemoryDBConfig>,
) {
  const providers: FactoryProvider[] = [
    {
      provide: getInMemoryDBServiceToken(),
      useFactory: inMemoryDBServiceFactory(featureConfig),
    },
  ];
  return providers;
}
