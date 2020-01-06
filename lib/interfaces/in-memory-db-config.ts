/**
 * InMemoryDBConfig defines the config settings for InMemoryDBModule
 *
 * All properties should remain optional except featureName
 */
export interface InMemoryDBConfig {
  featureName: string;
  idKey?: string;
}
