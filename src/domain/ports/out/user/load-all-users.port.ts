import { User } from '../../../entities/user/user';

export interface LoadAllUsersPort {
  loadUsers(): Promise<User[]>;
}
