import { useEffect } from 'react';
import { GameReader } from './GameReader';
import { GameDispatch, GameState } from './model';

const REFRESH_INTERVAL_MS = 100;

export function useCountdownTimer(state: GameState, dispatch: GameDispatch) {
  const reader = new GameReader(state);
  let handle: any = 0;

  useEffect(() => {
    reader.state = state;
    if (reader.finished) {
      clearInterval(handle);
      return;
    }

    function tick() {
      if (reader.elapsedChanged) {
        dispatch({ type: 'update_elapsed' });
      }
    }
    handle = setInterval(tick, REFRESH_INTERVAL_MS);

    return () => clearInterval(handle);
  }, [state.elapsedSeconds]);
}
