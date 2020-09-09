import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InMemoryDBV1Service } from '../services';
import { InMemoryDBV1Entity } from '../interfaces';

/**
 * @deprecated since version 2.0.0, please use InMemoryDBEntityController
 * @example
 *
 * ```ts
 * @Controller('api/user')
 * class UsersController extends InMemoryDBV1Controller<User> {
 *
 *   constructor(protected dbService: InMemoryDBV1Service<User>) {
 *     super(dbService);
 *   }
 *
 * }
 *
 * ```
 */
export abstract class InMemoryDBV1EntityController<
  T extends InMemoryDBV1Entity
> {
  constructor(protected readonly dbService: InMemoryDBV1Service<T>) {}

  @Post()
  public create(@Body() record: Partial<T> | Array<Partial<T>>): T | T[] {
    if (Array.isArray(record)) {
      return this.dbService.createMany(record);
    }
    return this.dbService.create(record);
  }

  @Put(':id')
  public update(@Param('id') id: T['id'], @Body() record: Partial<T>): void {
    return this.dbService.update({ id, ...record } as T);
  }

  @Put()
  public updateMany(@Body() records: T[]): void {
    return this.dbService.updateMany(records);
  }

  @Delete(':id')
  public delete(@Param('id') id: T['id']): void {
    return this.dbService.delete(id);
  }

  @Delete()
  public deleteMany(@Body() ids: Array<T['id']>): void {
    return this.dbService.deleteMany(ids);
  }

  @Get(':id')
  public get(@Param('id') id: T['id']): T {
    return this.dbService.get(id);
  }

  @Get()
  public getMany(@Body() ids?: Array<T['id']>): T[] {
    if (ids && Array.isArray(ids)) {
      return this.dbService.getMany(ids);
    }
    return this.dbService.getAll();
  }
}
