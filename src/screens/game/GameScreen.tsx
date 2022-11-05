import { AnswerButton } from './AnswerButton';
import { AnswerButtonContainer } from './AnswerButtonContainer';
import { GameDispatch, GameState } from './model';
import { Question } from './Question';

type GameScreenProps = { state: GameState; dispatch: GameDispatch };
export function GameScreen({ state }: GameScreenProps) {
  return (
    <>
      <Question prompt={state.activeProblem.prompt} />
      <AnswerButtonContainer>
        {state.activeProblem.choices.map((answer) => (
          <AnswerButton answer={answer} onClick={(answer) => alert(answer)} />
        ))}
      </AnswerButtonContainer>
    </>
  );
}
