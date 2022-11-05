import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';

const COUNTDOWN_SCREEN_STYLES = css`
  width: 100vw;
  height: 100vh;
  font-size: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10vh;
`;

export function CountdownScreen() {
  const [number, setNumber] = useState(5);
  useEffect(() => {
    const handle = setInterval(() => {
      setNumber(number - 1);
    }, 750);

    return () => clearInterval(handle);
  });

  return number === 0 ? <Navigate to="/game" replace /> : <div css={COUNTDOWN_SCREEN_STYLES}>{number}</div>;
}
