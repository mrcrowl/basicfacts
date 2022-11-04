import { css } from '@emotion/react';

export const ANSWER_BUTTON_CONTAINER_STYLES = css`
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
export function AnswerButtonContainer({ children }: AnswerButtonContainerProps) {
  return <div css={ANSWER_BUTTON_CONTAINER_STYLES}>{children}</div>;
}
