import { CreateUserCommand } from './create-user.command';
import { CreateUserError } from './create-user.error';
import { Either } from 'useful-monads';

export abstract class CreateUserUseCase {
  abstract createUser(command: CreateUserCommand): Promise<Either<CreateUserError, void>>;
}
