import test from 'ava';
import {NoCrossover} from '../Crossover/NoCrossover';
import {DEFAULT_CONFIGURATION_GENETIC_ALGORITHM} from '../Helpers/Configuration';
import {CountTime} from '../Helpers/CountTime';
import {unpackVariableNames} from '../Helpers/Helpers';
import {FitnessFunctionObjective} from '../Helpers/Params';
import {NoMutation} from '../Mutation/NoMutation';
import {NoSelection} from '../Selection/NoSelection';
import {GeneticAlgorithm} from './GeneticAlgorithm';
import {Population} from './Population';

test('Create a pointless Genetic algorithm', (t) => {
  const ga = new GeneticAlgorithm<number, string>(
    (x) => '' + x,
    (x) => +x,
    () => 1,
    (x) => x
  );
  t.is(typeof ga, 'object', unpackVariableNames({ga}));
});

test('Load default configuration', (t) => {
  const stringGA = new GeneticAlgorithm<number, string>(
    () => '1',
    () => 1,
    () => 1,
    () => 1
  );
  t.is(typeof stringGA.configuration, 'object');
  const deft = DEFAULT_CONFIGURATION_GENETIC_ALGORITHM;
  const conf = stringGA.configuration;
  t.deepEqual(deft.waitBetweenIterations, conf.waitBetweenIterations);
  t.deepEqual(deft.crossover, conf.crossover);
  t.deepEqual(deft.iterations, conf.iterations);
  t.deepEqual(deft.mutation, conf.mutation);
  t.deepEqual(deft.objective, conf.objective);
  t.deepEqual(deft.population, conf.population);
  t.deepEqual(deft.selection, conf.selection);
  t.deepEqual(deft.stopCondition, conf.stopCondition);
  t.deepEqual(deft.verbose, conf.verbose);
});

test('Allow changing configuration', (t) => {
  const ga = new GeneticAlgorithm(
    (x) => '' + x,
    (x) => +x,
    () => 1,
    (x) => x
  );
  t.is(ga.configuration.verbose, DEFAULT_CONFIGURATION_GENETIC_ALGORITHM.verbose);
  ga.changeConfiguration({verbose: 'NONE'});
  t.is(ga.configuration.verbose, 'NONE');
  ga.changeConfiguration({verbose: 'INFO'});
  t.is(ga.configuration.verbose, 'INFO');
  ga.changeConfiguration({verbose: 'DEBUG'});
  t.is(ga.configuration.verbose, 'DEBUG');
});

test('Wait a few seconds after each run', (t) => {
  const ga = new GeneticAlgorithm<number, string>(
    (x) => '' + x,
    (x) => +x,
    () => ~~Math.random() * 99999,
    (x) => x,
    {
      iterations: 10,
      population: {
        popsize: 2,
      },
      mutation: new NoMutation(),
      crossover: new NoCrossover(),
      selection: new NoSelection(),
      waitBetweenIterations() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 200);
        });
      },
    }
  );
  t.plan(2);
  const timer = new CountTime();
  return ga.run().then(() => {
    const time = timer.time();
    t.assert(time > 1500, unpackVariableNames({time}));
    t.assert(time < 2300, unpackVariableNames({time}));
  });
});

test.only('Debug length', (t) => {
  const encode = (sentence: string): string => {
    return sentence;
  };

  const decode = (sentence: string): string => {
    return sentence;
  };

  const generateRandomSentence = (len: number): string => {
    // Create an array of the objective's length
    const randomSentence = Array(len)
      // Make a valid array
      .fill(undefined)
      // Create a random character for each element
      .map(() => {
        // One random number
        const n = Math.round(Math.random() * 26);

        // Convert it into a character
        const c = String.fromCharCode(n + 97);

        // Return
        return c.replace(/{/g, ' ');
      })
      // Join the array of character into a string
      .join('');
    return randomSentence;
  };

  const fitness = (sentence: string, objective: string): number => {
    return [...sentence].reduce((acc, curr, i) => {
      const objCode = objective.toLowerCase().charCodeAt(i) || 96;
      const curCode = curr.charCodeAt(0) || 96;
      const delta = Math.abs(objCode - curCode);
      return delta + acc;
    }, 0);
  };

  const objectiveSentence = 'Earth has few secrets from the birds';

  const geneticAlgorithm = new GeneticAlgorithm<string, string>(
    encode,
    decode,
    () => generateRandomSentence(objectiveSentence.length),
    (sentence) => {
      return fitness(sentence, objectiveSentence);
    },
    {
      population: {
        popsize: 5,
      },
      mutation: (chain: string) => {
        const asArr = chain.split('');
        const randomChainIndex = Math.ceil(Math.random() * chain.length - 1);
        const charCode = chain.replace(' ', '{').charCodeAt(randomChainIndex) - 97;
        const nChar = String.fromCharCode(((charCode + 1) % 26) + 97).replace('{', ' ');
        asArr[randomChainIndex] = nChar;
        // asArr[randomChainIndex] = this.objectiveSentence[randomChainIndex];
        return asArr.join('');
      },
      crossover: (chains: string[], mutation) => {
        return chains.map((chain) => {
          const asArr = chain.split('');
          const randomChainIndex = Math.ceil(Math.random() * chain.length - 1);
          const modulo = (n: number, mod: number) => ((n % mod) + mod) % mod;
          const charCode = chain.replace(' ', '{').charCodeAt(randomChainIndex) - 97;
          const nChar = String.fromCharCode(modulo(charCode - 1, 26) + 97).replace('{', ' ');
          asArr[randomChainIndex] = nChar;
          // asArr[randomChainIndex] = this.objectiveSentence[randomChainIndex];
          const nStr = asArr.join('');
          if (chain.length !== nStr.length) {
            console.log('nStr', nStr);
            console.log('chain', chain);
            throw new Error('Error in size before mutation');
          }
          const mStr = mutation.mutation(nStr);
          if (chain.length !== nStr.length) {
            throw new Error('Error in size after mutation');
          }
          return mStr;
        });
      },
      // selection: new NoSelection(),
      // crossover: new NoCrossover(),
      // mutation: new NoMutation(),
      // mutation: new FlipBitMutation(),
      // crossover: new NoCrossover(),
      objective: FitnessFunctionObjective.MINIMIZE,
      iterations: 1000,
      waitBetweenIterations: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 0);
        });
      },
      stopCondition: (pop: Population<string>) => {
        return pop.fittest.fitnessScore === 0;
      },
    }
  );

  return geneticAlgorithm.run().then(() => {
    t.is(objectiveSentence.length, geneticAlgorithm.lastPopulation.leastFit.chain.length);
    t.is(objectiveSentence.length, geneticAlgorithm.lastPopulation.fittest.chain.length);
    t.is(objectiveSentence.length, geneticAlgorithm.lastPopulation.population[1].chain.length);
  });
});
