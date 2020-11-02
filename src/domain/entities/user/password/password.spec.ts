import { Password } from './password';

describe('Password entities tests', () => {
  it('should correct check correct password', async function() {
    const passwordString = 'hello';
    const password = await Password.of(passwordString);
    const result = await password.check(passwordString);
    expect(result).toBeTruthy();
  });
  it('should correct check incorrect password', async function() {
    const passwordString = 'hello';
    const wrongPasswordString = 'olleh';
    const password = await Password.of(passwordString);
    const result = await password.check(wrongPasswordString);
    expect(result).toBeFalsy();
  });
});
