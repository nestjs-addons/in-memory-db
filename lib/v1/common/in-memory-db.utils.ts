import { IN_MEMORY_DB_V1_SERVICE } from './in-memory-db.constants';

export function getInMemoryDBV1ServiceToken(featureName?: string) {
  return featureName && featureName !== IN_MEMORY_DB_V1_SERVICE
    ? `${featureName}${IN_MEMORY_DB_V1_SERVICE}`
    : IN_MEMORY_DB_V1_SERVICE;
}
