import { css } from '@emotion/react';

const BUTTON_CSS = css`
  appearance: none;
  color: #fff;
  background-color: #905387;
  text-transform: uppercase;
  font-size: 1rem;
  padding: 0;
  margin: 0;
  line-height: 2.5rem;
  font-family: 'Roboto', serif;
  display: block;
  border: none;
  border-radius: 0.3rem;
  box-shadow: 0 0 3px #00000033;
  cursor: pointer;
`;

type ButtonProps = { children: string; onClick?: React.MouseEventHandler };
export function Button({ children, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} css={BUTTON_CSS}>
      {children}
    </button>
  );
}
