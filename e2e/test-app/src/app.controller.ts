import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from './user';

@Controller()
export class AppController {
  constructor(private readonly inMemoryDBService: InMemoryDBService<User>) {}

  @Get(':id')
  getUser(@Param('id') id: number): User {
    return this.inMemoryDBService.get(id);
  }

  @Get(':id')
  getUserAsync(@Param('id') id: number): Observable<User> {
    return this.inMemoryDBService.getAsync(id);
  }

  @Get()
  getUsers(): User[] {
    return this.inMemoryDBService.getAll();
  }

  @Get()
  getUsersAsync(): Observable<User[]> {
    return this.inMemoryDBService.getAllAsync();
  }

  @Get(':firstName')
  getByFirstName(@Param('firstName') firstName: string): User[] {
    return this.inMemoryDBService.query(user => user.firstName === firstName);
  }

  @Get(':firstName')
  getByFirstNameAsync(
    @Param('firstName') firstName: string,
  ): Observable<User[]> {
    return this.inMemoryDBService.queryAsync(
      user => user.firstName === firstName,
    );
  }

  @Get(':lastName')
  getByLastName(@Param('lastName') lastName: string): User[] {
    return this.inMemoryDBService.query(user => user.lastName === lastName);
  }

  @Get(':lastName')
  getByLastNameAsync(@Param('lastName') lastName: string): Observable<User[]> {
    return this.inMemoryDBService.queryAsync(
      user => user.lastName === lastName,
    );
  }

  @Post()
  createUser(@Body() user: User): User {
    return this.inMemoryDBService.create(user);
  }

  @Post()
  createUserAsync(@Body() user: User): Observable<User> {
    return this.inMemoryDBService.createAsync(user);
  }

  @Post()
  createUsers(@Body() users: User[]): User[] {
    return this.inMemoryDBService.createMany(users);
  }

  @Post()
  createUsersAsync(@Body() users: User[]): Observable<User[]> {
    return this.inMemoryDBService.createManyAsync(users);
  }

  @Put()
  updateUser(@Body() user: User): void {
    return this.inMemoryDBService.update(user);
  }

  @Put()
  updateUserAsync(@Body() user: User): Observable<void> {
    return this.inMemoryDBService.updateAsync(user);
  }

  @Put()
  updateUsers(@Body() users: User[]): void {
    return this.inMemoryDBService.updateMany(users);
  }

  @Put()
  updateUsersAsync(@Body() users: User[]): Observable<void> {
    return this.inMemoryDBService.updateManyAsync(users);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number): void {
    return this.inMemoryDBService.delete(id);
  }

  @Delete(':id')
  deleteUserAsync(@Param('id') id: number): Observable<void> {
    return this.inMemoryDBService.deleteAsync(id);
  }

  @Delete()
  deleteUsers(@Body() ids: number[]): void {
    return this.inMemoryDBService.deleteMany(ids);
  }

  @Delete()
  deleteUsersAsync(@Body() ids: number[]): Observable<void> {
    return this.inMemoryDBService.deleteManyAsync(ids);
  }
}
