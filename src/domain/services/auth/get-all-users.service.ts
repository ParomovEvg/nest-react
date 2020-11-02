import { LoadAllUsersPort } from '../../ports/out/user/load-all-users.port';
import { GetAllUsersQuery } from '../../ports/in/auth/get-all-users.query/get-all-users.query';
import { User } from '../../entities/user/user';

export class GetAllUsersService implements GetAllUsersQuery {
  constructor(private loadAllUsers: LoadAllUsersPort) {}

  getUsers(): Promise<User[]> {
    return this.loadAllUsers.loadUsers();
  }
}
