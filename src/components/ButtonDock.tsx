import { css } from '@emotion/react';

const BUTTON_DOCK_STYLES = css`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  background: none;
  font-size: 3rem;
  line-height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

type ButtonDockProps = {
  children: React.ReactNode;
};
export function ButtonDock({ children }: ButtonDockProps) {
  return <div css={BUTTON_DOCK_STYLES}>{children}</div>;
}
