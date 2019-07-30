# NestJS Addons: In-Memory DB Service

## Description

`@nestjs-addons/in-memory-db` provides a ridiculously simple, no configuration needed, way to create a simple in-memory database for use in your `nestjs` applications. You simply define an `interface` that extends the `interface InMemoryEntity`, inject the `InMemoryDBService<T>` into your controllers and/or services, and immediately profit. The records are stored in-memory, as a singleton, for each interface, for the life of the service.

This provides a great way to quickly get up and running with prototypes and mock backends.

## Installation

```bash
$ npm i --save @nestjs-addons/in-memory-db
```

## Quick Start

### Import into Module(s)

To get started, let's first update our `app.module.ts` to include the necessary pieces.

> While we are importing to the AppModule in this example, InMemoryDBModule could be imported in Feature modules just as well.

```typescript
// app.module.ts

import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
...

@Module({
  ...
  imports: [InMemoryDBModule],
  ...
})
export class AppModule {}
```

As you can see we did the following:

- Import `InMemoryDBModule` from `@nestjs-addons/in-memory-db`
- Add `InMemoryDBModule` to the `imports` array in the `@Module` of your choice

### Define an interface for each InMemoryEntity

An instance of `InMemoryDBService<T>` will be created for each `InMemoryEntity` entity `interface` defined. The `InMemoryEntity` adds an `id: number` property as the only required field. Additional fields can be defined by extending the `interface`.

To define a new `InMemoryEntity` extension create an `interface` similar to the following example:

```typescript
interface UserEntity extends InMemoryEntity {
  firstName: string;
  lastName: string;
  emailAddress: string;
  admin: boolean;
}
```

Now we can make use of our new `interface` when injecting the `InMemoryDBService<T>` into our controllers or other services.

### Inject into Controller(s) and/or Services(s)

In order to use the `InMemoryDBService<T>` we need to do the following:

- Add `private readonly inMemoryDb: InMemoryDBService<T>` to the `constructor` of each controller and/or service that you would like to use it in.
- Begin using `InMemoryDBService` as expected.

An example of injecting `InMemoryDBService` into a `UserController` for the `UserEntity` we defined earlier would look something like this:

```typescript
@Controller()
export class UserController {
  constructor(private readonly userService: InMemoryDBService<UserEntity>) {}

  @Get('users/:id')
  getUser(@Param() id: number): User {
    return this.userService.get(id);
  }

  @Post('users')
  createUser(@Body() user: User): User {
    return this.service.create(user);
  }
}
```

## API Documentation

### `InMemoryDBService<T extends InMemoryEntity>`

This is the service that provides the in-memory database. All methods interact with a `records` array and implement `generics` to provide type-safety and intellisense based on the `T extends InMemoryEntity` passed in.

#### Public Methods

**`public create(record: Partial<T>): number`**

This method takes in a `Partial<T>` as we do not always know the `id` for a record when we are creating. If we leave off the `id` property the service will automatically generate an `id` for us. Upon successful creation, the method returns the generated `id`.

Example Usage:

```typescript
const newUserId = this.userService.create({
  firstName: 'Some',
  lastName: 'Person',
});

console.log({ newUserId });

// logs out
// {
//     newUserId: 1
// }
```

**`public update(record: T): void`**

This method takes in a `T` record object and updates the record in the `records` array based on the `id` in the object. This method does not return a value.

Example Usage:

```typescript
this.userService.update({
  id: 1,
  firstName: 'Other',
  lastName: 'Person',
});
```

**`public delete(id: number): void`**

This method takes in a `id: number` and deletes the record from the `records` array based on the `id` in the object. This method does not return a value.

Example Usage:

```typescript
this.userService.delete(1);
```

**`public get(id: number): T`**

This method takes in a `id: number` and returns the record from the `records` array based on the `id` in the object.

Example Usage:

```typescript
const foundUser = this.userService.get(1);

console.log({ foundUser });

// logs out
// {
//     foundUser: {
//         id:1,
//         firstName: 'Some',
//         lastName: 'Person'
//    }
// }
```

**`public getAll(): T[]`**

This method has no parameters and returns the all from the `records` array.

Example Usage:

```typescript
const allUsers = this.userService.getAll();

console.log({ allUsers });

// logs out
// {
//   allUsers: [
//     {
//       id: 1,
//       firstName: 'Some',
//       lastName: 'Person'
//     },
//     {
//       id: 2,
//       firstName: 'Other',
//       lastName: 'Person'
//     }
//   ];
// }
```

**`public query(predicate: (record: T) => boolean): T[]`**

This method has takes in a `record: T` predicate and returns all from the `records` array that meet that predicate's requirements.

Example Usage:

```typescript
const foundUsers = this.userService.query(
  record => record.lastName === 'Person',
);

console.log({ foundUsers });

// logs out
// {
//   allUsers: [
//     {
//       id: 1,
//       firstName: 'Some',
//       lastName: 'Person'
//     },
//     {
//       id: 2,
//       firstName: 'Other',
//       lastName: 'Person'
//     }
//   ];
// }
```

#### Public Properties

- `records: T[]` - This is the in-memory array used in all crud and read operations for the service. Please access with care.

### `InMemoryEntity`

This is an interface used by the `InMemoryDBService` for intellisense and type-safety. Do not use this interface directly. Rather, implement your own `interface` that `extends` this.

```typescript
export interface InMemoryDBEntity {
  id: number;
}
```

## Stay in touch

- Author - [Wes Grimes](https://wesleygrimes.com)
- Website - [https://github.com/nestjs-addons/in-memory-db](https://github.com/nestjs-addons/in-memory-db/)
- Twitter - [@wesgrimes](https://twitter.com/wesgrimes)

## License

NestJS Addons is [MIT licensed](LICENSE).
