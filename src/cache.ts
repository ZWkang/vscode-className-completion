// cache all the parse css/scss/sass file.

import * as LruCache from 'lru-cache';

const defaultOpts = {
  max: 200
};

class singletonCache {
  public cache: any;
  static instance: any;
  constructor(options: any) {
    this.cache = new LruCache(Object.assign(defaultOpts, options));
  }

  public set(key: string, value: any) {
    this.cache.set(key, value);
    return this;
  }

  public get(key: string) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    return null;
  }

  static getInstance(options?: any) {
    if (!this.instance) {
      this.instance = new singletonCache(options);
    }
    return this.instance;
  }
}

export default singletonCache;
