import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InMemoryDBV1Service } from '../../../lib';

import { Observable } from 'rxjs';
import { User } from './user';

@Controller('api/')
export class AppController {
  constructor(private readonly inMemoryDBService: InMemoryDBV1Service<User>) {}

  @Get('user/:id')
  getUser(@Param('id') id: number): User {
    return this.inMemoryDBService.get(id);
  }

  @Get('user/:id/async')
  getUserAsync(@Param('id') id: number): Observable<User> {
    return this.inMemoryDBService.getAsync(id);
  }

  @Get('users')
  getUsers(): User[] {
    return this.inMemoryDBService.getAll();
  }

  @Get('users/async')
  getUsersAsync(): Observable<User[]> {
    return this.inMemoryDBService.getAllAsync();
  }

  @Get('users/firstName/:firstName')
  getByFirstName(@Param('firstName') firstName: string): User[] {
    return this.inMemoryDBService.query((user) => user.firstName === firstName);
  }

  @Get('users/firstName/:firstName/async')
  getByFirstNameAsync(
    @Param('firstName') firstName: string,
  ): Observable<User[]> {
    return this.inMemoryDBService.queryAsync(
      (user) => user.firstName === firstName,
    );
  }

  @Get('users/lastname/:lastName')
  getByLastName(@Param('lastName') lastName: string): User[] {
    return this.inMemoryDBService.query((user) => user.lastName === lastName);
  }

  @Get('users/lastName/:lastName/async')
  getByLastNameAsync(@Param('lastName') lastName: string): Observable<User[]> {
    return this.inMemoryDBService.queryAsync(
      (user) => user.lastName === lastName,
    );
  }

  @Post('user')
  createUser(@Body() user: User): User {
    return this.inMemoryDBService.create(user);
  }

  @Post('user/async')
  createUserAsync(@Body() user: User): Observable<User> {
    return this.inMemoryDBService.createAsync(user);
  }

  @Post('users')
  createUsers(@Body() users: User[]): User[] {
    return this.inMemoryDBService.createMany(users);
  }

  @Post('users/async')
  createUsersAsync(@Body() users: User[]): Observable<User[]> {
    return this.inMemoryDBService.createManyAsync(users);
  }

  @Put('user/:id')
  updateUser(@Body() user: User): void {
    return this.inMemoryDBService.update(user);
  }

  @Put('user/:id/async')
  updateUserAsync(@Body() user: User): Observable<void> {
    return this.inMemoryDBService.updateAsync(user);
  }

  @Put('users')
  updateUsers(@Body() users: User[]): void {
    return this.inMemoryDBService.updateMany(users);
  }

  @Put('users/async')
  updateUsersAsync(@Body() users: User[]): Observable<void> {
    return this.inMemoryDBService.updateManyAsync(users);
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: number): void {
    return this.inMemoryDBService.delete(id);
  }

  @Delete('user/:id/async')
  deleteUserAsync(@Param('id') id: number): Observable<void> {
    return this.inMemoryDBService.deleteAsync(id);
  }

  @Delete('users')
  deleteUsers(@Body() ids: number[]): void {
    return this.inMemoryDBService.deleteMany(ids);
  }

  @Delete('users/async')
  deleteUsersAsync(@Body() ids: number[]): Observable<void> {
    return this.inMemoryDBService.deleteManyAsync(ids);
  }
}
