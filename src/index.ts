import deasync from 'deasync';

class AsyncUtil {

  /**
   * Convert an aysnc function to sync function.
   */
  static toSync<T>(asyncFn: (...args: any[]) => Promise<T>): (args?: any) => T {
    const callbackFn = (args: any, callback: (err?: any, result?: T) => void): void => {
      if (callback == null) {
        callback = args;
        args = [];
      } else if (!Array.isArray(args)) {
        args = [args];
      }

      asyncFn(...args).then(result => {
        callback(undefined, result);
      }).catch(err => {
        callback(err, undefined);
      });
    };

    return deasync(callbackFn) as any;
  }

  /**
   * Execute an aysnc function synchronously without the need of await.
   */
  static executeSync<T>(asyncFn: (...args: any[]) => Promise<T>, ...args: any[]): T {
    return this.toSync(asyncFn)(args);
  }

  /**
   * Resolve a promise and return its result.
   */
  static resolvePromise<T>(promise: Promise<T>): T {
    return this.executeSync(() => promise);
  }

  /**
   * Construct a promise.
   */
  static constructPromise<T>(asyncFn: (...args: any[]) => Promise<T>, ...args: any[]): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      try {
        resolve(await asyncFn(...args));
      } catch (err) {
        reject(err);
      }
    });
  }

}

export = AsyncUtil;
