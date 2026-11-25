'use strict';

const compose = (...fns) => {
  const errorHandlers = [];

  const fn = (x) => {
    try {
      return fns.reduceRight((acc, currentFn) => currentFn(acc), x);
    } catch (err) {
      for (const handler of errorHandlers) {
        handler(err);
      }
      return undefined;
    }
  };

  fn.on = (event, handler) => {
    if (event === 'error' && typeof handler === 'function') {
      errorHandlers.push(handler);
    }
  };

  return fn;
};
const addOne = (x) => x + 1;
const double = (x) => x * 2;
const brokenFn = () => {
  throw new Error('Щось пішло не так у brokenFn');
};

const okCompose = compose(addOne, double);
console.log('Успішний результат:', okCompose(5)); 
const errCompose = compose(addOne, brokenFn, double);

errCompose.on('error', (err) => {
  console.log('Спіймано в обробнику .on:', err.message);
});

const resultAfterError = errCompose(5);
console.log('Що повернула функція після помилки:', resultAfterError); 