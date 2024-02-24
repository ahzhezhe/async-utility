import { toSync, executeSync, resolveSync } from '../src';

const asyncFnWithArgs = (a: number, b: number): Promise<number> => new Promise(resolve => resolve(a + b));
const asyncFnNoArgs = (): Promise<number> => new Promise(resolve => resolve(3));
const asyncError = (): Promise<number> => new Promise((resolve, reject) => reject('test'));

describe('With args', () => {
  test('toSync', () => {
    const syncFn = toSync(asyncFnWithArgs);
    const result = syncFn(1, 2);
    expect(result).toBe(3);
  });

  test('executeSync', () => {
    const result = executeSync(() => asyncFnWithArgs(1, 2));
    expect(result).toBe(3);
  });

  test('resolveSync', () => {
    const promise = asyncFnWithArgs(1, 2);
    const result = resolveSync(promise);
    expect(result).toBe(3);
  });
});

describe('No args', () => {
  test('toSync', () => {
    const syncFn = toSync(asyncFnNoArgs);
    const result = syncFn();
    expect(result).toBe(3);
  });

  test('executeSync', () => {
    const result = executeSync(() => asyncFnNoArgs());
    expect(result).toBe(3);
  });

  test('resolveSync', () => {
    const promise = asyncFnNoArgs();
    const result = resolveSync(promise);
    expect(result).toBe(3);
  });
});

test('Error', () => {
  const syncFn = toSync(asyncError);
  expect(() => syncFn()).toThrow('test');
});
