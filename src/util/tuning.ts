import { TimeLimits } from '../screens/game/model';

export function secsPerQuestion(limit: TimeLimits): number {
  switch (limit) {
    case 'easy':
      return 4;
    case 'med':
      return 2.5;
    case 'hard':
      return 1.5;
    case 'insane':
      return 1;
  }
}
