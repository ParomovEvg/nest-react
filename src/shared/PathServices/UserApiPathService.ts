import { PathService } from './PathService/PathService';
import { PathParamsPart, PathVarsService } from './pathVarsService/PathVarsService';

export class UserApiPathService extends PathService {
  constructor() {
    super('/api/user');
  }

  getUser() {
    const { userId } = PathVarsService.getPathParamsStringsObject();
    return this.withBasePath(`/${userId}`);
  }

  pathGetUser(params: PathParamsPart<'userId'>) {
    return this.fillUrlString(this.getUser(), params);
  }
}

export const userApiPathService = new UserApiPathService()
