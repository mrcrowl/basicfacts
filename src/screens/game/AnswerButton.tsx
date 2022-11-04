import { css } from '@emotion/react';

const ANSWER_BUTTON_STYLES = css`
  font-size: 10vh;
  width: 40vw;
  height: 40vw;
  display: flex;
  padding-bottom: 0.7rem;
  background: hotpink;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem;
  background: white;
  border: solid 0.25rem black;

  &:active {
    background: black;
    color: white;
  }
`;
type AnswerButtonProps = { answer: string; onClick?: (answer: string) => void };
export function AnswerButton({ answer, onClick }: AnswerButtonProps) {
  function handleClick() {
    onClick?.(answer);
  }

  return (
    <button onClick={handleClick} css={ANSWER_BUTTON_STYLES}>
      {answer}
    </button>
  );
}
