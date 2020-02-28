# Genetical

Genetic algorithm library for javascript.
Can be used in node js or in browser

## Demonstration

A [demonstration](https://mmmaxou.github.io/genetical/) is available on this address [https://mmmaxou.github.io/genetical/](https://mmmaxou.github.io/genetical/)

## Installation

- Import in the browser

```html
<script scr="script/genetica/genetical.js">
```

- Import in node.js

```javascript
import {Genetical} from 'genetical';
```

## Usage

Example in a plain node js environment

```javascript
// First you need to import The library
const Genetical = require('..');

// Create a GeneticAlgorithm Object from a test function
const gaLinear = Genetical.LinearGeneticAlgorithm();
gaLinear.run();
gaLinear.display();
```

Or create you own genetic algorithm

```javascript
/**
 * Random starting value
 */
const randomValue = () => Math.floor(Math.random() * 64) - 32;

/**
 * Transform x
 * start is [-32, 32]
 * end is   [000000, 111111]
 */
const createEncodeFunctionOfBase = Genetical.createEncodeFunctionOfBase;
const encoder6 = createEncodeFunctionOfBase(2, 6);
const encode = (x) => encoder6(x + 32);

/**
 * Transform x
 * start is [000000, 111111]
 * end is [-32, 32]
 */
const decode = (x) => parseInt(x, 2) - 32;

/**
 * Function to optimize
 * f(x) = x²
 */
const fitness = (i) => -1 * i ** 2;

// Make the genetic algorithm object
const GeneticAlgorithm = Genetical.GeneticAlgorithm;
const ga = new GeneticAlgorithm({
  ...Genetical.DEFAULT_CONFIGURATION.GENETIC_ALGORITHM,
  objective: Genetical.FitnessFunctionObjective.MINIMIZE,
  encode,
  decode,
  randomValue,
  fitness,
});

// Compute the fitness of the population and display it
ga.runPopulation();
ga.display();

// Evolve the population
ga.run();

// After the evolution is complete, display it

console.log('End evolution');
ga.display();

gaLinear.run();
gaLinear.display();
```

This complete scenario show how to create a basic Genetic Algorithm. The scenario should give you this output:

```
===== Population =====
Population size is 50
Time for running was 1694.492
Fittest chromosome is 0
Least fit chromosome is -1024
Mean fitness is -381.26
Chain of the fittest is 100000
Solution of the fittest is 0
```

Here we are trying to minimize the function x². So the answer is 0. The algorithm told us `Solution of the fittest is 0`, so it has done it's job correctly.
You can try this example yourself using

```bash
node ./examples/readmeExample.js
```

## Documentation

TODO

## Utils commands

Reload PowerShell path

```bash
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

## Start

```bash
npm run dev
```

## Test

```bash
npm run test
```

## Bundling

Bundling is done according to this [tutorial](https://marcobotto.com/blog/compiling-and-bundling-typescript-libraries-with-webpack/)
