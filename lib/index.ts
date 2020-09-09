import 'reflect-metadata';

/** v1 exports */
export {
  InMemoryDBV1Config,
  InMemoryDBV1Entity,
  InMemoryDBV1EntityAsyncController,
  InMemoryDBV1EntityController,
  InMemoryDBV1Module,
  InMemoryDBV1Service,
  InjectInMemoryDBV1Service,
} from './v1';

/** v2 exports */
export { InjectInMemoryDBService } from './common';
export { InMemoryDBModule } from './in-memory-db.module';
export { InMemoryDBConfig, InMemoryDBEntity } from './interfaces';
export { InMemoryDBService } from './services';
export {
  InMemoryDBEntityAsyncController,
  InMemoryDBEntityController,
} from './controllers';
