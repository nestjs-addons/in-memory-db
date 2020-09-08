import { InMemoryDBConfig, InMemoryDBEntity } from '../interfaces';
import { InMemoryDBService } from '../services';

export function inMemoryDBServiceFactory<T extends InMemoryDBEntity>(
  featureConfig: Partial<InMemoryDBConfig> = {},
  featureName?: string,
): () => InMemoryDBService<T> {
  return () =>
    new InMemoryDBService<T>({
      featureName: featureName
        ? featureName
        : featureConfig.featureName || 'root',
      ...featureConfig,
    });
}
