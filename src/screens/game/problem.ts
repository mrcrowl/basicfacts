import shuffle from 'z-shuffle';
import { GameModes, GameOptions, Problem } from './model';

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
  const mode = options.modes[Math.trunc(Math.random() * options.modes.length)];
  switch (mode) {
    case 'div':
      return makeDivisionProblem(options);
    case 'mult':
      return makeMultiplicationProblem(options);
    case 'add':
      return makeAdditionProblem(options);
    case 'sub':
      return makeSubtractionProblem(options);
    default:
      throw new Error(`mode NYI: ${options.modes[0]}`);
  }
}

function makeAdditionProblem(options: GameOptions): Problem {
  const addend1 = randomBetween(options.min, options.max);
  const addend2 = randomBetween(options.min, options.max);
  const sum = addend1 + addend2;
  const answer = `${sum}`;
  const prompt = `${addend1} + ${addend2}`;

  let choices: number[];
  if (addend1 == 1 || addend2 == 1) {
    choices = [
      addend2 * (addend1 + 1), //
      addend1 * (addend2 + 1),
    ];
  }

  const above1 = addend1 + 1;
  const below1 = addend1 - 1;
  const above2 = addend2 + 1;
  const below2 = addend2 - 1;
  choices = [addend1 + above1, addend2 + below1, above2 + below2];

  return {
    correctAnswer: answer,
    choices: finaliseChoices(choices, sum, options, 'add'),
    prompt,
  };
}

function makeSubtractionProblem(options: GameOptions): Problem {
  const addend1 = randomBetween(options.min, options.max);
  const addend2 = randomBetween(options.min, options.max);
  const sum = addend1 + addend2;
  const answer = `${addend1}`;
  const prompt = `${sum} - ${addend2}`;

  let choices: number[];
  if (addend1 == 1) {
    choices = [
      addend1 + 1, //
      addend1 + 2,
    ];
  }

  choices = [addend1 - 1, addend1 + 1];

  return {
    correctAnswer: answer,
    choices: finaliseChoices(choices, addend1, options, 'sub'),
    prompt,
  };
}

function makeMultiplicationProblem(options: GameOptions): Problem {
  const mult1 = randomBetween(options.min, options.max);
  const mult2 = randomBetween(options.min, options.max);
  const product = mult1 * mult2;
  const answer = `${product}`;
  const prompt = `${mult1} ?? ${mult2}`;
  const choices = makeMultiplicationChoices(product, mult1, mult2, options);

  return {
    correctAnswer: answer,
    choices,
    prompt,
  };
}

function makeMultiplicationChoices(product: number, mult1: number, mult2: number, options: GameOptions): string[] {
  if (mult1 == 1 || mult2 == 1) {
    return finaliseMultiplicationChoices([mult2 * (mult1 + 1), mult1 * (mult2 + 1)], product, options);
  }

  const above1 = mult1 + 1;
  const below1 = mult1 - 1;
  const above2 = mult2 + 1;
  const below2 = mult2 - 1;
  const choices = [mult1 * above1, mult2 * below1, above2 * below2];
  return finaliseMultiplicationChoices(choices, product, options);
}

/** Fills out up to NUM_CHOICES choices as shuffled, strings. */
function finaliseMultiplicationChoices(predefinedChoices: number[], answer: number, options: GameOptions): string[] {
  const choiceSet = new Set([...predefinedChoices, answer]);
  while (choiceSet.size < NUM_CHOICES) {
    const random1 = randomBetween(options.min, options.max);
    const random2 = randomBetween(options.min, options.max);
    choiceSet.add(random1 * random2);
  }

  const stringChoices = Array.from(choiceSet).map((choice) => `${choice}`);
  const shuffledStringChoices = shuffle(stringChoices);
  return shuffledStringChoices;
}

function makeDivisionProblem(options: GameOptions): Problem {
  const answerDivisor = randomBetween(options.min, options.max);
  const otherDivisor = randomBetween(options.min, options.max);
  const answer = `${answerDivisor}`;
  const product = answerDivisor * otherDivisor;
  const prompt = `${product} ?? ${otherDivisor}`;
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
    return finaliseDivisionChoices(choices, answer, options);
  }

  if (answer === max) {
    const choices = [max - 1, max - 2];
    return finaliseDivisionChoices(choices, answer, options);
  }

  const above = answer + 1;
  const below = answer - 1;
  const choices = [above, below];
  return finaliseDivisionChoices(choices, answer, options);
}

/** Fills out up to NUM_CHOICES choices as shuffled, strings. */
function finaliseDivisionChoices(predefinedChoices: number[], answer: number, options: GameOptions): string[] {
  const choiceSet = new Set([...predefinedChoices, answer]);
  while (choiceSet.size < NUM_CHOICES) {
    const random = randomBetween(options.min, options.max);
    choiceSet.add(random);
  }

  const stringChoices = Array.from(choiceSet).map((choice) => `${choice}`);
  const shuffledStringChoices = shuffle(stringChoices);
  return shuffledStringChoices;
}

/** Fills out up to NUM_CHOICES choices as shuffled, strings. */
function finaliseChoices(predefinedChoices: number[], answer: number, options: GameOptions, mode: GameModes): string[] {
  const choiceSet = new Set([...predefinedChoices, answer]);
  while (choiceSet.size < NUM_CHOICES) {
    const random1 = randomBetween(options.min, options.max);
    const random2 = randomBetween(options.min, options.max);
    switch (mode) {
      case 'add':
        choiceSet.add(random1 + random2);
        break;
      case 'sub':
        choiceSet.add(random1);
        break;
      case 'mult':
        choiceSet.add(random1 * random2);
        break;
      case 'div':
        choiceSet.add(random1);
        break;
    }
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
  const range = max - min + 1;
  return Math.trunc(Math.random() * range) + min;
}
