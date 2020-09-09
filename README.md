# NestJS Addons: In-Memory DB

[![npm version](https://badge.fury.io/js/%40nestjs-addons%2Fin-memory-db.svg)](https://badge.fury.io/js/%40nestjs-addons%2Fin-memory-db)
[![npm downloads](https://img.shields.io/npm/dt/@nestjs-addons/in-memory-db?label=npm%20downloads)](https://www.npmjs.com/package/@nestjs-addons/in-memory-db)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![CI Status](https://github.com/nestjs-addons/in-memory-db/workflows/master/badge.svg)](#)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors)

## Breaking Changes

Please note that starting with V2.0.0, the InMemoryDB\* has been deprecated and moved to V1 instances. For more information on this API, checkout docs here: [V1 Docs](API_V1.md).

Detailed Changes:

- All V1 assets have been renamed to `InMemoryDBv1***`
- New V2+ assets are the same name as before the V1 deprecation. You will just need to make modifications to support the `id` being a `string` as opposed to `number`
- `id` has been changed from `number` to `string` to support GUIDs.
- You can now _optionally_ provide a `getNextId` function that the service will use to generate new string IDs. By default, it will use the `uuid` npm package and `v4` implementation.

## Description

`@nestjs-addons/in-memory-db` provides a ridiculously simple, no configuration needed, way to create a simple in-memory database for use in your `nestjs` applications. You simply define an `interface` that extends the `interface InMemoryDBEntity`, inject the `InMemoryDBService<T>` into your controllers and/or services, and immediately profit. The records are stored in-memory, as a singleton, for each interface, for the life of the service.

This provides a great way to quickly get up and running with prototypes and mock backends.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Feature Modules](#feature-modules---registering-multiple-instances-using-forfeature)
- [Entity Controller](#entity-controller)

## Installation

### Option 1

**With NPM**

```bash
$ npm i --save @nestjs-addons/in-memory-db
```

**With Yarn**

```bash
$ yarn add @nestjs-addons/in-memory-db
```

### Option 2

The library support nest add command, you can run the below command to install and import the libary to root module.

```bash
nest add @nestjs-addons/in-memory-db
```

## Video Walkthrough

[![](http://img.youtube.com/vi/eSx6nKDw5PQ/0.jpg)](http://www.youtube.com/watch?v=eSx6nKDw5PQ 'NestJS Addons - In Memory DB - Walkthrough')

## Quick Start

### Import into Module(s)

To get started, let's first update our `app.module.ts` to include the necessary pieces.

> While we are importing to the AppModule in this example, InMemoryDBModule could be imported in Feature modules just as well.

#### Registering a forRoot InMemoryDBModule

```typescript
// app.module.ts

import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
...

@Module({
  ...
  imports: [InMemoryDBModule.forRoot({})],
  ...
})
export class AppModule {}
```

As you can see we did the following:

- Import `InMemoryDBModule` from `@nestjs-addons/in-memory-db`
- Add `InMemoryDBModule` to the `imports` array in the `@Module` of your choice

### Define an interface for each InMemoryEntity

An instance of `InMemoryDBService<T>` will be created for each `InMemoryDBEntity` entity `interface` defined. The `InMemoryDBEntity` adds an `id: string` property as the only required field. Additional fields can be defined by extending the `interface`.

To define a new `InMemoryDBEntity` extension create an `interface` similar to the following example:

```typescript
interface UserEntity extends InMemoryDBEntity {
  firstName: string;
  lastName: string;
  emailAddress: string;
  admin: boolean;
}
```

Now we can make use of our new `interface` when injecting the `InMemoryDBService<T>` into our controllers or other services.

### Inject into Controller(s) and/or Services(s)

In order to use the `InMemoryDBService<T>` we need to do the following:

- Add `private readonly inMemoryDB: InMemoryDBService<T>` to the `constructor` of each controller and/or service that you would like to use it in.
- Begin using `InMemoryDBService` as expected.

An example of injecting `InMemoryDBService` into a `UserController` for the `UserEntity` we defined earlier would look something like this:

```typescript
@Controller()
export class UserController {
  constructor(private readonly userService: InMemoryDBService<UserEntity>) {}

  @Get('users/:id')
  getUser(@Param() id: string): UserEntity {
    return this.userService.get(id);
  }

  @Post('users')
  createUser(@Body() user: UserEntity): UserEntity {
    return this.userService.create(user);
  }
}
```

## Feature Modules - Registering Multiple Instances using `forFeature`

Registering multiple instances for specific feature modules is super simple. Each feature module is guaranteed isolated to that feature. In order to get up and running you need to do the following:

#### Registering a forFeature InMemoryDBService

For each feature module(s), do the following:

```typescript
// feature-one.module.ts

import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
...

@Module({
  ...
  imports: [InMemoryDBModule.forFeature('one', {})],
  ...
})
export class FeatureOneModule {}
```

As you can see we:

- Imported `InMemoryDBModule` from `@nestjs-addons/in-memory-db`
- Added `InMemoryDBModule` to the `imports` array in the `@Module` of your choice
- Added the `forFeature` method call passing `one` as the feature name

#### Using the Feature Instance

If you would like to use the feature-specific instance, make use of the included `@InjectInMemoryDBService` decorator:

```typescript
@Controller({...})
export class FeatureOneController {
  constructor(@InjectInMemoryDBService('one') private oneService: InMemoryDBService<OneEntity>) {}
  ...
  @Get()
  getAll(): OneEntity[] {
    return this.oneService.getAll();
  }
}
```

Using this decorator ensures that the correct instance is injected.

## Entity Controller

In order to prevent code duplication and boilerplate for each controller, we have created two base entity controllers `InMemoryDBEntityController` and `InMemoryDBEntityAsyncController`. This allows you to quickly provide endpoints to make requests without having to manually implement each action.

To use the controllers, simply create a new controller and extend it with one of the provided base controllers.

```typescript
@Controller('api/users')
class UsersController extends InMemoryDBEntityController<UserEntity> {
  constructor(protected dbService: InMemoryDBService<UserEntity>) {
    super(dbService);
  }
}
```

In order to have an Entity Controller use a feature-specific instance of the service, use the decorator `InjectInMemoryDBService` in the controller's provided by this library as shown below:

```typescript
@Controller('api/users')
class UsersController extends InMemoryDBEntityController<UserEntity> {
  constructor(
    @InjectInMemoryDBService('customer')
    protected readonly inMemoryDBService: InMemoryDBService<UserEntity>,
  ) {
    super(inMemoryDBService);
  }
}
```

## Docs

[Click here for more detailed API Documentation](API.md)

[DEPRECATED V1 API - Click here for more detailed API Documentation](API_V1.md)

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
    <td align="center"><a href="http://hirejordanpowell.com"><img src="https://avatars0.githubusercontent.com/u/3605268?v=4" width="100px;" alt="Jordan"/><br /><sub><b>Jordan</b></sub></a><br /><a href="https://github.com/nestjs-addons/in-memory-db/commits?author=jordanpowell88" title="Code">💻</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=jordanpowell88" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://www.santoshyadav.dev"><img src="https://avatars3.githubusercontent.com/u/11923975?v=4" width="100px;" alt="Santosh Yadav"/><br /><sub><b>Santosh Yadav</b></sub></a><br /><a href="https://github.com/nestjs-addons/in-memory-db/commits?author=santoshyadav198613" title="Code">💻</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=santoshyadav198613" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/itayod"><img src="https://avatars2.githubusercontent.com/u/6719615?v=4" width="100px;" alt="Itay Oded"/><br /><sub><b>Itay Oded</b></sub></a><br /><a href="https://github.com/nestjs-addons/in-memory-db/commits?author=itayod" title="Code">💻</a> <a href="https://github.com/nestjs-addons/in-memory-db/commits?author=itayod" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

NestJS Addons is [MIT licensed](LICENSE).
