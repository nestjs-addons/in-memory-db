import { Inject } from '@nestjs/common';
import { getInMemoryDBServiceToken } from './in-memory-db.utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const InjectInMemoryDBService = (featureName: string) =>
  Inject(getInMemoryDBServiceToken(featureName));
