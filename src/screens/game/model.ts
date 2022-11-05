import React from 'react';

export type GameOptions = {
  readonly mode: GameModes;
  readonly questions: number;
  readonly timeLimit: TimeLimits;
  readonly max: number;
  readonly min: number;
};

export type GameState = {
  readonly activeProblemIndex: number;
  readonly activeProblem: Problem;
  readonly problems: readonly Problem[];
  readonly problemCount: number;
};

export type Problem = {
  readonly prompt: string;
  readonly choices: string[];
  readonly answer: string;
};

export type GameModes = 'mult' | 'div' | 'both';

export type TimeLimits = 'easy' | 'med' | 'hard' | 'insane';

export type ChooseAnswerAction = {
  readonly type: 'choose_answer';
  readonly answer: string;
};

export type GameActions = ChooseAnswerAction;

export type GameDispatch = React.Dispatch<GameActions>;
