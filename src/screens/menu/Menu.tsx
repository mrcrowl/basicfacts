import { css } from '@emotion/react';
import { useHistory } from 'react-router-dom';
import { StartButton } from './StartButton';

export function Menu() {
  const history = useHistory();

  function goGame() {
    history.push('/game');
  }
  return (
    <>
      <Title />
      <StartButton to="" onClick={goGame}>
        START!
      </StartButton>
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
