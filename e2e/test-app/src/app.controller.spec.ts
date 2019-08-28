import { Test, TestingModule } from '@nestjs/testing';
import { User, AppController } from './';
import { InMemoryDBModule } from '../../../lib';
import { marbles } from 'rxjs-marbles';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [InMemoryDBModule],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('can create instance', () => {
      // asert
      expect(appController).toBeTruthy();
    });

    describe('POSTs', () => {
      const user: User = { id: 1, firstName: 'John', lastName: 'Doe' };

      it('createUser', () => {
        // arrange
        const expectedResult = user;

        // act
        jest
          .spyOn(appController, 'createUser')
          .mockImplementation(() => expectedResult);

        // assert
        expect(appController.createUser(user)).toBe(expectedResult);
      });
      it(
        'createUserAsync',
        marbles(m => {
          // arrange
          const expectedResult = m.cold('a|', user);

          // act
          jest
            .spyOn(appController, 'createUserAsync')
            .mockImplementation(() => expectedResult);

          // assert
          m.expect(appController.createUserAsync(user)).toBeObservable(
            expectedResult,
          );
        }),
      );
      it('creatUsers', () => {
        // arrange
        const user2: User = { id: 2, firstName: 'Jane', lastName: 'Doe' };
        const user3: User = { id: 3, firstName: 'Joe', lastName: 'Schmoe' };
        const expectedResults = [user2, user3];

        // act
        jest
          .spyOn(appController, 'createUsers')
          .mockImplementation(() => expectedResults);

        // assert
        expect(appController.createUsers([user2, user3])).toBe(expectedResults);
      });
      it(
        'createUsersAsync',
        marbles(m => {
          // arrange
          const user4: User = { id: 4, firstName: '', lastName: '' };
          const user5: User = { id: 5, firstName: '', lastName: '' };
          const expectedResults = m.cold('a|', [user4, user5]);

          // act
          jest
            .spyOn(appController, 'createUsersAsync')
            .mockImplementation(() => expectedResults);

          // assert
          m.expect(
            appController.createUsersAsync([user4, user5]),
          ).toBeObservable(expectedResults);
        }),
      );
    });

    describe('PUTs', () => {
      const user2: User = { id: 2, firstName: 'Jane', lastName: 'Doe' };
      const user3: User = { id: 3, firstName: 'Joe', lastName: 'Schmoe' };
      const user4: User = { id: 4, firstName: '', lastName: '' };
      const user5: User = { id: 5, firstName: '', lastName: '' };

      it('updateUser', () => {
        // arrange
        user4.firstName = 'Baker';
        user4.lastName = 'Mayfield';
        const expectedResult = user4;

        // act
        jest
          .spyOn(appController, 'updateUser')
          .mockImplementation(() => expectedResult);

        // assert
        expect(appController.updateUser(user4)).toBe(expectedResult);
      });
      it(
        'updateUserAsync',
        marbles(m => {
          // arrange
          user5.firstName = 'Odell';
          user5.lastName = 'Beckman Jr';
          const expectedResult = m.cold('a|', user5);

          // act
          jest
            .spyOn(appController, 'updateUserAsync')
            .mockImplementation(() => expectedResult);

          // assert
          m.expect(appController.updateUserAsync(user5)).toBeObservable(
            expectedResult,
          );
        }),
      );
      it('updateUsers', () => {
        // arrange
        user2.firstName = 'Myles';
        user2.lastName = 'Garrett';
        user3.firstName = 'Denzel';
        user3.lastName = 'Ward';
        const expectedResults = [user2, user3];

        // act
        jest
          .spyOn(appController, 'updateUsers')
          .mockImplementation(() => expectedResults);

        // assert
        expect(appController.updateUsers([user2, user3])).toBe(expectedResults);
      });
      it(
        'updateUsersAsync',
        marbles(m => {
          // arrange
          user2.firstName = 'Jarvis';
          user2.lastName = 'Landry';
          user3.firstName = 'Nick';
          user3.lastName = 'Chubb';
          const expectedResults = m.cold('a|', [user2, user3]);

          // act
          jest
            .spyOn(appController, 'updateUsersAsync')
            .mockImplementation(() => expectedResults);

          // assert
          m.expect(
            appController.updateUsersAsync([user2, user3]),
          ).toBeObservable(expectedResults);
        }),
      );
    });

    describe('GETs', () => {
      const user: User = { id: 1, firstName: 'John', lastName: 'Doe' };
      const user2: User = { id: 2, firstName: 'Jarvis', lastName: 'Landry' };
      const user3: User = { id: 3, firstName: 'Nick', lastName: 'Chubb' };
      const user4: User = { id: 4, firstName: 'Baker', lastName: 'Mayfield' };
      const user5: User = { id: 5, firstName: 'Odell', lastName: 'Beckham Jr' };

      it('getUser', () => {
        // arrange
        const expectedResult = user4;

        // act
        jest
          .spyOn(appController, 'getUser')
          .mockImplementation(() => expectedResult);

        // assert
        expect(appController.getUser(4)).toBe(expectedResult);
      });
      it(
        'getUserAsync',
        marbles(m => {
          // arrange
          const expectedResult = m.cold('a|', user4);

          // act
          jest
            .spyOn(appController, 'getUserAsync')
            .mockImplementation(() => expectedResult);

          // assert
          m.expect(appController.getUserAsync(4)).toBeObservable(
            expectedResult,
          );
        }),
      );
      it('getUsers', () => {
        // arrange
        const expectedResult = [user, user2, user3, user4, user5];

        // act
        jest
          .spyOn(appController, 'getUsers')
          .mockImplementation(() => expectedResult);

        // assert
        expect(appController.getUsers()).toBe(expectedResult);
      });
      it(
        'getUsersAsync',
        marbles(m => {
          // arrange
          const expectedResults = m.cold('a|', [
            user,
            user2,
            user3,
            user4,
            user5,
          ]);

          // act
          jest
            .spyOn(appController, 'getUsersAsync')
            .mockImplementation(() => expectedResults);

          // assert
          m.expect(appController.getUsersAsync()).toBeObservable(
            expectedResults,
          );
        }),
      );
      it('getByFirstName', () => {
        // arrange
        const expectedResults = [user];

        // act
        jest
          .spyOn(appController, 'getByFirstName')
          .mockImplementation(() => expectedResults);

        // assert
        expect(appController.getByFirstName('John')).toBe(expectedResults);
      });
      it(
        'getByFirstNameAsync',
        marbles(m => {
          // arrange
          const expectedResults = m.cold('a|', [user4]);

          // act
          jest
            .spyOn(appController, 'getByFirstNameAsync')
            .mockImplementation(() => expectedResults);

          // assert
          m.expect(appController.getByFirstNameAsync('Baker')).toBeObservable(
            expectedResults,
          );
        }),
      );
      it('getByLastName', () => {
        // arrange
        const expectedResults = [user4];

        // act
        jest
          .spyOn(appController, 'getByLastName')
          .mockImplementation(() => expectedResults);

        // assert
        expect(appController.getByLastName('Mayfield')).toBe(expectedResults);
      });
      it(
        'getByLastNameAsync',
        marbles(m => {
          // arrange
          const expectedResult = m.cold('a|', [user4]);

          // act
          jest
            .spyOn(appController, 'getByLastNameAsync')
            .mockImplementation(() => expectedResult);

          // assert
          m.expect(appController.getByLastNameAsync('Mayfield')).toBeObservable(
            expectedResult,
          );
        }),
      );
    });

    describe('DELETEs', () => {
      it('deleteUser', () => {
        // arrange
        const expectedResult = null;

        // act
        jest
          .spyOn(appController, 'deleteUser')
          .mockImplementation(() => expectedResult);

        // assert
        expect(appController.deleteUser(4)).toBe(expectedResult);
      });
      it(
        'deleteUserAsync',
        marbles(m => {
          // arrange
          const expectedResult = m.cold('a|', {});

          // act
          jest
            .spyOn(appController, 'deleteUserAsync')
            .mockImplementation(() => expectedResult);

          // assert
          m.expect(appController.deleteUserAsync(4)).toBeObservable(
            expectedResult,
          );
        }),
      );
      it('deleteUsers', () => {
        // arrange
        const expectedResult = null;

        // act
        jest
          .spyOn(appController, 'deleteUsers')
          .mockImplementation(() => expectedResult);

        // assert
        expect(appController.deleteUsers([1, 2])).toBe(expectedResult);
      });
      it(
        'dleteUsersAsync',
        marbles(m => {
          // arrange
          const expectedResult = m.cold('a|', {});

          // act
          jest
            .spyOn(appController, 'deleteUsersAsync')
            .mockImplementation(() => expectedResult);

          // assert
          m.expect(appController.deleteUsersAsync([3, 5])).toBeObservable(
            expectedResult,
          );
        }),
      );
    });
  });
});
