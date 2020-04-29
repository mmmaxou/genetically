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
