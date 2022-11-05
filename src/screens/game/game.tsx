import { useEffect, useReducer } from 'react';
import { FinishedScreen } from './FinishedScreen';
import { GameScreen } from './GameScreen';
import { ChooseAnswerAction, GameActions, GameDispatch, GameOptions, GameState } from './model';
import { GameReader } from './GameReader';
import { makeProblems } from './problem';
import { useCountdownTimer } from './useCountdownTimer';
import { secsPerQuestion } from '../../util/tuning';
import { Settings } from '../../settings';

type GameProps = { options: GameOptions };
export function Game() {
  const props: GameProps = { options: Settings.gameOptions };
  const [state, dispatch] = useReducer(gameReducer, props, makeGameState);
  useStartGame(dispatch);
  useCountdownTimer(state, dispatch);

  return new GameReader(state).finished ? (
    <FinishedScreen state={state} />
  ) : (
    <GameScreen state={state} dispatch={dispatch} />
  );
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
    options,
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
