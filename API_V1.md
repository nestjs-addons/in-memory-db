# API Documentation - V1

## `InMemoryDBV1Service<T extends InMemoryDBV1Entity>`

This is the service that provides the in-memory database. All methods interact with a `records` array and implement `generics` to provide type-safety and intellisense based on the `T extends InMemoryDBV1Entity` passed in.

### Public Methods

**`public create(record: Partial<T>): T`**

This method takes in a `Partial<T>` as we do not always know the `id` for a record when we are creating. If we leave off the `id` property the service will automatically generate an `id` for us. Upon successful creation, the method returns the record with the newly generated `id`.

Example Usage:

```typescript
const newUser = this.userService.create({
  firstName: 'Some',
  lastName: 'Person',
});

console.log({ newUser });

// logs out
// {
//     newUser: {
//        id: 1,
//        firstName: 'Some',
//        lastName: 'Person,
//    }
// }
```

**`public createMany(records: Array<Partial<T>>): T[]`**

This method takes in an array of `Partial<T>` as we do not always know the `id` for records when we are creating. If we leave off the `id` properties the service will automatically generate `id`s for us. Upon successful creation, the method returns the an array of records with the newly generated `id`s.

Example Usage:

```typescript
const recordsToCreate = [
  {
    firstName: 'Some',
    lastName: 'Person',
  },
  {
    firstName: 'Other',
    lastName: 'Person',
  },
];

const newUsers = this.userService.createMany(recordsToCreate);

console.log({ newUsers });

// logs out
// {
//     newUsers: [{
//        id: 1,
//        firstName: 'Some',
//        lastName: 'Person,
//    },
//    {
//        id: 2,
//        firstName: 'Other',
//        lastName: 'Person,
//    }]
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
  (record) => record.lastName === 'Person',
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

### Public Properties

- `records: T[]` - This is the in-memory array used in all crud and read operations for the service. Please access with care.

## `InMemoryDBV1Entity`

This is an interface used by the `InMemoryDBV1Service` for intellisense and type-safety. Do not use this interface directly. Rather, implement your own `interface` that `extends` this.

```typescript
export interface InMemoryDBV1Entity {
  id: number;
}
```
