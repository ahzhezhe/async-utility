# **async-utility** 

[![npm package](https://img.shields.io/npm/v/async-utility/latest.svg)](https://www.npmjs.com/package/async-utility)
[![npm downloads](https://img.shields.io/npm/dt/async-utility.svg)](https://www.npmjs.com/package/async-utility)
![GitHub test](https://github.com/ahzhezhe/async-utility/workflows/test/badge.svg?branch=master)
[![GitHub issues](https://img.shields.io/github/issues/ahzhezhe/async-utility.svg)](https://github.com/ahzhezhe/async-utility)

Utility to convert async function to sync function, execute async function synchronously & resolve promise synchronously.

## **Install via NPM**

```
npm install async-utility
```

## **Usage**

```javascript
import AsyncUtil from 'async-utility';

let result = null;
const asyncFn = (a: number, b: number): Promise<number> => 
  new Promise(resolve => resolve(a + b));

// Convert async function to sync function
const syncFn = AsyncUtil.toSync(asyncFn);
result = syncFn([1, 2]);

// Execute async function synchronously
result = AsyncUtil.executeSync(() => asyncFn(1, 2));

// Resolve promise synchronously
const promise = asyncFn(1, 2);
result = AsyncUtil.resolvePromise(promise);
```