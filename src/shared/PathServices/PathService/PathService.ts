import { PathServiceError } from './PathServiceError';
import { PathParamsStrings, PathVarsService } from '../pathVarsService/PathVarsService';

export class PathService {
  private readonly basePath: string;
  constructor(basePath: string) {
    if (!basePath.startsWith('/'))
      throw new PathServiceError('Базовый путь должен начинаться со  /');
    if (basePath.endsWith('/'))
      throw new PathServiceError('Базовый путь не должен зачанчиваться на  /');
    this.basePath = basePath;
  }

  getBasePath() {
    return this.basePath;
  }

  withBasePath(url: string) {
    if (!url.startsWith('/'))
      throw new PathServiceError('Путь должен начинаться со /');
    return this.basePath + url;
  }

  fillUrlString<T extends Partial<PathParamsStrings>>(
    urlString: string,
    vars: T,
  ) {
    const pathObjects = PathVarsService.getPathParamsStringsObject();
    return PathVarsService.mergePathValuesAndStrings(vars, pathObjects).reduce(
      (url, [string, value]) => url.replace(string, value),
      urlString,
    );
  }
}
