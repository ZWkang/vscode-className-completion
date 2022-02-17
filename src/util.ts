import * as fs from 'fs';
import * as util from 'util';

import singletonCache from './cache';
import { triggerSuggestLineText } from './constants';

export const readFile = util.promisify(fs.readFile);
export const exists = util.promisify(fs.exists);

export function removeDuplicationList<T extends string>(arr: T[]): T[] {
  if (Array.isArray(arr)) {
    return [...new Set(arr)];
  }
  return [];
}

export function flat<T extends any[]>(arr: T) {
  return arr.reduce((prev: T[], next: T) => {
    if (Array.isArray(next)) {
      return [...prev, ...next];
    }
    return [...prev, next];
  }, []);
}

export function testIsMatch(input: string) {
  return triggerSuggestLineText.test(input);
}

export function setStyleFileCache(filename: string, fileContent: any) {
  return singletonCache.getInstance().set(filename, fileContent);
}

export function getStyleFileCache(filename: string) {
  return singletonCache.getInstance().get(filename);
}
