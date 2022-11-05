import { css, SerializedStyles } from '@emotion/react';
import { Link } from 'react-router-dom';
import { History } from 'history';

const LINK_BUTTON_STYLES = css`
  text-align: center;
  appearance: none;
  border: none;
  background: none;
  padding: 0 1rem;
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
  width: 100%;

  &:active {
    bottom: 0.9rem;
    text-decoration: none;
  }

  &:active.disabled {
    bottom: 0;
  }

  &.disabled {
    opacity: 32%;
  }
`;

type LinkButtonProps = {
  to: History.LocationDescriptor<unknown>;
  css?: SerializedStyles;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
  disabled?: boolean;
};
export function LinkButton({ to, children, onClick, disabled }: LinkButtonProps) {
  function handleClick(e: React.MouseEvent) {
    if (disabled) {
      e.preventDefault();
      return;
    }

    onClick?.(e);
  }

  return (
    <Link to={to} css={LINK_BUTTON_STYLES} onClick={handleClick} className={disabled ? 'disabled' : ''}>
      {children}
    </Link>
  );
}
