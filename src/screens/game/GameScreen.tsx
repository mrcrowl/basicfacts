import { ExitButton } from '../../components/HomeButton';
import { AnswerButton } from './AnswerButton';
import { AnswerButtonContainer } from './AnswerButtonContainer';
import { Hourglass } from './Hourglass';
import { GameDispatch, GameState } from './model';
import { Progress } from './Progress';
import { Question } from './Question';

type GameScreenProps = { state: GameState; dispatch: GameDispatch };
export function GameScreen({ state, dispatch }: GameScreenProps) {
  const activeProblem = state.problems[state.activeProblemIndex];

  return (
    <>
      <Progress n={state.activeProblemIndex + 1} of={state.problemCount} />
      <Hourglass remainingSeconds={state.allowedSeconds - state.elapsedSeconds} />
      <Question prompt={activeProblem.prompt} />
      <AnswerButtonContainer>
        {activeProblem.choices.map((answer) => {
          function handleClick() {
            dispatch({
              type: 'choose_answer',
              answer,
            });
          }

          return <AnswerButton answer={answer} onClick={handleClick} />;
        })}
      </AnswerButtonContainer>
      <ExitButton />
    </>
  );
}
