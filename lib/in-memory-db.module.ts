import { DynamicModule, Module } from '@nestjs/common';

import { InMemoryDBConfig } from './interfaces';
import { InMemoryDBService } from './services';
import {
  createInMemoryDBForRootProviders,
  createInMemoryDBForFeatureProviders,
} from './providers';
@Module({
  providers: [InMemoryDBService],
  exports: [InMemoryDBService],
})
export class InMemoryDBModule {
  public static forRoot(config: Partial<InMemoryDBConfig> = {}): DynamicModule {
    const providers = createInMemoryDBForRootProviders(config);
    return {
      module: InMemoryDBModule,
      providers,
      exports: providers,
    };
  }

  public static forFeature(
    featureName: string,
    config: Partial<InMemoryDBConfig> = {},
  ): DynamicModule {
    const providers = createInMemoryDBForFeatureProviders(featureName, config);
    return {
      module: InMemoryDBModule,
      providers,
      exports: providers,
    };
  }
}
