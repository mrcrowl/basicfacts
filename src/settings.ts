import { GameOptions } from './screens/game/model';

const DEFAULT_GAME_OPTIONS: GameOptions = { max: 10, min: 1, modes: ['div'], questions: 20, timeLimit: 'med' };

let gameOptions: GameOptions = DEFAULT_GAME_OPTIONS;

export const Settings = {
  set gameOptions(options: GameOptions) {
    gameOptions = options;
  },

  get gameOptions(): GameOptions {
    return gameOptions;
  },
};
