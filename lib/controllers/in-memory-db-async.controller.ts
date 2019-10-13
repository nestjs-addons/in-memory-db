import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { InMemoryDBEntity } from '../interfaces';
import { InMemoryDBService } from '../services';

/**
 * @example
 *
 * ```ts
 * @Controller('api/user')
 * class UsersController extends InMemoryDBEntityAsyncController<User> {
 *
 *   constructor(
 *    protected dbService: InMemoryDBService<User>
 *   ) {
 *     super(dbService);
 *   }
 * }
 *
 * ```
 */
export abstract class InMemoryDBEntityAsyncController<
  T extends InMemoryDBEntity
> {
  constructor(protected readonly dbService: InMemoryDBService<T>) {}

  @Post()
  public create(
    @Body() record: Partial<T> | Array<Partial<T>>,
  ): Observable<T | T[]> {
    if (Array.isArray(record)) {
      return this.dbService.createManyAsync(record);
    }
    return this.dbService.createAsync(record);
  }

  @Put(':id')
  public update(
    @Param('id') id: T['id'],
    @Body() record: Partial<T>,
  ): Observable<void> {
    return this.dbService.updateAsync({ id, ...record } as T);
  }

  @Put()
  public updateMany(@Body() records: T[]): Observable<void> {
    return this.dbService.updateManyAsync(records);
  }

  @Delete(':id')
  public delete(@Param('id') id: T['id']): Observable<void> {
    return this.dbService.deleteAsync(id);
  }

  @Delete()
  public deleteMany(@Body() ids: Array<T['id']>): Observable<void> {
    return this.dbService.deleteManyAsync(ids);
  }

  @Get(':id')
  public get(@Param('id') id: T['id']): Observable<T> {
    return this.dbService.getAsync(id);
  }

  @Get()
  public getMany(@Body() ids?: Array<T['id']>): Observable<T[]> {
    if (ids && Array.isArray(ids)) {
      return this.dbService.getManyAsync(ids);
    }
    return this.dbService.getAllAsync();
  }
}
