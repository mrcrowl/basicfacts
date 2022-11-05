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

  &.modes > div {
    font-size: 3rem;
    line-height: 2.5rem;
  }

  &.modes > div.selected {
    border-right-color: white;
  }

  &.error {
    border-color: red;
  }

  &.error > div {
    border-right-color: red;
    color: red;
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
  value: T | T[];
  validationError?: boolean;
  onSelect?(value: T): void;
  onDeselect?(value: T): void;
};
export function SplitButton<T>({ modes, options, value, onSelect, onDeselect, validationError }: SplitButtonProps<T>) {
  const percentWidth = `${100 / options.length}%`;

  return (
    <div css={CONTAINER_STYLES} className={`${modes ? 'modes' : ''} ${validationError ? 'error' : ''}`}>
      {options.map((opt, i) => {
        const selected = Array.isArray(value) ? value.includes(opt.value) : opt.value === value;

        function handleSelect() {
          if (Array.isArray(value)) {
            const values = new Set(value);
            // Multiple.
            if (values.has(opt.value)) {
              onDeselect?.(opt.value);
            } else {
              onSelect?.(opt.value);
            }
          } else {
            // Single.
            onSelect?.(opt.value);
          }
        }

        function handleMouseDown() {
          if (isTouchScreen()) return;

          handleSelect();
        }

        return (
          <div
            key={i}
            onTouchStart={handleSelect}
            onMouseDown={handleMouseDown}
            css={BUTTON_STYLES}
            className={`${selected ? 'selected' : ''}`}
            style={{ width: percentWidth }}
          >
            {opt.text}
          </div>
        );
      })}
    </div>
  );
}

function isTouchScreen(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
