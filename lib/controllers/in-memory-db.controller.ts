import { Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InMemoryDBService } from '../services';
import { EntityIDType } from '../interfaces';

/**
 * @example
 *
 * ```ts
 * @Controller('api/user')
 * class UsersController extends InMemoryDBController<User> {
 *
 *   constructor(protected dbService: InMemoryDBService<User>) {
 *     super(dbService);
 *   }
 *
 * }
 *
 * ```
 */
export abstract class InMemoryDBEntityController<T> {
  constructor(protected readonly dbService: InMemoryDBService<T>) {}

  @Post()
  public create(@Body() record: Partial<T> | Array<Partial<T>>): T | T[] {
    if (Array.isArray(record)) {
      return this.dbService.createMany(record);
    }
    return this.dbService.create(record);
  }

  @Put(':id')
  public update(
    @Param('id') id: EntityIDType,
    @Body() record: Partial<T>,
  ): void {
    return this.dbService.update({ [this.dbService.idKey]: id, ...record });
  }

  @Put()
  public updateMany(@Body() records: T[]): void {
    return this.dbService.updateMany(records);
  }

  @Delete(':id')
  public delete(@Param('id') id: EntityIDType): void {
    return this.dbService.delete(id);
  }

  @Delete()
  public deleteMany(@Body() ids: EntityIDType[]): void {
    return this.dbService.deleteMany(ids);
  }

  @Get(':id')
  public get(@Param('id') id: EntityIDType): T {
    return this.dbService.get(id);
  }

  @Get()
  public getMany(@Body() ids?: EntityIDType[]): T[] {
    if (ids && Array.isArray(ids)) {
      return this.dbService.getMany(ids);
    }
    return this.dbService.getAll();
  }
}
