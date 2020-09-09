import { DynamicModule, Module } from '@nestjs/common';

import { InMemoryDBV1Config } from './interfaces';
import { InMemoryDBV1Service } from './services';
import {
  createInMemoryDBV1ForRootProviders,
  createInMemoryDBV1ForFeatureProviders,
} from './providers';

/**
 * @deprecated since version 2.0.0, please use InMemoryDBModule
 */
@Module({
  providers: [InMemoryDBV1Service],
  exports: [InMemoryDBV1Service],
})
export class InMemoryDBV1Module {
  public static forRoot(
    config: Partial<InMemoryDBV1Config> = {},
  ): DynamicModule {
    const providers = createInMemoryDBV1ForRootProviders(config);
    return {
      module: InMemoryDBV1Module,
      providers,
      exports: providers,
    };
  }

  public static forFeature(
    featureName: string,
    config: Partial<InMemoryDBV1Config> = {},
  ): DynamicModule {
    const providers = createInMemoryDBV1ForFeatureProviders(
      featureName,
      config,
    );
    return {
      module: InMemoryDBV1Module,
      providers,
      exports: providers,
    };
  }
}
