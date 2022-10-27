export const isArray = (data: unknown): data is Array<unknown> => Array.isArray(data);

export const isString = (data: unknown): data is string => typeof data === 'string';

export const uniq = <T>(data: T[]): T[] => [...new Set(data)];

export const has = <T>(object: T, key: string) => object[key as keyof T] !== undefined;

export const isEmpty = (value: unknown): boolean => {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'object' && Object.keys(value).length === 0) {
    return true;
  }

  if (typeof value === 'string' && value.trim().length === 0) {
    return true;
  }

  return false;
};
