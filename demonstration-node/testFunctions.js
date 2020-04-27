const Genetical = require('..');

const linearGenetic = () => {
  console.log(' __ Start __');
  const ga = Genetical.LinearGeneticAlgorithm();

  console.log('ga is ', ga);
  console.log('Changing configuration');
  ga.changeConfiguration({
    population: {
      popsize: 100,
    },
    afterEach(pop) {
      pop.display();
    },
    stopCondition(pop) {
      return pop.fittest.fitnessScore === 0;
    },
  });
  ga.refreshPopulation();

  console.log('\nBefore running');
  ga.runPopulation();
  ga.display();

  console.log('Let us evolve');
  ga.run();

  console.log('End evolution');
  ga.display();

  console.log(' __ End __');
};

/*
const cubeGenetic = () => {
  console.log(' __ Start __');
  const ga = CubeGeneticAlgorithm();
  const stop = 31 ** 3;
  ga.changeConfiguration({
    population: {
      popsize: 200,
    },
    afterEach(pop) {
      pop.display();
    },
    stopCondition(pop) {
      return pop.fittest.fitnessScore >= stop - 1;
    },
  });
  ga.refreshPopulation();

  console.log('Before running');
  ga.runPopulation();
  ga.display();

  console.log('Let us evolve');
  ga.run();

  console.log('End evolution');
  console.log(' __ End __');
};
const baeleGenetic = () => {
  console.log(' __ Start __');
  const ga = BealeGeneticAlgorithm();
  ga.changeConfiguration({
    iterations: 100,
    population: {
      popsize: 100,
    },
    afterEach(pop, i) {
      if (i % 10 === 0) {
        console.log('Generation is', i);
        pop.display();
      }
    },
    stopCondition(pop) {
      return pop.fittest.fitnessScore >= -0.01;
    },
  });
  ga.refreshPopulation();

  console.log('Before running');
  ga.runPopulation();
  ga.display();

  console.log('Let us evolve');
  ga.run();

  console.log(' __ End __');
};
const boothGenetic = () => {
  console.log(' __ Start __');
  const ga = BoothGeneticAlgorithm();
  ga.changeConfiguration({
    iterations: 200,
    population: {
      popsize: 200,
    },
    afterEach(pop, i) {
      if (i % 10 === 0) {
        console.log('Generation is', i);
        pop.display();
      }
    },
    stopCondition(pop) {
      return pop.fittest.fitnessScore >= -0.1;
    },
  });
  ga.refreshPopulation();

  console.log('Before running');
  ga.runPopulation();
  ga.display();

  console.log('Let us evolve');
  ga.run();
  ga.display();

  console.log(' __ End __');
};
*/
const start = () => {
  // linearGenetic();
  // cubeGenetic();
  console.log(linearGenetic);
  //   console.log(cubeGenetic);
  //   console.log(baeleGenetic);
  //   console.log(boothGenetic);
  linearGenetic();
};
// console.log(start);
console.log(Genetical);
start();
