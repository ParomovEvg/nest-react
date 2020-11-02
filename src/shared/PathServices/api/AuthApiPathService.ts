import { PathService } from '../PathService/PathService';

export class AuthApiPathService extends PathService {
  constructor() {
    super('/api/auth');
  }

  apiPathCreateAccount() {
    return this.getBasePath()
  }
}

export const authApiPathService = new AuthApiPathService();
