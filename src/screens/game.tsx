import { css } from '@emotion/react';

export function GameScreen() {
  return (
    <>
      <Question prompt="7 × 8" />
      <AnswerButtonContainer>
        <AnswerButton answer="ABC" />
        <AnswerButton answer="ABC" />
        <AnswerButton answer="ABC" />
        <AnswerButton answer="ABC" />
      </AnswerButtonContainer>
    </>
  );
}

const QUESTION_STYLES = css`
  font-size: 17vh;
  width: 100vw;
  height: 80vw;
  justify-content: center;
  align-items: center;
  display: flex;
  padding-bottom: 0.8rem;
`;

type QuestionProps = { prompt: string };
function Question({ prompt }: QuestionProps) {
  return <div css={QUESTION_STYLES}>{prompt}</div>;
}
const ANSWER_BUTTON_CONTAINER_STYLES = css`
  font-size: 10vh;
  width: 100%;
  justify-content: center;
  align-items: space-around;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  gap: 1rem;
  position: absolute;
  bottom: calc((100vw - 2 * 40vw) / 2);
`;
type AnswerButtonContainerProps = { children: React.ReactNode[] };
function AnswerButtonContainer({ children }: AnswerButtonContainerProps) {
  return <div css={ANSWER_BUTTON_CONTAINER_STYLES}>{children}</div>;
}

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
`;
type AnswerButtonProps = { answer: string };
function AnswerButton({ answer }: AnswerButtonProps) {
  return <div css={ANSWER_BUTTON_STYLES}>{answer}</div>;
}
