import { css } from '@emotion/react';
import { padZero } from '../../util/format';

const HOURGLASS_STYLES = css`
  position: absolute;
  right: 1rem;
  top: 2vh;
  color: grey;
`;

type HourglassProps = { remainingSeconds: number };
export function Hourglass({ remainingSeconds }: HourglassProps) {
  const wholeMinutes = Math.trunc(remainingSeconds / 60);
  const leftoverSeconds = remainingSeconds - wholeMinutes * 60;

  return (
    <div css={HOURGLASS_STYLES}>
      {wholeMinutes}:{padZero(leftoverSeconds, 2)}
    </div>
  );
}
