import { Injectable, Optional } from '@nestjs/common';

import { InMemoryDBEntity } from '../interfaces';
import { Observable, of } from 'rxjs';
import { InMemoryDBConfig } from '../interfaces/in-memory-db-config';

@Injectable()
export class InMemoryDBService<T extends InMemoryDBEntity> {
  private readonly moduleConfig: Partial<InMemoryDBConfig>;
  private recordMap: { [id: number]: T } = {};

  constructor(@Optional() config: Partial<InMemoryDBConfig> = {}) {
    this.moduleConfig = config || {};
  }

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
      this.recordMap = {};
    }
    this.recordMap = records.reduce(
      (previous: { [id: number]: T }, current: T) => {
        return {
          ...previous,
          [current.id]: current,
        };
      },
      this.recordMap,
    );
  }
  get records(): T[] {
    return Object.keys(this.recordMap).map(key => this.recordMap[key]);
  }

  /**
   * Add the supplied `record` partial to the in-memory data store of records.
   * Get the `id` of the record by getting the next available `id` value.
   * Returns the updated record with the newly generated `id`.
   * @param record the partial record of type `T` to create
   */
  public create(record: Partial<T>): T {
    const id = record.id || this.getNextId();
    const newRecord: T = { ...record, id } as T;
    this.recordMap = {
      ...this.recordMap,
      [id]: newRecord,
    };
    return newRecord;
  }

  /**
   * Add the supplied `record` partial to the in-memroy data store of records asyncronously.
   * Get the `id` of the record by getting the next available `id` value.
   * Returns the updated record with the newly generated `id` as an observable.
   * @param record the partial record of type `T` to create
   */
  public createAsync(record: Partial<T>): Observable<T> {
    const id = record.id || this.getNextId();
    const newRecord: T = { ...record, id } as T;
    this.recordMap = {
      ...this.recordMap,
      [id]: newRecord,
    };
    return of(newRecord);
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
    return of(records.map(record => this.create(record)));
  }

  /**
   * Update a record in the in-memory data store of type `T` using the supplied record.
   * @param record the record of type `T` to update
   */
  public update(record: T): void {
    this.recordMap = {
      ...this.recordMap,
      [record.id]: { ...record },
    };
  }

  /**
   * Update a record in the in-memory data store of type `T` using the supplied record asyncronously.
   * @param record the record of type `T` to update
   */
  public updateAsync(record: T): Observable<void> {
    this.recordMap = {
      ...this.recordMap,
      [record.id]: { ...record },
    };

    return of();
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
    for (const record of records) {
      this.update(record);
    }

    return of();
  }

  /**
   * Remove the record of type `T` from the in-memory data store using the supplied PK id.
   * @param id the PK id of the record
   */
  public delete(id: number): void {
    const { [id]: removed, ...remainder } = this.recordMap;
    this.recordMap = {
      ...remainder,
    };
  }

  /**
   * Remove the record of type `T` from the in-memory data store using the supplied PK id asyncronously.
   * @param id the PK id of the record
   */
  public deleteAsync(id: number): Observable<void> {
    const { [id]: removed, ...remainder } = this.recordMap;
    this.recordMap = {
      ...remainder,
    };

    return of();
  }

  /**
   * Remove the records of type `T` from the in-memory data store using the supplied PK ids.
   * @param ids the PK ids of the records
   */
  public deleteMany(ids: number[]): void {
    for (const id of ids) {
      this.delete(id);
    }
  }

  /**
   * Remove the records of type `T` from the in-memory data store using the supplied PK ids asyncronously.
   * @param ids the PK ids of the records
   */
  public deleteManyAsync(ids: number[]): Observable<void> {
    for (const id of ids) {
      this.delete(id);
    }

    return of();
  }

  /**
   * Get a single record of type `T` with the supplied id value.
   * @param id the PK id of the record
   */
  public get(id: number): T {
    return this.recordMap[id];
  }

  /**
   * Get a single record of type `T` with the supplied id value as an Observable;
   * @param id the PK id of the record
   */
  public getAsync(id: number): Observable<T> {
    return of(this.recordMap[id]);
  }

  /**
   * Get records of type `T` with the supplied id values.
   * @param ids the PK ids of the records
   */
  public getMany(ids: number[]): T[] {
    const records = ids
      .filter(id => this.recordMap[id])
      .map(id => {
        return this.recordMap[id];
      });

    return records;
  }

  /**
   * Get records of type Obsersable `T with the supplied id values
   * @param ids the PK ids of the records
   */
  public getManyAsync(ids: number[]): Observable<T[]> {
    const records = ids
      .filter(id => this.recordMap[id])
      .map(id => {
        return this.recordMap[id];
      });

    return of(records);
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
    return of(this.records || []);
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
  public queryAsync(predicate: (record: T) => boolean) {
    return of(this.records.filter(predicate));
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
      return Math.max(...this.records.map(r => r.id)) + 1;
    }

    return 1;
  }
}
