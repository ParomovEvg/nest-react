import { instance, mock, when } from 'ts-mockito';
import { LoadAllUsersPort } from '../../../ports/out/user/load-all-users.port';
import { User } from '../../../entities/user/user';
import { GetAllUsersService } from '../get-all-users.service';

describe('Get All Users service', () => {
  const testUser1 = new User({
    name: 'test1',
    email: 'test1@mail.ru',
    passwords: [{ hashedPassword: 'asdfasdflkajsd;lkf' }],
  });

  const testUser2 = new User({
    id: 1,
    name: 'test2',
    email: 'test2@mail.ru',
    passwords: [{ hashedPassword: 'asdfa;lkf' }, { hashedPassword: 'asdfa;lkf' }],
  });

  it('should get all users', async () => {
    const loadAllUsersPort = mock<LoadAllUsersPort>();
    when(loadAllUsersPort.loadUsers()).thenReturn(Promise.resolve([testUser1, testUser2]));

    const service = new GetAllUsersService(instance(loadAllUsersPort));
    const rest = await service.getUsers();
    expect(rest).toEqual([testUser1, testUser2]);
  });
});
