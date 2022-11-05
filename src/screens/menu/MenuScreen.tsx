import { css } from '@emotion/react';
import { ButtonDock } from '../../components/ButtonDock';
import { LinkButton } from '../../components/LinkButton';

export function Menu() {
  return (
    <>
      <Title />
      <ButtonDock>
        <LinkButton to="/countdown">START!</LinkButton>
      </ButtonDock>
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
