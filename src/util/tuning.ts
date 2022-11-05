import { TimeLimits } from '../screens/game/model';

export function secsPerQuestion(limit: TimeLimits): number {
  switch (limit) {
    case 'easy':
      return 5;
    case 'med':
      return 3;
    case 'hard':
      return 2;
    case 'insane':
      return 1;
  }
}
