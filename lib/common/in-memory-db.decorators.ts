import { Inject } from '@nestjs/common';
import { getInMemoryDBServiceToken } from './in-memory-db.utils';

export const InjectInMemoryDBService = (featureName: string) =>
  Inject(getInMemoryDBServiceToken(featureName));