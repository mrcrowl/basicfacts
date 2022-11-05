import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { StartButton } from './StartButton';

export function Menu() {
  const navigate = useNavigate();

  function goGame() {
    navigate('/game');
  }

  return (
    <>
      <Title />
      <StartButton to="/game" onClick={goGame}>
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
