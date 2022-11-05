import { css } from '@emotion/react';

const QUESTION_STYLES = css`
  font-size: 17vh;
  width: 100vw;
  height: calc(100vh - 100vw - 3rem); 
  justify-content: center;
  align-items: center;
  display: flex;
  padding-bottom: 0.8rem;
  font-weight: 100;
  position: absolute;
  top: 0;
`;

type QuestionProps = { prompt: string };
export function Question({ prompt }: QuestionProps) {
  return <div css={QUESTION_STYLES}>{prompt}</div>;
}
