import { ExitButton } from '../../components/ExitButton';
import { AnswerButton } from './AnswerButton';
import { AnswerButtonContainer } from './AnswerButtonContainer';
import { Hourglass } from './Hourglass';
import { GameDispatch, GameState } from './model';
import { Progress } from './Progress';
import { Question } from './Question';

type GameScreenProps = { state: GameState; dispatch: GameDispatch };
export function GameScreen({ state, dispatch }: GameScreenProps) {
  return (
    <>
      <Progress n={state.activeProblemIndex + 1} of={state.problemCount} />
      <Hourglass remainingSeconds={state.remainingSeconds} />
      <Question prompt={state.activeProblem.prompt} />
      <AnswerButtonContainer>
        {state.activeProblem.choices.map((answer) => {
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
