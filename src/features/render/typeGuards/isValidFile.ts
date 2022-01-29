import { isObject } from "./isObject";

export type APIFile = {
  [key: string]: unknown;
  paths: {
    [key: string]: {
      [key: string]: {
        [key: string]: unknown;
        operationId: string;
      };
    };
  };
};

export const isValidFile = (obj?: Record<string, unknown>): obj is APIFile => {
  let valid = false;
  if (
    obj !== undefined &&
    isObject(obj) &&
    obj.paths !== undefined &&
    isObject(obj.paths)
  ) {
    const paths = Object.keys(obj.paths);
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      if (isObject(obj.paths) && isObject(obj.paths[path])) {
        obj.paths[path];
        const methods = Object.keys(obj.paths[path] as Record<string, unknown>);
        for (let j = 0; j < methods.length; j++) {
          const method = methods[j];
          if (method !== undefined && isObject(method)) {
            if (!valid) {
              valid = true;
            } else {
              continue;
            }
          }
        }
      }
    }
  }
  return valid;
};
