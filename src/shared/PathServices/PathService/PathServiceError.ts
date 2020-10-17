export class PathServiceError extends Error {
  public name = 'PathServiceError';

  constructor(message: string) {
    super(message);
  }
}
