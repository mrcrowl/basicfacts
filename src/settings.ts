import { GameOptions } from './screens/game/model';

const DEFAULT_GAME_OPTIONS: GameOptions = { max: 10, min: 1, modes: ['mult', 'div'], questions: 25, timeLimit: 'med' };

let gameOptions: GameOptions;
try {
  gameOptions = JSON.parse(localStorage['BASICFACTS:OPTIONS']);
} catch {
  gameOptions = DEFAULT_GAME_OPTIONS;
}

export const Settings = {
  set gameOptions(options: GameOptions) {
    gameOptions = options;
    localStorage['BASICFACTS:OPTIONS'] = JSON.stringify(options);
  },

  get gameOptions(): GameOptions {
    return gameOptions;
  },
};
