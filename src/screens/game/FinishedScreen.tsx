import { css } from '@emotion/react';
import { useMemo } from 'react';
import { ButtonDock } from '../../components/ButtonDock';
import { ExitButton as HomeButton } from '../../components/HomeButton';
import { LinkButton } from '../../components/LinkButton';
import { formatDuration } from '../../util/format';
import { GameReader } from '../game/GameReader';
import { GameState, TimeLimits } from '../game/model';

const FINISHED_SCREEN_STYLES = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  font-size: 5vh;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10vh;

  section {
    display: flex;
    font-size: 5vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  section + section {
    margin-top: 2vh;
  }

  p {
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: 5vh;
  }

  .title {
    font-size: 2rem;
    margin-bottom: -0.5rem;
  }

  .fact {
    font-size: 10vh;
    margin: -1rem 0;
  }

  .micro-fact {
    font-size: 3vh;
    color: #777;
  }

  .great {
    color: #028118;
  }

  .ok {
    color: #f1984a;
  }

  .poor {
    color: #eb3e3e;
  }
`;

const FINISHED_WORDS = ['ANOTHER!', 'AGAIN!', 'REPLAY', 'MORE!'];

type FinishedScreenProps = { state: GameState };
export function FinishedScreen({ state }: FinishedScreenProps) {
  function chooseNextWord() {
    const wordIndex = Math.trunc(Math.random() * FINISHED_WORDS.length);
    return FINISHED_WORDS[wordIndex];
  }

  const finishedWord = useMemo(chooseNextWord, []);
  const reader = new GameReader(state);

  return (
    <div css={FINISHED_SCREEN_STYLES}>
      <HomeButton />
      <section>
        <p className="title">{reader.numProblems} questions</p>
        <p className="micro-fact">allowed time: {formatDuration(state.allowedSeconds)}</p>
      </section>
      <section>
        <p className="title">Time</p>
        <p className={`fact ${judgeTimeRemaining(reader.secondsRemaining, state.options.timeLimit)}`}>
          {reader.elapsedTime}
        </p>
        <p className="micro-fact">{reader.averageTimePerQuestion}</p>
      </section>
      <section>
        <p className="title">Accuracy</p>
        <p className={`fact ${judgeScore(reader.percentCorrect, reader.allAnswered)}`}>
          {reader.numCorrectAnswers}/{reader.numAnswers}
          <br />
        </p>
        <p className="micro-fact">
          {reader.percentCorrectDisplay} accurate{' '}
          {!reader.allAnswered && <>({reader.numProblems - reader.numAnswers} missed)</>}
        </p>
      </section>
      <ButtonDock>
        <LinkButton to="/countdown">{finishedWord}</LinkButton>
      </ButtonDock>
    </div>
  );
}

type Judgements = 'ok' | 'poor' | 'great';

function judgeScore(percent: number, allAnswered: boolean): Judgements {
  if (percent < 70) {
    return 'poor';
  } else if (percent < 93) {
    return 'ok';
  } else {
    return allAnswered ? 'great' : 'ok';
  }
}

function judgeTimeRemaining(secondsRemaining: number, difficult: TimeLimits): Judgements {
  switch (difficult) {
    case 'insane':
      return secondsRemaining > 2 ? 'great' : 'ok';
  }

  if (secondsRemaining < 5) {
    return 'poor';
  } else if (secondsRemaining < 30) {
    return 'ok';
  } else {
    return 'great';
  }
}
