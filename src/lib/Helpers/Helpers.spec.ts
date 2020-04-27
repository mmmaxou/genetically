import test from 'ava';
import {createEncodeFunctionOfBase} from './Helpers';

test('createEncodeFunctionOfBase should return a function', (t) => {
  t.is(typeof createEncodeFunctionOfBase(2, 8), 'function');
});

test('createEncodeFunctionOfBase should throw with a chain length less than 2', (t) => {
  t.notThrows(() => createEncodeFunctionOfBase(8, 8));
  t.throws(() => createEncodeFunctionOfBase(8, 0));
});

test('createEncodeFunctionOfBase should throw with a base less than 2', (t) => {
  t.throws(() => createEncodeFunctionOfBase(-515, 8));
  t.throws(() => createEncodeFunctionOfBase(Number.MIN_SAFE_INTEGER, 8));
});

test('createEncodeFunctionOfBase should throw with a base more than 16', (t) => {
  t.throws(() => createEncodeFunctionOfBase(515, 8));
  t.throws(() => createEncodeFunctionOfBase(Number.MAX_SAFE_INTEGER, 8));
});
