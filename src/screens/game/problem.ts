import shuffle from 'z-shuffle';
import { GameOptions, Problem } from './model';

const NUM_CHOICES = 4;

export function makeProblems(options: GameOptions): readonly Problem[] {
  const problems: Problem[] = [];
  let lastProblem: Problem | undefined;
  while (problems.length < options.questions) {
    const problem = makeProblem(options);
    if (problem.prompt === lastProblem?.prompt) continue;

    problems.push(problem);
  }
  return problems;
}

function makeProblem(options: GameOptions): Problem {
  switch (options.mode) {
    case 'div':
      return makeDivisionProblem(options);
    // case 'mult':
    //   return makeMultiplicationProblem(options);
    // case 'both': {
    //   return Math.random() < 0.5 ? makeDivisionProblem(options) : makeMultiplicationProblem(options);
    // }
    default:
      throw new Error(`mode NYI: ${options.mode}`);
  }
}

function makeDivisionProblem(options: GameOptions): Problem {
  const answerDivisor = randomBetween(options.min, options.max);
  const otherDivisor = randomBetween(options.min, options.max);
  const answer = `${answerDivisor}`;
  const product = answerDivisor * otherDivisor;
  const prompt = `${product} ÷ ${otherDivisor}`;
  const choices = makeDivisonChoices(answerDivisor, options);

  return {
    correctAnswer: answer,
    choices,
    prompt,
  };
}

function makeDivisonChoices(answer: number, options: GameOptions): string[] {
  const { min, max } = options;
  if (answer === min) {
    const choices = [min + 1, min + 2];
    return makeChoices(choices, answer, options);
  }

  if (answer === max) {
    const choices = [max - 1, max - 2];
    return makeChoices(choices, answer, options);
  }

  const above = answer + 1;
  const below = answer - 1;
  const choices = [above, below];
  return makeChoices(choices, answer, options);
}

/** Fills out up to NUM_CHOICES choices as shuffled, strings. */
function makeChoices(predefinedChoices: number[], answer: number, options: GameOptions): string[] {
  const choiceSet = new Set([...predefinedChoices, answer]);
  while (choiceSet.size < NUM_CHOICES) {
    const random = randomBetween(options.min, options.max);
    choiceSet.add(random);
  }

  const stringChoices = Array.from(choiceSet).map((choice) => `${choice}`);
  const shuffledStringChoices = shuffle(stringChoices);
  return shuffledStringChoices;
}

// function makeMultiplicationProblem(options: GameOptions): Problem {
//   return {
//     answer,
//     choices,
//     prompt,
//   };
// }

function randomBetween(min: number, max: number): number {
  const range = max - min;
  return Math.trunc(Math.random() * range) + min;
}
