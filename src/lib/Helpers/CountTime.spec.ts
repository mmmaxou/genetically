import test from 'ava';
import {CountTime} from './CountTime';

test('Should count time', (t) => {
  const func = () => 95 * 78;
  const time = new CountTime();
  Array(10)
    .fill(undefined)
    .map(func);
  const end = time.time();
  t.true(typeof end === 'number');
  t.true(end > 0);
});

test('Precision with more than 1s', (t) => {
  t.plan(2);
  const time = new CountTime();
  return new Promise((resolve) => {
    setTimeout(() => {
      const end = time.time();
      t.assert(end > 330);
      t.assert(end < 400);
      resolve();
    }, 340);
  });
});
