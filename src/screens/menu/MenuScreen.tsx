import { css } from '@emotion/react';
import { StartButton } from './StartButton';

export function Menu() {
  return (
    <>
      <Title />
      <StartButton to="/countdown">START!</StartButton>
    </>
  );
}

const TITLE_STYLES = css`
  font-size: 8vh;
  text-align: center;
`;

function Title() {
  return <h1 css={TITLE_STYLES}>BASIC FACTS</h1>;
}
