export interface InMemoryDBConfig {
  idKey: string;
  idType: 'string' | 'number';
  simulatedDelay: number;
}
