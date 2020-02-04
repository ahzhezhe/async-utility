import AsyncUtils from '../src';

const asyncFn = (a: number, b: number): Promise<number> => new Promise(resolve => resolve(a + b));

test('toSync', async () => {
  const syncFn = AsyncUtils.toSync(asyncFn);
  const result = syncFn([1, 2]);
  expect(result).toBe(3);
});

test('executeSync', async () => {
  const result = AsyncUtils.executeSync(() => asyncFn(1, 2));
  expect(result).toBe(3);
});

test('resolvePromise', async () => {
  const promise = asyncFn(1, 2);
  const result = AsyncUtils.resolvePromise(promise);
  expect(result).toBe(3);
});
