import AsyncUtil from '../src';

const asyncFnMultiArgs = (a: number, b: number): Promise<number> => new Promise(resolve => resolve(a + b));
const asyncFnOneArg = (a: number): Promise<number> => new Promise(resolve => resolve(a + 2));
const asyncFnNoArg = (): Promise<number> => new Promise(resolve => resolve(3));
const asyncError = (): Promise<number> => new Promise((resolve, reject) => reject('test'));

describe('Multiple args', () => {
  test('toSync', () => {
    const syncFn = AsyncUtil.toSync(asyncFnMultiArgs);
    const result = syncFn([1, 2]);
    expect(result).toBe(3);
  });

  test('executeSync', () => {
    const result = AsyncUtil.executeSync(() => asyncFnMultiArgs(1, 2));
    expect(result).toBe(3);
  });

  test('resolvePromise', () => {
    const promise = asyncFnMultiArgs(1, 2);
    const result = AsyncUtil.resolvePromise(promise);
    expect(result).toBe(3);
  });
});

describe('One arg', () => {
  test('toSync', () => {
    const syncFn = AsyncUtil.toSync(asyncFnOneArg);
    let result = syncFn(1);
    expect(result).toBe(3);
    result = syncFn([1]);
    expect(result).toBe(3);
  });

  test('executeSync', () => {
    const result = AsyncUtil.executeSync(() => asyncFnOneArg(1));
    expect(result).toBe(3);
  });

  test('resolvePromise', () => {
    const promise = asyncFnOneArg(1);
    const result = AsyncUtil.resolvePromise(promise);
    expect(result).toBe(3);
  });
});

describe('No arg', () => {
  test('toSync', () => {
    const syncFn = AsyncUtil.toSync(asyncFnNoArg);
    let result = syncFn();
    expect(result).toBe(3);
    result = syncFn([]);
    expect(result).toBe(3);
  });

  test('executeSync', () => {
    const result = AsyncUtil.executeSync(() => asyncFnNoArg());
    expect(result).toBe(3);
  });

  test('resolvePromise', () => {
    const promise = asyncFnNoArg();
    const result = AsyncUtil.resolvePromise(promise);
    expect(result).toBe(3);
  });
});

test('Error', () => {
  const syncFn = AsyncUtil.toSync(asyncError);
  expect(() => syncFn()).toThrow('test');
});
