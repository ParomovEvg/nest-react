export class CreateUserError extends Error {
  public name = 'CreateUserError';

  constructor(message) {
    super(message);
  }
}
