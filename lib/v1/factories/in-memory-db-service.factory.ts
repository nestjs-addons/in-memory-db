import { InMemoryDBV1Config, InMemoryDBV1Entity } from '../interfaces';
import { InMemoryDBV1Service } from '../services';

export function inMemoryDBV1ServiceFactory<T extends InMemoryDBV1Entity>(
  featureConfig: Partial<InMemoryDBV1Config> = {},
  featureName?: string,
) {
  return () =>
    new InMemoryDBV1Service<T>({
      featureName: featureName
        ? featureName
        : featureConfig.featureName || 'root',
      ...featureConfig,
    });
}
