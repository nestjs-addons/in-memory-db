import { Injectable, Optional } from '@nestjs/common';

import { InMemoryDBV1Config, InMemoryDBV1Entity } from '../interfaces';
import { Observable, of } from 'rxjs';

/**
 * @deprecated since version 2.0.0, please use InMemoryDBService
 */
@Injectable()
export class InMemoryDBV1Service<T extends InMemoryDBV1Entity> {
  private recordMap: { [id: number]: T } = {};

  constructor(@Optional() private readonly config: InMemoryDBV1Config) {}

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
    return Object.keys(this.recordMap).map((key) => this.recordMap[key]);
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
    return records.map((record) => this.create(record));
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
  public delete(id: number): void {
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
  public deleteAsync(id: number): Observable<void> {
    this.delete(id);
    const result$ = of<void>();
    return result$;
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
    this.deleteMany(ids);
    const result$ = of<void>();
    return result$;
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
    const result$ = of(this.get(id));
    return result$;
  }

  /**
   * Get records of type `T` with the supplied id values.
   * @param ids the PK ids of the records
   */
  public getMany(ids: number[]): T[] {
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
  public getManyAsync(ids: number[]): Observable<T[]> {
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
  public seed(recordFactory: (index: number) => Partial<T>, amount = 10): void {
    amount = amount === null ? 10 : amount;

    const recordsToCreate = [...Array(amount).keys()].map((i) =>
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
      return Math.max(...this.records.map((r) => r.id)) + 1;
    }

    return 1;
  }
}
