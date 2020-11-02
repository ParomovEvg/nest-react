import { User } from '../../../../entities/user/user';

export abstract class GetAllUsersQuery {
  abstract getUsers(): Promise<User[]>;
}
