import { DynamicModule, Module } from '@nestjs/common';

import { InMemoryDBConfig } from './interfaces';
import { InMemoryDBService } from './services';

@Module({
  providers: [InMemoryDBService],
  exports: [InMemoryDBService],
})
export class InMemoryDBModule {
  static forRoot(config: Partial<InMemoryDBConfig> = {}): DynamicModule {
    return {
      module: InMemoryDBModule,
      providers: [
        {
          provide: InMemoryDBService,
          useValue: new InMemoryDBService(config),
        },
      ],
      exports: [InMemoryDBService],
    };
  }
}
