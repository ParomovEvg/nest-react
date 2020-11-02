export class NotFound extends Error {
  public name = 'NotFound';
  constructor(message) {
    super(message);
  }
}
