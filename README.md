[![Build Status](https://travis-ci.org/mmmaxou/genetically.svg?branch=master)](https://travis-ci.org/mmmaxou/genetically)
[![codecov](https://codecov.io/gh/mmmaxou/genetically/branch/master/graph/badge.svg)](https://codecov.io/gh/mmmaxou/genetically)
![npm bundle size](https://img.shields.io/bundlephobia/min/genetically)
![GitHub issues](https://img.shields.io/github/issues/mmmaxou/genetically)
![GitHub last commit](https://img.shields.io/github/last-commit/mmmaxou/genetically)
![GitHub package.json version](https://img.shields.io/github/package-json/v/mmmaxou/genetically)

# Genetically

A Genetic Algorithm library designed for typescript

Live example and informations about genetically can be founds in the [demonstration](https://mmmaxou.github.io/genetically-demonstration-browser/)

## Install

Using npm :

```bash
$ npm install -S genetically
```

## Examples

Take a look at the examples on [simple functions made for optimization problems](https://en.wikipedia.org/wiki/Test_functions_for_optimization):

- [Linear function](https://github.com/mmmaxou/genetically/blob/master/src/example/LinearFunction.ts) `f(x) = -x²`
- [Cube function](https://github.com/mmmaxou/genetically/blob/master/src/example/CubeFunction.ts) `f(x) = x³`
- [Booth function](https://github.com/mmmaxou/genetically/blob/master/src/example/BoothFunction.ts) `f(x, y) = (x + 2y - 7) ** 2 + (2x + y - 5) ** 2`
- [Baele function](https://github.com/mmmaxou/genetically/blob/master/src/example/BealeFunction.ts) `f(x, y) = (1.5 - x - x*y) ** 2 + (2.25 - x + (x*y) ** 2) ** 2 + (2.625 - x + (x*y) ** 3) ** 2`

## Usage

Simple use case

```ts
import {GeneticAlgorithm} from 'genetically';

const genetic = new GeneticAlgorithm<number, string>(
  encodeFunction,
  decodeFunction,
  randomValueFunction,
  fitnessFunction,
  configurationObject
);

genetic.run();
```

More complex usage with the LinearGeneticAlgorithm example.

```ts
import {
  createEncodeFunctionOfBase,
  FitnessFunctionObjective,
  GeneticAlgorithm,
  LinearGeneticAlgorithm,
} from './genetically';

// Create a GeneticAlgorithm Object from a test function
const gaLinear = LinearGeneticAlgorithm();
gaLinear.run();
gaLinear.display();

// Or create you own genetic algorithm

/**
 * Random starting value
 */
const randomValue = () => Math.floor(Math.random() * 64) - 32;

/**
 * Transform x
 * start is [-32, 32]
 * end is   [000000, 111111]
 */
const encoder6 = createEncodeFunctionOfBase(2, 6);
const encode = (x: number) => encoder6(x + 32);

/**
 * Transform x
 * start is [000000, 111111]
 * end is [-32, 32]
 */
const decode = (x: string) => parseInt(x, 2) - 32;

/**
 * Function to optimize
 * f(x) = x²
 */
const fitness = (i: number) => -1 * i ** 2;

// Make the genetic algorithm object
const ga = new GeneticAlgorithm<number, string>(
  encode,
  decode,
  randomValue,
  fitness,
  {
    objective: FitnessFunctionObjective.MINIMIZE,
  }
);

// Compute the fitness of the population and display it
ga.runPopulation();
ga.display();

// Evolve the population
ga.run();

// After the evolution is complete, display it

console.log('End evolution');
ga.display();
```

## Documentation

Please take a look at the [documentation](https://mmmaxou.github.io/genetically/) for references on how to use the library.
