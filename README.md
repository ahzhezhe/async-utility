# **async-utility** 

[![npm package](https://img.shields.io/npm/v/async-utility)](https://www.npmjs.com/package/async-utility)
[![npm downloads](https://img.shields.io/npm/dt/async-utility)](https://www.npmjs.com/package/async-utility)
[![npm dependencies](https://img.shields.io/librariesio/release/npm/async-utility)](https://www.npmjs.com/package/async-utility)
[![GitHub test](https://github.com/ahzhezhe/async-utility/workflows/test/badge.svg?branch=master)](https://github.com/ahzhezhe/async-utility)
[![GitHub issues](https://img.shields.io/github/issues/ahzhezhe/async-utility.svg)](https://github.com/ahzhezhe/async-utility)

Utility to convert async function to sync function, execute async function synchronously & resolve promise synchronously.

## **Install via NPM**

```
npm install async-utility
```

## **Usage**

```typescript
import AsyncUtil from 'async-utility';

let result = null;
const asyncFn = (a: number, b: number): Promise<number> => 
  new Promise(resolve => resolve(a + b));

// Convert async function to sync function
const syncFn = AsyncUtil.toSync(asyncFn);
result = syncFn([1, 2]);  // arguments must be put in an array

// Execute async function synchronously
result = AsyncUtil.executeSync(() => asyncFn(1, 2));

// Resolve promise synchronously
const promise = asyncFn(1, 2);
result = AsyncUtil.resolvePromise(promise);
```

For function with only one or no argument:
```typescript
const asyncOneArgFn = (a: number): Promise<void> => 
  new Promise(resolve => resolve());
const asyncNoArgFn = (): Promise<void> => 
  new Promise(resolve => resolve());

const syncOneArgFn = AsyncUtil.toSync(asyncOneArgFn);
syncOneArgFn(1);  // it's ok to not putting argument in an array

const syncNoArgFn = AsyncUtil.toSync(asyncNoArgFn);
syncNoArgFn();    // argument is not required at all
```