import { InMemoryDBConfig } from '../interfaces';
import { InMemoryDBService } from '../services';

export function inMemoryDBServiceFactory<T>(
  featureConfig: Partial<InMemoryDBConfig> = {},
  featureName?: string,
) {
  return () =>
    new InMemoryDBService<T>({
      featureName: featureName
        ? featureName
        : featureConfig.featureName || 'root',
      ...featureConfig,
    });
}
