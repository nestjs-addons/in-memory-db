import { Injectable, Optional } from '@nestjs/common';

import {
  InMemoryDBConfig,
  InMemoryDBEntity,
  InMemoryDBRecordType,
} from '../interfaces';
import { Observable, of } from 'rxjs';
import { InMemoryDBMap } from '../common/in-memory-db-map';

@Injectable()
export class InMemoryDBService<
  KeyType,
  RecordType extends InMemoryDBRecordType<KeyType>
> {
  private readonly map: InMemoryDBMap<KeyType, RecordType>;

  constructor(@Optional() private readonly config: InMemoryDBConfig) {}

  /**
   * Add the supplied `record` partial to the in-memory data store of records.
   * Get the `id` of the record by getting the next available `id` value.
   * Returns the updated record with the newly generated `id`.
   * @param record the partial record of type `T` to create
   */
  public create(record: Partial<RecordType>): RecordType {
    return this.map.create(record);
  }

  /**
   * Add the supplied `record` partial to the in-memroy data store of records asyncronously.
   * Get the `id` of the record by getting the next available `id` value.
   * Returns the updated record with the newly generated `id` as an observable.
   * @param record the partial record of type `T` to create
   */
  public createAsync(record: Partial<RecordType>): Observable<RecordType> {
    const result$ = of(this.create(record));
    return result$;
  }

  /**
   * Add the supplied `records` partials array to in-memory data store of records.
   * Get the `id` of the record by getting the next available `id` value.
   * Returns a sequential array of the records with the newly generated `ids`.
   * @param records an array of partial records of type `T` to create
   */
  public createMany(records: Array<Partial<RecordType>>): RecordType[] {
    return records.map(record => this.create(record));
  }

  /**
   * Add the supplied `records` partials array to in-memory data store of records.
   * Get the `id` of the record by getting the next available `id` value.
   * Returns a sequential array of the records with the newly generated `ids` as an Observable.
   * @param records an array of partial records of type `T` to create
   */
  public createManyAsync(
    records: Array<Partial<RecordType>>,
  ): Observable<RecordType[]> {
    const result$ = of(this.createMany(records));
    return result$;
  }

  /**
   * Update a record in the in-memory data store of type `T` using the supplied record.
   * @param record the record of type `T` to update
   */
  public update(record: RecordType): void {
    this.map.update(record);
  }

  /**
   * Update a record in the in-memory data store of type `T` using the supplied record asyncronously.
   * @param record the record of type `T` to update
   */
  public updateAsync(record: RecordType): Observable<void> {
    this.update(record);
    const result$ = of<void>();
    return result$;
  }

  /**
   * Update records in the in-memory data store of type `T` using the supplied records.
   * @param records an array of records of type `T` to update
   */
  public updateMany(records: RecordType[]): void {
    for (const record of records) {
      this.update(record);
    }
  }

  /**
   * Update records in the in-memory data store of type `T` using the supplied records asyncronously.
   * @param records an array of records of type `T` to update
   */
  public updateManyAsync(records: RecordType[]): Observable<void> {
    this.updateMany(records);
    const result$ = of<void>();
    return result$;
  }

  /**
   * Remove the record of type `T` from the in-memory data store using the supplied PK id.
   * @param id the PK id of the record
   */
  public delete(id: KeyType): void {
    this.map.delete(id);
  }

  /**
   * Remove the record of type `T` from the in-memory data store using the supplied PK id asyncronously.
   * @param id the PK id of the record
   */
  public deleteAsync(id: KeyType): Observable<void> {
    this.delete(id);
    const result$ = of<void>();
    return result$;
  }

  /**
   * Remove the records of type `T` from the in-memory data store using the supplied PK ids.
   * @param ids the PK ids of the records
   */
  public deleteMany(ids: KeyType[]): void {
    for (const id of ids) {
      this.delete(id);
    }
  }

  /**
   * Remove the records of type `T` from the in-memory data store using the supplied PK ids asyncronously.
   * @param ids the PK ids of the records
   */
  public deleteManyAsync(ids: KeyType[]): Observable<void> {
    this.deleteMany(ids);
    const result$ = of<void>();
    return result$;
  }

  /**
   * Get a single record of type `T` with the supplied id value.
   * @param id the PK id of the record
   */
  public get(id: KeyType): RecordType {
    return this.map.get(id);
  }

  /**
   * Get a single record of type `T` with the supplied id value as an Observable;
   * @param id the PK id of the record
   */
  public getAsync(id: KeyType): Observable<RecordType> {
    const result$ = of(this.get(id));
    return result$;
  }

  /**
   * Get records of type `T` with the supplied id values.
   * @param ids the PK ids of the records
   */
  public getMany(ids: KeyType[]): RecordType[] {
    return this.map.getMany(ids);
  }

  /**
   * Get records of type Observable `T` with the supplied id values
   * @param ids the PK ids of the records
   */
  public getManyAsync(ids: KeyType[]): Observable<RecordType[]> {
    const result$ = of(this.getMany(ids));
    return result$;
  }

  /**
   * Return all of the records of type `T`.
   */
  public getAll(): RecordType[] {
    return this.map.getAll();
  }

  /**
   * Return all the records of type `T` as an Observable.
   */
  public getAllAsync(): Observable<RecordType[]> {
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
  public query(predicate: (record: RecordType) => boolean) {
    return this.getAll().filter(predicate);
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
  public queryAsync(
    predicate: (record: RecordType) => boolean,
  ): Observable<RecordType[]> {
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
    recordFactory: (index: number) => Partial<RecordType>,
    amount = 10,
  ) {
    amount = amount === null ? 10 : amount;

    const recordsToCreate = [...Array(amount).keys()].map(i =>
      recordFactory(i),
    );

    this.createMany(recordsToCreate);
  }
}
