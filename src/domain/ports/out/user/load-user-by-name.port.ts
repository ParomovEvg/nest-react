import { NotFound } from '../../../error/NotFound';
import { User } from '../../../entities/user/user';
import { Either } from 'useful-monads';

export interface LoadUserByNamePort {
  loadUserByName(userName: string): Promise<Either<NotFound, User>>;
}
