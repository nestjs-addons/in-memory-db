import { InMemoryDBConfig, InMemoryDBMapConfig } from '../interfaces';

export const getInMemoryDBMapConfigFromParentConfig = (
  parentConfig: InMemoryDBConfig,
) => {
  parentConfig.
  return { parentConfig.}
};

export class InMemoryDBMap<KeyType, RecordType> {
  constructor(
    private config: InMemoryDBMapConfig<KeyType, RecordType>,
    private map: Map<KeyType, RecordType> = new Map<KeyType, RecordType>(),
  ) {}

  /**
   * Add the supplied `record` partial to the in-memory data store of records.
   * Get the `key` of the record by getting the next available `key` value.
   * Returns the the newly generated `id`.
   * @param record the record of type `RecordType` to create
   */
  public create(record: RecordType): KeyType {
    let key = this.config.getKey(record);

    if (!key) {
      key = this.config.generateKey(this.getAll(), this.config.getKey);
      this.config.setKey(key, record);
    }

    this.map.set(key, record);
    return key;
  }

  public createMany(records: RecordType[]): KeyType[] {
    return records.map(record => this.create(record));
  }

  public update(record: RecordType): void {
    const id = this.config.getKey(record);
    this.map.set(id, record);
  }

  public updateMany(records: RecordType[]): void {
    records.forEach(record => this.update(record));
  }

  public delete(key: KeyType): void {
    this.map.delete(key);
  }

  public deleteMany(keys: KeyType[]): void {
    keys.forEach(key => this.delete(key));
  }

  public get(key: KeyType): RecordType {
    return this.map.get(key);
  }

  public getMany(keys: KeyType[]): RecordType[] {
    return keys.filter(key => this.map.get(key)).map(key => this.map.get(key));
  }

  public getAll(): RecordType[] {
    return Array.from(this.map.values()) || [];
  }
}
