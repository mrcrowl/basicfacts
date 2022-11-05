import { css } from '@emotion/react';
import React from 'react';
import { Link } from 'react-router-dom';

const EXIT_BUTTON_STYLES = css`
  position: absolute;
  top: 0.1rem;
  left: 0.1rem;
  appearance: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  border: none;
  background: none;
  font-size: 1.5rem;
  color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 0.1rem;

  .symbol {
    transform: scaleX(0.68);
    color: grey;
  }

  &:active {
    opacity: 1;
    background: black;
    color: white;
  }
`;

type ExitButtonProps = { onClick?: React.MouseEventHandler };
export function ExitButton({ onClick }: ExitButtonProps) {
  return (
    <Link to="/">
      <div css={EXIT_BUTTON_STYLES} onClick={onClick}>
        <div className="symbol">{'\u1438'}</div>
      </div>
    </Link>
  );
}
