import React from 'react';

export type GameOptions = {
  readonly modes: GameModes[];
  readonly questions: number;
  readonly timeLimit: TimeLimits;
  readonly max: number;
  readonly min: number;
};

export type GameState = {
  readonly options: GameOptions;
  readonly activeProblemIndex: number;
  readonly problems: readonly Problem[];
  readonly problemCount: number;
  readonly answers: string[];
  readonly allowedSeconds: number;
  readonly elapsedSeconds: number;
  readonly startTimestamp: number;
};

export type Problem = {
  readonly prompt: string;
  readonly choices: string[];
  readonly correctAnswer: string;
};

export type GameModes = 'mult' | 'div' | 'both';

export type TimeLimits = 'easy' | 'med' | 'hard' | 'insane';

export type ChooseAnswerAction = {
  readonly type: 'choose_answer';
  readonly answer: string;
};

export type StartGameAction = {
  readonly type: 'start_game';
};

export type UpdateElapsedAction = {
  readonly type: 'update_elapsed';
};

export type GameActions = ChooseAnswerAction | StartGameAction | UpdateElapsedAction;

export type GameDispatch = React.Dispatch<GameActions>;
