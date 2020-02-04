# **asyncutils** 

[![npm package](https://img.shields.io/npm/v/asyncutils/latest.svg)](https://www.npmjs.com/package/asyncutils)
[![npm downloads](https://img.shields.io/npm/dt/asyncutils.svg)](https://www.npmjs.com/package/asyncutils)
![GitHub test](https://github.com/ahzhezhe/asyncutils/workflows/test/badge.svg?branch=master)
[![GitHub issues](https://img.shields.io/github/issues/ahzhezhe/asyncutils.svg)](https://github.com/ahzhezhe/asyncutils)

Utility to convert async function to sync function, execute async function synchronously & resolve promise synchronously.

## **Install via NPM**

```
npm install asyncutils
```

## **Usage**

```javascript
import AsyncUtils from 'asyncutils';

let result = null;
const asyncFn = (a: number, b: number): Promise<number> => 
  new Promise(resolve => resolve(a + b));

// Convert async function to sync function
const syncFn = AsyncUtils.toSync(asyncFn);
result = syncFn([1, 2]);

// Execute async function synchronously
result = AsyncUtils.executeSync(() => asyncFn(1, 2));

// Resolve promise synchronously
const promise = asyncFn(1, 2);
result = AsyncUtils.resolvePromise(promise);
```