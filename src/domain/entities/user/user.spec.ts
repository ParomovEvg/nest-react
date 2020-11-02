import { User } from './user';
import { Password } from './password/password';

describe('user test', () => {
  it('dto test', () => {
    const dto = {
      name: 'name',
      email: 'evge@mail.ru',
      passwords: [{ hashedPassword: 'hey' }],
    };
    const user = new User(dto);
    const addPasswordDto = { hashedPassword: 'hadsf' };
    user.addPassword(new Password(addPasswordDto));

    dto.passwords.push(addPasswordDto);
    expect(user.getDto()).toEqual(dto);
  });
});
