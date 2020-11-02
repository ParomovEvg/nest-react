import { NotFound } from '../../../error/NotFound';
import { User } from '../../../entities/user/user';
import { Either } from 'useful-monads';

export interface LoadUserByEmailPort {
  loadUserByEmail(userEmail: string): Promise<Either<NotFound, User>>;
}
