import { toSync, executeSync, resolveSync } from './src';

const asyncFnWithArgs = (a: number, b: number): Promise<number> => new Promise(resolve => resolve(a + b));
const asyncFnNoArgs = (): Promise<number> => new Promise(resolve => resolve(3));
const asyncError = (): Promise<number> => new Promise((resolve, reject) => reject('test'));

// ---

console.log('== With args ==');

const syncFnWithArgs = toSync(asyncFnWithArgs);
let result = syncFnWithArgs(1, 2);
console.log('toSync', result === 3);

result = executeSync(() => asyncFnWithArgs(1, 2));
console.log('executeSync', result === 3);

let promise = asyncFnWithArgs(1, 2);
result = resolveSync(promise);
console.log('resolveSync', result === 3);

// ---

console.log('\n== No args ==');

const syncFnNoArgs = toSync(asyncFnNoArgs);
result = syncFnNoArgs();
console.log('toSync 1', result === 3);

result = executeSync(() => asyncFnNoArgs());
console.log('executeSync', result === 3);

promise = asyncFnNoArgs();
result = resolveSync(promise);
console.log('resolveSync', result === 3);

// ---

console.log('\n== Error ==');

const syncError = toSync(asyncError);
try {
  syncError();
  console.log('Error', false);
} catch (err) {
  console.log('Error', true);
}
