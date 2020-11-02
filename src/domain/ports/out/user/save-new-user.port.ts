import { User } from '../../../entities/user/user';

export interface SaveNewUserPort {
  saveNewUser(user: User): Promise<void>;
}
