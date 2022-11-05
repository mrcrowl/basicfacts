import { useEffect, useReducer } from 'react';
import { GameScreen } from './GameScreen';
import { ChooseAnswerAction, GameActions, GameDispatch, GameOptions, GameReader, GameState, TimeLimits } from './model';
import { makeProblems } from './problem';
import { useCountdownTimer } from './useCountdownTimer';

type GameProps = { options: GameOptions };
export function Game(props: GameProps) {
  const [state, dispatch] = useReducer(gameReducer, props, makeGameState);
  useStartGame(dispatch);
  useCountdownTimer(state, dispatch);

  return <GameScreen state={state} dispatch={dispatch} />;
}

function useStartGame(dispatch: GameDispatch) {
  useEffect(() => {
    dispatch({
      type: 'start_game',
    });
  }, []);
}

function makeGameState({ options }: GameProps): GameState {
  const problems = makeProblems(options);
  const seconds = options.questions * secsPerQuestion(options.timeLimit);
  return {
    problems,
    activeProblemIndex: 0,
    problemCount: problems.length,
    answers: [],
    allowedSeconds: seconds,
    elapsedSeconds: 0,
    startTimestamp: -1,
  };
}

function gameReducer(state: GameState, action: GameActions): GameState {
  switch (action.type) {
    case 'choose_answer':
      return submitAnswerAndMoveToNextQuestion(state, action);

    case 'start_game':
      return startGame(state);

    case 'update_elapsed':
      return updateElapsed(state);

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
  };
}

function startGame(state: GameState): GameState {
  return {
    ...state,
    startTimestamp: Date.now(),
  };
}

function updateElapsed(state: GameState): GameState {
  const reader = new GameReader(state);

  return {
    ...state,
    elapsedSeconds: reader.actualElapsedSeconds,
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
