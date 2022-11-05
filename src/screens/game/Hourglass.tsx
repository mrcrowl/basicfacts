import { css } from '@emotion/react';
import { padZero, secondsToWholeMinsAndLeftoverSecs } from '../../util/format';

const HOURGLASS_STYLES = css`
  position: absolute;
  right: 1rem;
  top: 2vh;
  color: grey;

  &.close {
    color: red;
    font-weight: bold;
  }
`;

type HourglassProps = { remainingSeconds: number };
export function Hourglass({ remainingSeconds }: HourglassProps) {
  const { wholeMinutes, leftoverSeconds } = secondsToWholeMinsAndLeftoverSecs(remainingSeconds);

  const isClose = wholeMinutes === 0 && leftoverSeconds < 10;
  const className = isClose ? 'close' : '';

  return (
    <div css={HOURGLASS_STYLES} className={className}>
      {wholeMinutes}:{padZero(leftoverSeconds, 2)}
    </div>
  );
}
