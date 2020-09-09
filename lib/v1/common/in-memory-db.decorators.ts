import { Inject } from '@nestjs/common';
import { getInMemoryDBV1ServiceToken } from './in-memory-db.utils';

export const InjectInMemoryDBV1Service = (
  featureName: string,
): ((target: any, key: string | symbol, index?: number) => void) => {
  return Inject(getInMemoryDBV1ServiceToken(featureName));
};
