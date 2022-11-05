import { css } from '@emotion/react';
import { useState } from 'react';
import { ButtonDock } from '../../components/ButtonDock';
import { LinkButton } from '../../components/LinkButton';
import { Settings } from '../../settings';
import { secsPerQuestion } from '../../util/tuning';
import { GameModes, TimeLimits } from '../game/model';
import { InputOption, SplitButton } from './SplitButton';

const MENU_STYLES = css`
  p {
    text-align: center;
    margin-bottom: 0;
  }

  padding: 1rem;

  .hint {
    text-align: center;
    color: grey;
  }
`;

const MODE_OPTIONS: InputOption<GameModes>[] = [
  { text: '+', value: 'add' },
  { text: '-', value: 'sub' },
  { text: '×', value: 'mult' },
  { text: '÷', value: 'div' },
];

const QUESTION_OPTIONS: InputOption<number>[] = [
  { text: '10', value: 10 },
  { text: '25', value: 25 },
  { text: '50', value: 50 },
  { text: '75', value: 75 },
  { text: '100', value: 100 },
];

const TIME_LIMIT_OPTIONS: InputOption<TimeLimits>[] = [
  { text: 'Easy', value: 'easy' },
  { text: 'Med', value: 'med' },
  { text: 'Hard', value: 'hard' },
  { text: '🤯', value: 'insane' },
];

export function Menu() {
  const options = Settings.gameOptions;
  const [timeLimit, setTimeLimit] = useState(options.timeLimit);
  const [modes, setModes] = useState(options.modes);
  const [questions, setQuestions] = useState(options.questions);

  Settings.gameOptions = { max: 10, min: 1, modes, questions, timeLimit };

  function handleModeSelect(mode: GameModes) {
    const newModes = [...modes.filter((m) => m !== mode), mode];
    setModes(newModes);
  }

  function handleModeDeselect(mode: GameModes) {
    const newModes = modes.filter((m) => m !== mode);
    setModes(newModes);
  }

  return (
    <div css={MENU_STYLES}>
      <Title />
      <p>Which modes?</p>
      <SplitButton
        modes
        options={MODE_OPTIONS}
        value={modes}
        onSelect={handleModeSelect}
        onDeselect={handleModeDeselect}
      ></SplitButton>
      <p>How many questions?</p>
      <SplitButton
        options={QUESTION_OPTIONS}
        value={questions}
        onSelect={(questions) => setQuestions(questions)}
      ></SplitButton>
      <p>Time pressure?</p>
      <SplitButton
        options={TIME_LIMIT_OPTIONS}
        value={timeLimit}
        onSelect={(limit) => setTimeLimit(limit)}
      ></SplitButton>
      <div className="hint">
        {secsPerQuestion(timeLimit)} second{secsPerQuestion(timeLimit) === 1 ? '' : 's'} per question
        {timeLimit === 'insane' ? '!!' : ''}
      </div>
      <ButtonDock>
        <LinkButton to="/countdown">START!</LinkButton>
      </ButtonDock>
    </div>
  );
}

const TITLE_STYLES = css`
  font-size: 8vh;
  text-align: center;
`;

function Title() {
  return <h1 css={TITLE_STYLES}>BASIC FACTS</h1>;
}
