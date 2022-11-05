import { useReducer } from 'react';
import { GameScreen } from './GameScreen';
import { ChooseAnswerAction, GameActions, GameOptions, GameState } from './model';
import { makeProblems } from './problem';

type GameProps = { options: GameOptions };
export function Game(props: GameProps) {
  const [state, dispatch] = useReducer(gameReducer, props, makeGameState);

  return <GameScreen state={state} dispatch={dispatch} />;
}

function makeGameState(props: GameProps): GameState {
  const problems = makeProblems(props.options);

  return {
    problems,
    activeProblemIndex: 0,
    activeProblem: problems[0],
    problemCount: problems.length,
    answers: [],
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
