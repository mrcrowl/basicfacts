import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'react-router-dom';

const EXIT_BUTTON_STYLES = css`
  position: absolute;
  top: 0rem;
  left: 0rem;
  appearance: none;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  border: none;
  background: none;
  font-size: 1.5rem;
  opacity: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:active {
    background: grey;
  }
`;

type ExitButtonProps = { onClick?: React.MouseEventHandler };
export function ExitButton({ onClick }: ExitButtonProps) {
  return (
    <Link to="/">
      <div css={EXIT_BUTTON_STYLES} onClick={onClick}>
        🔙
      </div>
    </Link>
  );
}
