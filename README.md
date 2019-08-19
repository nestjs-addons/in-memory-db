# NestJS Addons: In-Memory DB Service

[![npm version](https://badge.fury.io/js/%40nestjs-addons%2Fin-memory-db.svg)](https://badge.fury.io/js/%40nestjs-addons%2Fin-memory-db)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![CircleCI](https://circleci.com/gh/nestjs-addons/in-memory-db.svg?style=svg)](https://circleci.com/gh/nestjs-addons/in-memory-db)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)

## Description

`@nestjs-addons/in-memory-db` provides a ridiculously simple, no configuration needed, way to create a simple in-memory database for use in your `nestjs` applications. You simply define an `interface` that extends the `interface InMemoryEntity`, inject the `InMemoryDBService<T>` into your controllers and/or services, and immediately profit. The records are stored in-memory, as a singleton, for each interface, for the life of the service.

This provides a great way to quickly get up and running with prototypes and mock backends.

## Installation

**With NPM**

```bash
$ npm i --save @nestjs-addons/in-memory-db
```

**With Yarn**

```bash
$ yarn add @nestjs-addons/in-memory-db
```

## Video Walkthrough

[![](http://img.youtube.com/vi/eSx6nKDw5PQ/0.jpg)](http://www.youtube.com/watch?v=eSx6nKDw5PQ 'NestJS Addons - In Memory DB - Walkthrough')

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
  imports: [InMemoryDBModule.forRoot()],
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
  getUser(@Param() id: number): UserEntity {
    return this.userService.get(id);
  }

  @Post('users')
  createUser(@Body() user: UserEntity): UserEntity {
    return this.service.create(user);
  }
}
```

## Docs

[Click here for more detailed API Documentation](API.md)

## Stay in touch

- Author - [Wes Grimes](https://wesleygrimes.com)
- Website - [https://github.com/nestjs-addons/in-memory-db](https://github.com/nestjs-addons/in-memory-db/)
- Twitter - [@wesgrimes](https://twitter.com/wesgrimes)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://wesleygrimes.com"><img src="https://avatars0.githubusercontent.com/u/324308?v=4" width="100px;" alt="Wes Grimes"/><br /><sub><b>Wes Grimes</b></sub></a><br /><a href="#infra-wesleygrimes" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=wesleygrimes" title="Tests">⚠️</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=wesleygrimes" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/cmwhited"><img src="https://avatars0.githubusercontent.com/u/18075124?v=4" width="100px;" alt="Chris Whited"/><br /><sub><b>Chris Whited</b></sub></a><br /><a href="#infra-cmwhited" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=cmwhited" title="Tests">⚠️</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=cmwhited" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/wescopeland"><img src="https://avatars0.githubusercontent.com/u/3984985?v=4" width="100px;" alt="Wes Copeland"/><br /><sub><b>Wes Copeland</b></sub></a><br /><a href="https://github.com/nestjs-addons/in-memory-db/commits?author=wescopeland" title="Code">💻</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=wescopeland" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

NestJS Addons is [MIT licensed](LICENSE).
