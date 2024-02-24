import deasync from 'deasync';

export type AsyncFn<T, A extends any[]> = (...args: A) => Promise<T>;

/**
 * Convert an aysnc function to sync function.
 */
export const toSync = <T, A extends any[]>(asyncFn: AsyncFn<T, A>): (...args: A) => T => {
  const callbackFn = (...params: any[]): void => {
    const args = params.slice(0, params.length - 1) as any;
    const callback = params[params.length - 1];

    asyncFn(...args).then(result => {
      callback(undefined, result);
    }).catch(err => {
      callback(err, undefined);
    });
  };

  return deasync(callbackFn);
};

/**
 * Execute an aysnc function synchronously.
 */
export const executeSync = <T, A extends any[]>(asyncFn: AsyncFn<T, A>, ...args: A): T => toSync(asyncFn)(...args);

/**
 * Resolve a promise synchronously.
 */
export const resolveSync = <T>(promise: Promise<T>): T => executeSync(() => promise);
