type InMemoryDBKeyGenerator<KeyType, RecordType> = (
  records: RecordType[],
  keyGetter: InMemoryDBKeyGetter<KeyType, RecordType>,
) => KeyType;

type InMemoryDBKeyGetter<KeyType, RecordType> = (
  record: Partial<RecordType> | RecordType,
) => KeyType;

type InMemoryDBKeySetter<KeyType, RecordType> = (
  key: KeyType,
  record: Partial<RecordType> | RecordType,
) => void;

export interface InMemoryDBMapConfig<KeyType, RecordType> {
  generateKey: InMemoryDBKeyGenerator<KeyType, RecordType>;
  getKey: InMemoryDBKeyGetter<KeyType, RecordType>;
  setKey: InMemoryDBKeySetter<KeyType, RecordType>;
}
