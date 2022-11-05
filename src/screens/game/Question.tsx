import { css } from '@emotion/react';

const QUESTION_STYLES = css`
  font-size: 17vh;
  width: 100vw;
  height: 80vw;
  justify-content: center;
  align-items: center;
  display: flex;
  padding-bottom: 0.8rem;
  font-weight: 100;
`;

type QuestionProps = { prompt: string };
export function Question({ prompt }: QuestionProps) {
  return <div css={QUESTION_STYLES}>{prompt}</div>;
}
