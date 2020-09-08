import { Injectable, Optional } from '@nestjs/common';

import { InMemoryDBConfig, InMemoryDBEntity } from '../interfaces';
import { Observable, of } from 'rxjs';

import { v4 as uuid } from 'uuid';

@Injectable()
export class InMemoryDBService<T extends InMemoryDBEntity> {
  private recordMap: { [id: string]: T } = {};

  constructor(@Optional() private readonly config: InMemoryDBConfig) {}

  /**
   * Given the array of records of type `T`, reduce the array into a dictionary object of
   * type `{ [id: string]: T }`. Set the value of the in-memory data store
   * to this reduced input array.
   * Example:
   *
   * - input array
   * ```json5
   * [
   *  {
   *    "id": "random-uuid",
   *    "prop": "test1"
   *  },
   *  {
   *    "id": "another-random-uuid",
   *    "prop": "test2"
   *  }
   * ]
   * ```
   * - becomes
   * ```json5
   * {
   *    "random-uuid": { "id": "random-uuid", "prop": "test1" },
   *    "another-random-uuid": { "id": "another-random-uuid", "prop": "test2" }
   * }
   * ```
   * @param records the array of records of type T
   */
  set records(records: T[]) {
    if (!records || records.length === 0) {
      this.recordMap = {};
    }
    this.recordMap = records.reduce(
      (previous: { [id: string]: T }, current: T) => {
        return {
          ...previous,
          [current.id]: current,
        };
      },
      this.recordMap,
    );
  }
  get records(): T[] {
    return Object.keys(this.recordMap).map((key) => this.recordMap[key]);
  }

  /**
   * Add the supplied `record` partial to the in-memory data store of records.
   * Get the `id` of the record by getting the next available `id` value.
   * Returns the updated record with the newly generated `id`.
   * @param record the partial record of type `T` to create
   */
  public create(record: Partial<T>, getNextId: () => string = () => uuid()): T {
    const id = record.id || getNextId();
    const newRecord: T = { ...record, id } as T;
    this.recordMap = {
      ...this.recordMap,
      [newRecord.id]: newRecord,
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
    const result$ = of(this.create(record));
    return result$;
  }

  /**
   * Add the supplied `records` partials array to in-memory data store of records.
   * Get the `id` of the record by getting the next available `id` value.
   * Returns a sequential array of the records with the newly generated `ids`.
   * @param records an array of partial records of type `T` to create
   */
  public createMany(
    records: Array<Partial<T>>,
    getNextId: () => string = () => uuid(),
  ): T[] {
    return records.map((record) => this.create(record, getNextId));
  }

  /**
   * Add the supplied `records` partials array to in-memory data store of records.
   * Get the `id` of the record by getting the next available `id` value.
   * Returns a sequential array of the records with the newly generated `ids` as an Observable.
   * @param records an array of partial records of type `T` to create
   */
  public createManyAsync(
    records: Array<Partial<T>>,
    getNextId: () => string = () => uuid(),
  ): Observable<T[]> {
    const result$ = of(this.createMany(records, getNextId));
    return result$;
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
  public delete(id: string): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [id]: removed, ...remainder } = this.recordMap;
    this.recordMap = {
      ...remainder,
    };
  }

  /**
   * Remove the record of type `T` from the in-memory data store using the supplied PK id asyncronously.
   * @param id the PK id of the record
   */
  public deleteAsync(id: string): Observable<void> {
    this.delete(id);
    const result$ = of<void>();
    return result$;
  }

  /**
   * Remove the records of type `T` from the in-memory data store using the supplied PK ids.
   * @param ids the PK ids of the records
   */
  public deleteMany(ids: string[]): void {
    for (const id of ids) {
      this.delete(id);
    }
  }

  /**
   * Remove the records of type `T` from the in-memory data store using the supplied PK ids asyncronously.
   * @param ids the PK ids of the records
   */
  public deleteManyAsync(ids: string[]): Observable<void> {
    this.deleteMany(ids);
    const result$ = of<void>();
    return result$;
  }

  /**
   * Get a single record of type `T` with the supplied id value.
   * @param id the PK id of the record
   */
  public get(id: string): T {
    return this.recordMap[id];
  }

  /**
   * Get a single record of type `T` with the supplied id value as an Observable;
   * @param id the PK id of the record
   */
  public getAsync(id: string): Observable<T> {
    const result$ = of(this.get(id));
    return result$;
  }

  /**
   * Get records of type `T` with the supplied id values.
   * @param ids the PK ids of the records
   */
  public getMany(ids: string[]): T[] {
    const records = ids
      .filter((id) => this.recordMap[id])
      .map((id) => {
        return this.recordMap[id];
      });

    return records;
  }

  /**
   * Get records of type Observable `T` with the supplied id values
   * @param ids the PK ids of the records
   */
  public getManyAsync(ids: string[]): Observable<T[]> {
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
   *    "id": "random-uuid",
   *    "prop": "test1"
   *  },
   *  {
   *    "id": "another-random-uuid",
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
  public query(predicate: (record: T) => boolean): T[] {
    return this.records.filter(predicate);
  }

  /**
   * Return an array of records of type `T` filtered with the supplied predicate as an Observable.
   * Example:
   * - given records:
   * ```json5
   * [
   *  {
   *    "id": "random-uuid",
   *    "prop": "test1"
   *  },
   *  {
   *    "id": "another-random-uuid",
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
  public seed(
    recordFactory: (index: number) => Partial<T>,
    amount = 10,
    getNextId: () => string = () => uuid(),
  ): void {
    amount = amount === null ? 10 : amount;

    const recordsToCreate = [...Array(amount).keys()].map((i) =>
      recordFactory(i),
    );

    this.createMany(recordsToCreate, getNextId);
  }
}
