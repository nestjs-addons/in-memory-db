import { IN_MEMORY_DB_SERVICE } from './in-memory-db.constants';

export function getInMemoryDBServiceToken(featureName?: string) {
  return featureName && featureName !== IN_MEMORY_DB_SERVICE
    ? `${featureName}${IN_MEMORY_DB_SERVICE}`
    : IN_MEMORY_DB_SERVICE;
}