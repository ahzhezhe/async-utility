import AsyncUtil from './src';

const asyncFnMultiArgs = (a: number, b: number): Promise<number> => new Promise(resolve => resolve(a + b));
const asyncFnOneArg = (a: number): Promise<number> => new Promise(resolve => resolve(a + 2));
const asyncFnNoArg = (): Promise<number> => new Promise(resolve => resolve(3));
const asyncError = (): Promise<number> => new Promise((resolve, reject) => reject('test'));

// ---

console.log('== Multiple args ==');

let syncFn = AsyncUtil.toSync(asyncFnMultiArgs);
let result = syncFn([1, 2]);
console.log('toSync', result === 3);

result = AsyncUtil.executeSync(() => asyncFnMultiArgs(1, 2));
console.log('executeSync', result === 3);

let promise = asyncFnMultiArgs(1, 2);
result = AsyncUtil.resolvePromise(promise);
console.log('resolvePromise', result === 3);

// ---

console.log('\n== One args ==');

syncFn = AsyncUtil.toSync(asyncFnOneArg);
result = syncFn(1);
console.log('toSync 1', result === 3);
result = syncFn([1]);
console.log('toSync 2', result === 3);

result = AsyncUtil.executeSync(() => asyncFnOneArg(1));
console.log('executeSync', result === 3);

promise = asyncFnOneArg(1);
result = AsyncUtil.resolvePromise(promise);
console.log('resolvePromise', result === 3);

// ---

console.log('\n== No args ==');

syncFn = AsyncUtil.toSync(asyncFnNoArg);
result = syncFn();
console.log('toSync 1', result === 3);
result = syncFn([]);
console.log('toSync 2', result === 3);

result = AsyncUtil.executeSync(() => asyncFnNoArg());
console.log('executeSync', result === 3);

promise = asyncFnNoArg();
result = AsyncUtil.resolvePromise(promise);
console.log('resolvePromise', result === 3);

// ---

console.log('\n== Error ==');

syncFn = AsyncUtil.toSync(asyncError);
try {
  syncFn();
  console.log('Error', false);
} catch (err) {
  console.log('Error', true);
}
