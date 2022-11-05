import { useEffect } from 'react';
import { GameReader } from './GameReader';
import { GameDispatch, GameState } from './model';

const REFRESH_INTERVAL_MS = 100;

export function useCountdownTimer(state: GameState, dispatch: GameDispatch) {
  const reader = new GameReader(state);

  useEffect(() => {
    reader.state = state;
    if (reader.finished) return;

    function tick() {
      if (reader.elapsedChanged) {
        dispatch({ type: 'update_elapsed' });
      }
    }
    let handle = setInterval(tick, REFRESH_INTERVAL_MS);

    return () => clearInterval(handle);
  }, [state.elapsedSeconds]);
}
