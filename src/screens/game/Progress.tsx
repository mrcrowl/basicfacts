import { css } from '@emotion/react';

export type ProgressProps = { n: number; of: number };

const CONTAINER_STYLES = css`
  width: 50vw;
  height: 0.5rem;
  position: relative;
  border: solid 1px #d0d0d0;
  border-radius: 0.5rem;
  left: 25vw;
  top: 3vh;
  overflow: hidden;
`;

const BAR_STYLES = css`
  width: 80vw;
  height: 0.5rem;
  top: 0;
  left: 0;
  height: 0.5rem;
  background: #d0d0d0;
`;

export function Progress({ n, of }: ProgressProps) {
  const percent = `${(n / of) * 100}%`;

  return (
    <div css={CONTAINER_STYLES}>
      <div css={BAR_STYLES} style={{ width: percent }}></div>
    </div>
  );
}
