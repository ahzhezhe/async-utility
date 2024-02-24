# **async-utility**

[![npm package](https://img.shields.io/npm/v/async-utility)](https://www.npmjs.com/package/async-utility)
[![npm downloads](https://img.shields.io/npm/dt/async-utility)](https://www.npmjs.com/package/async-utility)
[![GitHub test](https://github.com/ahzhezhe/async-utility/workflows/test/badge.svg?branch=master)](https://github.com/ahzhezhe/async-utility)
[![GitHub issues](https://img.shields.io/github/issues/ahzhezhe/async-utility)](https://github.com/ahzhezhe/async-utility/issues)
[![GitHub license](https://img.shields.io/github/license/ahzhezhe/async-utility)](https://github.com/ahzhezhe/async-utility/blob/master/LICENSE)

Utility to convert async function to sync function, execute async function synchronously & resolve promise synchronously.

## **Install via NPM**

```
npm install async-utility
```

## **Usage**

```typescript
import { toSync, executeSync, resolveSync } from 'async-utility';

let result: number;
const asyncFn = (a: number, b: number): Promise<number> => new Promise(resolve => resolve(a + b));

// Convert async function to sync function
const syncFn = toSync(asyncFn);
result = syncFn(1, 2);

// Execute async function synchronously
result = executeSync(() => asyncFn(1, 2));

// Resolve promise synchronously
const promise = asyncFn(1, 2);
result = resolveSync(promise);
```
