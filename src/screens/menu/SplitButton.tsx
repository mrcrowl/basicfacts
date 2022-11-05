import { css } from '@emotion/react';

const CONTAINER_STYLES = css`
  width: 100%;
  line-height: 2.7rem;
  height: 3rem;
  font-size: 1.5rem;
  display: flex;
  border: solid 0.1rem black;
  border-radius: 0.5rem;
  overflow: hidden;

  &.modes > div:nth-child(1),
  &.modes > div:nth-child(2) {
    font-size: 3rem;
    line-height: 2.5rem;
  }
`;

const BUTTON_STYLES = css`
  text-align: center;

  border-right: solid 0.1rem black;

  &:last-child {
    border-right: 0;
  }

  &.selected {
    background: black;
    color: white;
  }
`;

export type InputOption<T> = { text: string; value: T };

export type SplitButtonProps<T> = {
  modes?: true;
  options: InputOption<T>[]; //
  value: T;
  onSelect(value: T): void;
};
export function SplitButton<T>({ modes, options, value, onSelect }: SplitButtonProps<T>) {
  const percentWidth = `${100 / options.length}%`;

  return (
    <div css={CONTAINER_STYLES} className={modes ? 'modes' : ''}>
      {options.map((o) => {
        const selected = o.value === value;

        function handleSelect() {
          onSelect(o.value);
        }

        return (
          <div
            onMouseDown={handleSelect}
            onTouchStart={handleSelect}
            css={BUTTON_STYLES}
            className={`${selected ? 'selected' : ''}`}
            style={{ width: percentWidth }}
          >
            {o.text}
          </div>
        );
      })}
    </div>
  );
}
