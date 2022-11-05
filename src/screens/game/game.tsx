import { useReducer } from 'react';
import { GameScreen } from './GameScreen';
import { GameActions, GameOptions, GameState } from './model';
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
    activeProblemIndex: 9,
    activeProblem: problems[0],
    problemCount: problems.length,
  };
}

function gameReducer(state: GameState, _: GameActions): GameState {
  return state;
}
