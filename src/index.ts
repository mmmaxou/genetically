import { randomValue, encode, decode } from './example/LinearFunction';
// import { inspect } from 'util';

console.log(' __ Start __');

const startingValue = randomValue();
console.log('Random starting value is ' + startingValue);

const encoded = encode(startingValue);
console.log('Encoded value is ' + encoded);

const decoded = decode(encoded);
console.log('Decoded value is ' + decoded);

console.log(' __ End __');
