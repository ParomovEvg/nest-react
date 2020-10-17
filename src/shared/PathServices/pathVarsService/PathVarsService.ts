import { pathParamsArray } from './pathParamsArray';

type ArrayItem<T extends readonly any[]> = T extends readonly (infer F)[]
  ? F
  : never;

export type PathParamsNames = ArrayItem<typeof pathParamsArray>;

export type PathParamsStrings = {
  [K in PathParamsNames]: string;
};
export type PathParams = PathParamsStrings;
export type PathParamsPart<T extends PathParamsNames> = Pick<PathParams, T>;

export class PathVarsService {
  static getPathParamsStringsObject(): PathParamsStrings {
    return pathParamsArray.reduce(
      (pathStrings, name) =>
        (pathStrings[name] = PathVarsService.addPathVariablePrefix(name)),
      {},
    ) as PathParamsStrings;
  }

  static mergePathValuesAndStrings(
    values: Partial<PathParams>,
    strings: PathParamsStrings,
  ) {
    return Object.entries(values).map(
      ([name, value]) => [strings[name] as string, value as string] as const,
    );
  }

  private static addPathVariablePrefix(varName: string): string {
    return `:${varName}`;
  }
}
