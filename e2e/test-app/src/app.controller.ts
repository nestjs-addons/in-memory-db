import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InMemoryDBService } from '../../../lib';
import { User } from './user';

@Controller('api/')
export class AppController {
  constructor(private readonly inMemoryDBService: InMemoryDBService<User>) {}

  @Get('user/:id')
  getUser(@Param('id') id: number): User {
    return this.inMemoryDBService.get(id);
  }

  @Get('users')
  getUsers(): User[] {
    return this.inMemoryDBService.getAll();
  }

  @Get('users/firstName/:firstName')
  getByFirstName(@Param('firstName') firstName: string): User[] {
    return this.inMemoryDBService.query(user => user.firstName === firstName);
  }

  @Get('users/lastname/:lastName')
  getByLastName(@Param('lastName') lastName: string): User[] {
    return this.inMemoryDBService.query(user => user.lastName === lastName);
  }

  @Post('user')
  createUser(@Body() user: User): User {
    return this.inMemoryDBService.create(user);
  }

  @Post('users')
  createUsers(@Body() users: User[]): User[] {
    return this.inMemoryDBService.createMany(users);
  }

  @Put('user/:id')
  updateUser(@Body() user: User): void {
    return this.inMemoryDBService.update(user);
  }

  @Put('users')
  updateUsers(@Body() users: User[]): void {
    return this.inMemoryDBService.updateMany(users);
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: number): void {
    return this.inMemoryDBService.delete(id);
  }

  @Delete('users')
  deleteUsers(@Body() ids: number[]): void {
    return this.inMemoryDBService.deleteMany(ids);
  }
}
