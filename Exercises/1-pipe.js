'use strict';

const pipe = (...fns) => {
  for (const fn of fns) {
    if (typeof fn !== 'function') {
      throw new TypeError('All arguments passed to pipe must be functions');
    }
  }

  return (x) => fns.reduce((acc, fn) => fn(acc), x);
};
const inc = (x) => ++x;
const twice = (x) => x * 2;
const cube = (x) => x ** 3;

const f1 = pipe(inc, twice, cube);
console.log(f1(10)); 

const f2 = pipe(inc, inc);
console.log(f2(90)); 