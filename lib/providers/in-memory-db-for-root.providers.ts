import { inMemoryDBServiceFactory } from '../factories';
import { getInMemoryDBServiceToken } from '../common';
import { Provider } from '@nestjs/common';
import { InMemoryDBConfig } from '../interfaces';

export function createInMemoryDBForRootProviders(
  featureConfig: Partial<InMemoryDBConfig> = {},
) {
  const providers: Provider[] = [
    {
      provide: getInMemoryDBServiceToken(),
      useFactory: inMemoryDBServiceFactory(featureConfig),
    },
  ];
  return providers;
}
