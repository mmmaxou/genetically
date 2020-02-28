// First you need to import The library
const Genetical = require('..');

// Create a GeneticAlgorithm Object from a test function
const gaLinear = Genetical.LinearGeneticAlgorithm();
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
