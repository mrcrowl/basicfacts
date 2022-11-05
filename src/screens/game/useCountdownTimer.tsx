import { useEffect } from 'react';
import { GameDispatch, GameReader, GameState } from './model';

export function useCountdownTimer(state: GameState, dispatch: GameDispatch) {
  const reader = new GameReader(state);

  useEffect(() => {
    const handle = setInterval(() => {
      reader.state = state;
      if (reader.elapsedChanged) {
        dispatch({ type: 'update_elapsed' });
      }
    }, 100);

    return () => clearInterval(handle);
  });
}
