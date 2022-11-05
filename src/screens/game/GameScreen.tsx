import { AnswerButton } from './AnswerButton';
import { AnswerButtonContainer } from './AnswerButtonContainer';
import { GameDispatch, GameState } from './model';
import { Question } from './Question';

type GameScreenProps = { state: GameState; dispatch: GameDispatch };
export function GameScreen({ state, dispatch }: GameScreenProps) {
  return (
    <>
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
    </>
  );
}
