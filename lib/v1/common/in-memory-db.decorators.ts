import { Inject } from '@nestjs/common';
import { getInMemoryDBV1ServiceToken } from './in-memory-db.utils';

export const InjectInMemoryDBV1Service = (featureName: string) =>
  Inject(getInMemoryDBV1ServiceToken(featureName));
