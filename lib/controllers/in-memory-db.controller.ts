import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InMemoryDBService } from '../services';
import { InMemoryDBEntity } from '../interfaces';
import { Observable } from 'rxjs';

/**
 * @example
 *
 * ```ts
 * @Controller('api/user')
 * class UsersController extends InMemoryDbController<User> {
 *
 *   constructor(private dbService: InMemoryDBService<User>) {
 *     super(dbService);
 *   }
 *
 * }
 *
 * ```
 */
export abstract class InMemoryDbEntityController<T extends InMemoryDBEntity> {
  constructor(protected readonly dbService: InMemoryDBService<T>) {}

  @Post()
  public createAsync(@Body() record: Partial<T>): Observable<T> {
    return this.dbService.createAsync(record);
  }

  @Post()
  public createManyAsync(@Body() records: Array<Partial<T>>): Observable<T[]> {
    return this.dbService.createManyAsync(records);
  }

  @Put(':id')
  public updateAsync(
    @Param('id') id: T['id'],
    @Body() record: Partial<T>,
  ): Observable<void> {
    return this.dbService.updateAsync({ id, ...record } as T);
  }

  @Put()
  public updateManyAsync(@Body() records: T[]): Observable<void> {
    return this.dbService.updateManyAsync(records);
  }

  @Delete(':id')
  public deleteAsync(@Param('id') id: T['id']): Observable<void> {
    return this.dbService.deleteAsync(id);
  }

  @Delete()
  public deleteManyAsync(@Body() ids: Array<T['id']>): Observable<void> {
    return this.dbService.deleteManyAsync(ids);
  }

  @Get(':id')
  public getAsync(@Param('id') id: T['id']): Observable<T> {
    return this.dbService.getAsync(id);
  }

  @Get()
  public getManyAsync(@Body() ids: Array<T['id']>): Observable<T[]> {
    return this.dbService.getManyAsync(ids);
  }

  @Get()
  public getAllAsync(): Observable<T[]> {
    return this.dbService.getAllAsync();
  }
}
