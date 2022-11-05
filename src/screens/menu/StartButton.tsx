import { css, SerializedStyles } from '@emotion/react';
import { Link } from 'react-router-dom';
import { History } from 'history';

type LinkButtonProps = {
  to: History.LocationDescriptor<unknown>;
  css?: SerializedStyles;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
};

const START_BUTTON_STYLES = css`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  text-align: center;
  appearance: none;
  border: none;
  background: none;
  font-size: 3rem;
  line-height: 4rem;
  border: solid 0.25rem darkgreen;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: lightgreen;
  color: green;
  font-weight: bold;

  &:active {
    bottom: 0.9rem;
    text-decoration: none;
  }
`;

export function StartButton({ to, children, onClick }: LinkButtonProps) {
  return (
    <Link to={to} css={START_BUTTON_STYLES} onClick={onClick}>
      {children}
    </Link>
  );
}
