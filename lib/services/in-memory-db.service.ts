import { Injectable, Optional } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { EntityIDType, InMemoryDBConfig, Entity } from '../interfaces';

export function getInitialState<T>(): Entity<T> {
  return {
    ids: [],
    records: {},
  };
}
@Injectable()
export class InMemoryDBService<T> {
  private inmemoryState: Entity<T> = getInitialState();

  constructor(@Optional() private readonly config: InMemoryDBConfig) {}

  /**
   * Given the array of records of type `T`, reduce the array into a dictionary object of
   * type `{ [id: number]: T }`. Set the value of the in-memory data store
   * to this reduced input array.
   * Example:
   *
   * - input array
   * ```json5
   * [
   *  {
   *    "id": 1,
   *    "prop": "test1"
   *  },
   *  {
   *    "id": 2,
   *    "prop": "test2"
   *  }
   * ]
   * ```
   * - becomes
   * ```json5
   * {
   *    1: { "id": 1, "prop": "test1" },
   *    2: { "id": 2, "prop": "test2" }
   * }
   * ```
   * @param records the array of records of type T
   */
  set records(records: T[]) {
    if (!records || records.length === 0) {
      this.inmemoryState = getInitialState();
    }
    this.inmemoryState = this.setState({
      state: this.inmemoryState,
      records,
      idKey: this.idKey,
    });
  }
  get records(): T[] {
    return Object.keys(this.inmemoryState.records).map(
      key => this.inmemoryState.records[key],
    );
  }

  /**
   * Add the supplied `record` partial to the in-memory data store of records.
   * Get the `id` of the record by getting the next available `id` value.
   * Returns the updated record with the newly generated `id`.
   * @param record the partial record of type `T` to create
   */
  public create(record: Partial<T>): T {
    const id = record[this.idKey] || this.getNextId();
    const newRecord: T = { ...record, [this.idKey]: id } as T;
    this.inmemoryState = this.setState({
      state: this.inmemoryState,
      records: [newRecord],
      idKey: this.idKey,
    });

    return newRecord;
  }

  /**
   * Add the supplied `record` partial to the in-memroy data store of records asyncronously.
   * Get the `id` of the record by getting the next available `id` value.
   * Returns the updated record with the newly generated `id` as an observable.
   * @param record the partial record of type `T` to create
   */
  public createAsync(record: Partial<T>): Observable<T> {
    const result$ = of(this.create(record));
    return result$;
  }

  /**
   * Add the supplied `records` partials array to in-memory data store of records.
   * Get the `id` of the record by getting the next available `id` value.
   * Returns a sequential array of the records with the newly generated `ids`.
   * @param records an array of partial records of type `T` to create
   */
  public createMany(records: Array<Partial<T>>): T[] {
    return records.map(record => this.create(record));
  }

  /**
   * Add the supplied `records` partials array to in-memory data store of records.
   * Get the `id` of the record by getting the next available `id` value.
   * Returns a sequential array of the records with the newly generated `ids` as an Observable.
   * @param records an array of partial records of type `T` to create
   */
  public createManyAsync(records: Array<Partial<T>>): Observable<T[]> {
    const result$ = of(this.createMany(records));
    return result$;
  }

  /**
   * Update a record in the in-memory data store of type `T` using the supplied record.
   * @param record the record of type `T` to update
   */
  public update(record: T | Partial<T>): void {
    this.inmemoryState = this.setState({
      state: this.inmemoryState,
      records: [record],
      idKey: this.idKey,
    });
  }

  /**
   * Update a record in the in-memory data store of type `T` using the supplied record asyncronously.
   * @param record the record of type `T` to update
   */
  public updateAsync(record: T | Partial<T>): Observable<void> {
    this.update(record);
    const result$ = of<void>();
    return result$;
  }

  /**
   * Update records in the in-memory data store of type `T` using the supplied records.
   * @param records an array of records of type `T` to update
   */
  public updateMany(records: T[]): void {
    for (const record of records) {
      this.update(record);
    }
  }

  /**
   * Update records in the in-memory data store of type `T` using the supplied records asyncronously.
   * @param records an array of records of type `T` to update
   */
  public updateManyAsync(records: T[]): Observable<void> {
    this.updateMany(records);
    const result$ = of<void>();
    return result$;
  }

  /**
   * Remove the record of type `T` from the in-memory data store using the supplied PK id.
   * @param id the PK id of the record
   */
  public delete(id: EntityIDType): void {
    const newRecords = {};
    for (const currentId of this.inmemoryState.ids) {
      if (currentId.toString() !== id.toString()) {
        newRecords[currentId] = this.inmemoryState.records[currentId];
      }
    }

    this.inmemoryState = this.setState({
      state: getInitialState(),
      records: newRecords,
      idKey: this.idKey,
    });
  }

  /**
   * Remove the record of type `T` from the in-memory data store using the supplied PK id asyncronously.
   * @param id the PK id of the record
   */
  public deleteAsync(id: EntityIDType): Observable<void> {
    this.delete(id);
    const result$ = of<void>();
    return result$;
  }

  /**
   * Remove the records of type `T` from the in-memory data store using the supplied PK ids.
   * @param ids the PK ids of the records
   */
  public deleteMany(ids: EntityIDType[]): void {
    for (const id of ids) {
      this.delete(id);
    }
  }

  /**
   * Remove the records of type `T` from the in-memory data store using the supplied PK ids asyncronously.
   * @param ids the PK ids of the records
   */
  public deleteManyAsync(ids: EntityIDType[]): Observable<void> {
    this.deleteMany(ids);
    const result$ = of<void>();
    return result$;
  }

  /**
   * Get a single record of type `T` with the supplied id value.
   * @param id the PK id of the record
   */
  public get(id: EntityIDType): T {
    return this.inmemoryState.records[id];
  }

  /**
   * Get a single record of type `T` with the supplied id value as an Observable;
   * @param id the PK id of the record
   */
  public getAsync(id: EntityIDType): Observable<T> {
    const result$ = of(this.get(id));
    return result$;
  }

  /**
   * Get records of type `T` with the supplied id values.
   * @param ids the PK ids of the records
   */
  public getMany(ids: EntityIDType[]): T[] {
    const records = ids
      .filter(id => this.inmemoryState.records[id])
      .map(id => {
        return this.inmemoryState.records[id];
      });

    return records;
  }

  /**
   * Get records of type Observable `T` with the supplied id values
   * @param ids the PK ids of the records
   */
  public getManyAsync(ids: EntityIDType[]): Observable<T[]> {
    const result$ = of(this.getMany(ids));
    return result$;
  }

  /**
   * Return all of the records of type `T`.
   */
  public getAll(): T[] {
    return this.records || [];
  }

  /**
   * Return all the records of type `T` as an Observable.
   */
  public getAllAsync(): Observable<T[]> {
    const result$ = of(this.getAll());
    return result$;
  }

  /**
   * Return an array of records of type `T` filtered with the supplied predicate.
   * Example:
   * - given records:
   * ```json5
   * [
   *  {
   *    "id": 1,
   *    "prop": "test1"
   *  },
   *  {
   *    "id": 2,
   *    "prop": "test2"
   *  }
   * ]
   * ```
   * - to find records with a `prop` value of `test1`:
   * ```ts
   * const records: T[] = service.query(record => record.prop === 'test1');
   * ```
   * @param predicate the filter predicate
   */
  public query(predicate: (record: T) => boolean) {
    return this.records.filter(predicate);
  }

  /**
   * Return an array of records of type `T` filtered with the supplied predicate as an Observable.
   * Example:
   * - given records:
   * ```json5
   * [
   *  {
   *    "id": 1,
   *    "prop": "test1"
   *  },
   *  {
   *    "id": 2,
   *    "prop": "test2"
   *  }
   * ]
   * ```
   * - to find records with a `prop` value of `test1`:
   * ```ts
   * const records: Observable<T[]> = service.queryAsync(record => record.prop === 'test1');
   * ```
   * @param predicate the filter predicate
   */
  public queryAsync(predicate: (record: T) => boolean): Observable<T[]> {
    const result$ = of(this.query(predicate));
    return result$;
  }

  /**
   * Randomly generate at a set of records for the given amount and record factory.
   * Example:
   * ```typescript
   * service.seed((i) => { myProp: i}, 100);
   * ```
   *
   * @param recordFactory a factory method to call when generating the random record.
   * @param amount the amount of records to generate, defaults to 10.
   */
  public seed(recordFactory: (index: number) => Partial<T>, amount = 10) {
    amount = amount === null ? 10 : amount;

    const recordsToCreate = [...Array(amount).keys()].map(i =>
      recordFactory(i),
    );

    this.createMany(recordsToCreate);
  }

  /**
   * get the next id by finding the max id in the current records array and adding 1 to that value.
   * Example:
   * - current `recordMap`
   * ```json5
   * {
   *    1: { "id": 1, "prop": "test1" },
   *    4: { "id": 4, "prop": "test2" }
   * }
   * ```
   * - next next id would be: `5` as the current highest id is `4` + `1` = `5`.
   */
  private getNextId(): number {
    if (this.records && this.records.length > 0) {
      return (
        Math.max(
          ...this.inmemoryState.ids.map(e => parseInt(e.toString(), 10)),
        ) + 1
      );
    }

    return 1;
  }

  get idKey() {
    return this.config.idKey || 'id';
  }

  private setState({ state, records, idKey }) {
    let newrecords;
    let newIds: EntityIDType[];

    if (Array.isArray(records)) {
      const resolve = this.mapToEntityObj(records, idKey);
      newrecords = resolve.records;
      newIds = resolve.ids;
    } else if (records.records && records.ids) {
      newrecords = records.records;
      newIds = records.ids;
    } else {
      newrecords = records;
      newIds = Object.keys(newrecords).map(id =>
        isNaN(id as any) ? id : Number(id),
      );
    }
    const newState = {
      ...state,
      records: { ...state.records, ...newrecords },
      ids: [...state.ids, ...newIds],
    };
    return newState;
  }
  private mapToEntityObj(records: T[], idKey: string) {
    const state: Entity<any> = {
      records: {},
      ids: [],
    };

    for (const entity of records) {
      const current = entity;
      state.records[current[idKey]] = current;
      state.ids.push(current[idKey]);
    }

    return state;
  }
}
