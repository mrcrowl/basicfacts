import { css } from '@emotion/react';

export function GameScreen() {
  return (
    <>
      <Question text="7 × 8" />
    </>
  );
}

const QUESTION_STYLES = css`
  box-sizing: border-box;
  font-size: 17vh;
  width: 100vw;
  height: 100vw;
  justify-content: center;
  align-items: center;
  display: flex;
  padding-bottom: 0.8rem;
`;

type QuestionProps = { text: string };
function Question({ text }: QuestionProps) {
  return <div css={QUESTION_STYLES}>{text}</div>;
}
