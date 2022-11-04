import { AnswerButton } from './AnswerButton';
import { AnswerButtonContainer } from './AnswerButtonContainer';
import { Question } from './Question';

type GameScreenProps = { answers: string[] };
export function GameScreen({ answers }: GameScreenProps) {
  return (
    <>
      <Question prompt="7 × 8" />
      <AnswerButtonContainer>
        {answers.map((answer) => (
          <AnswerButton answer={answer} onClick={(answer) => alert(answer)} />
        ))}
      </AnswerButtonContainer>
    </>
  );
}
