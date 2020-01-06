import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InMemoryDBService } from '../services';
import { Observable } from 'rxjs';
import { EntityIDType } from '../interfaces';

/**
 * @example
 *
 * ```ts
 * @Controller('api/user')
 * class UsersController extends InMemoryDBEntityAsyncController<User> {
 *
 *   constructor(protected dbService: InMemoryDBService<User>) {
 *     super(dbService);
 *   }
 *
 * }
 *
 * ```
 */
export abstract class InMemoryDBEntityAsyncController<T> {
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
    @Param('id') id: EntityIDType,
    @Body() record: Partial<T>,
  ): Observable<void> {
    return this.dbService.updateAsync({
      ...record,
      [this.dbService.idKey]: id,
    } as Partial<T>);
  }

  @Put()
  public updateMany(@Body() records: T[]): Observable<void> {
    return this.dbService.updateManyAsync(records);
  }

  @Delete(':id')
  public delete(@Param('id') id: EntityIDType): Observable<void> {
    return this.dbService.deleteAsync(id);
  }

  @Delete()
  public deleteMany(@Body() ids: EntityIDType[]): Observable<void> {
    return this.dbService.deleteManyAsync(ids);
  }

  @Get(':id')
  public get(@Param('id') id: EntityIDType): Observable<T> {
    return this.dbService.getAsync(id);
  }

  @Get()
  public getMany(@Body() ids?: EntityIDType[]): Observable<T[]> {
    if (ids && Array.isArray(ids)) {
      return this.dbService.getManyAsync(ids);
    }
    return this.dbService.getAllAsync();
  }
}
