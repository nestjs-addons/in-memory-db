import { FactoryProvider } from '@nestjs/common/interfaces';
import { getInMemoryDBServiceToken } from '../common';
import { inMemoryDBServiceFactory } from '../factories';
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
