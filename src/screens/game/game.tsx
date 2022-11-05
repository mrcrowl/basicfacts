import { useReducer } from 'react';
import { GameScreen } from './GameScreen';
import { ChooseAnswerAction, GameActions, GameOptions, GameState, TimeLimits } from './model';
import { makeProblems } from './problem';

type GameProps = { options: GameOptions };
export function Game(props: GameProps) {
  const [state, dispatch] = useReducer(gameReducer, props, makeGameState);

  return <GameScreen state={state} dispatch={dispatch} />;
}

function makeGameState({ options }: GameProps): GameState {
  const problems = makeProblems(options);

  return {
    problems,
    activeProblemIndex: 0,
    activeProblem: problems[0],
    problemCount: problems.length,
    answers: [],
    remainingSeconds: options.questions * secsPerQuestion(options.timeLimit),
  };
}

function gameReducer(state: GameState, action: GameActions): GameState {
  switch (action.type) {
    case 'choose_answer':
      return submitAnswerAndMoveToNextQuestion(state, action);

    default:
  }
  return state;
}

function submitAnswerAndMoveToNextQuestion(state: GameState, action: ChooseAnswerAction): GameState {
  state.answers[state.activeProblemIndex] = action.answer;

  const nextIndex = state.activeProblemIndex + 1;

  return {
    ...state,
    activeProblemIndex: nextIndex,
    activeProblem: state.problems[nextIndex],
  };
}

function secsPerQuestion(limit: TimeLimits): number {
  switch (limit) {
    case 'easy':
      return 5;
    case 'med':
      return 4;
    case 'hard':
      return 2.5;
    case 'insane':
      return 1;
  }
}
