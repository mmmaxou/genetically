import {SelectionStrategy, SelectionStatistics} from './SelectionGeneric';

import {Population} from '../Population';
import {BitChain, Chromosome} from '../Chromosome';
import _, {now} from 'lodash';

/**
 * https://arxiv.org/pdf/1109.3627.pdf
 * Article about roulette wheel theory
 */
export class RouletteWheelSelection extends SelectionStrategy {
  public selection(
    pop: Population,
    statistics = new SelectionStatistics()
  ): BitChain[] {
    /**
     * Init
     */
    const fitnessMax = pop.fittest.normalizedFitnessScore;
    // const fitnessMin = pop.leastFit.normalizedFitnessScore;
    // console.log('fitness max is ', fitnessMax);
    // console.log('fitness min is ', fitnessMin);
    const selected: BitChain[] = [];
    const start = now();
    const averageIteration = pop.population.length * 3;
    const averageTime = averageIteration * 0.0005;
    let ctr = 0;

    /**
     * Loop
     */
    while (
      ctr < averageIteration * 10 &&
      selected.length < pop.config.population.popsize
    ) {
      ctr++;

      /**
       * 1.
       * Select randomly one of the individuals (say,i).
       * The selection is done with uniform probability (1/N),
       * which does not depend on the individual’s fitness
       */
      const i = Math.round(Math.random() * (pop.population.length - 1));
      const individual: Chromosome = pop.population[i];

      /**
       * 2.
       * With  probability wi/wmax,
       * where wmax = max { wi } Ni = 1 is the maximal fitness in the population,
       * the selection is accepted.
       * Otherwise, the procedure is repeated from step 1
       * (i.e., in the case of rejection, another selection attempt is made)
       */
      const rng = Math.random();
      const p = individual.normalizedFitnessScore / fitnessMax;
      const accepted = p >= rng;
      if (accepted) {
        selected.push(_.clone(individual.chain));
      }
    }

    /**
     * Return
     */
    statistics.time += now() - start;
    statistics.iterations += ctr;
    statistics.averageIteration += averageIteration;
    statistics.averageTime += averageTime;

    return selected;
  }
}
