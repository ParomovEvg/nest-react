import { CreateUserService } from '../create-user.service';
import { LoadUserByEmailPort } from '../../../ports/out/user/load-user-by-email.port';
import { LoadUserByNamePort } from '../../../ports/out/user/load-user-by-name.port';
import { SaveNewUserPort } from '../../../ports/out/user/save-new-user.port';
import { mock, when, anyString, anything, instance } from 'ts-mockito';
import { User } from '../../../entities/user/user';
import { left, right } from 'useful-monads/Either';
import { NotFoundException } from '@nestjs/common';
import { CreateUserCommand } from '../../../ports/in/auth/create-user.use-case/create-user.command';

describe('create user service test', () => {
  const testUserName = 'test';
  const testEmail = 'test@mail.ru';
  const testUser = User.of(testUserName, testEmail);
  const eitherTestUser = Promise.resolve(right<NotFoundException, User>(testUser));
  const notFoundEither = Promise.resolve(left<NotFoundException, User>(new NotFoundException()));

  const createService = () => {
    const loadUserByEmail = mock<LoadUserByEmailPort>();
    when(loadUserByEmail.loadUserByEmail(anyString())).thenReturn(notFoundEither);
    when(loadUserByEmail.loadUserByEmail(testEmail)).thenReturn(eitherTestUser);

    const loadUserByName = mock<LoadUserByNamePort>();
    when(loadUserByName.loadUserByName(anyString())).thenReturn(notFoundEither);
    when(loadUserByName.loadUserByName(testUserName)).thenReturn(eitherTestUser);

    const saveNewUser = mock<SaveNewUserPort>();
    when(saveNewUser.saveNewUser(anything())).thenReturn(Promise.resolve());

    return new CreateUserService(
      instance(loadUserByEmail),
      instance(loadUserByName),
      instance(saveNewUser),
    );
  };

  it('create user if all right', async () => {
    const service = createService();
    const createUserCommand = new CreateUserCommand();
    createUserCommand.name = 'user';
    createUserCommand.email = 'user@mail.ru';
    createUserCommand.password = '1234';
    const res = await service.createUser(createUserCommand);
    expect(res.isRight()).toBeTruthy();
  });

  it('should return error if email already exists', async () => {
    const service = createService();
    const createUserCommand = new CreateUserCommand();
    createUserCommand.name = testUserName;
    createUserCommand.email = 'user@mail.ru';
    createUserCommand.password = '1234';
    const res = await service.createUser(createUserCommand);
    expect(res.isRight()).toBeFalsy();
  });
  it('should return error if userName already exists', async () => {
    const service = createService();
    const createUserCommand = new CreateUserCommand();
    createUserCommand.name = 'user';
    createUserCommand.email = testEmail;
    createUserCommand.password = '1234';
    const res = await service.createUser(createUserCommand);
    expect(res.isRight()).toBeFalsy();
  });
});
