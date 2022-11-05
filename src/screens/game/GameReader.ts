import { secondsToWholeMinsAndLeftoverSecs } from '../../util/format';
import { GameState } from './model';

export class GameReader {
  constructor(public state: GameState) {}

  get elapsedChanged(): boolean {
    return this.actualElapsedSeconds !== this.state.elapsedSeconds;
  }

  get actualElapsedSeconds() {
    return Math.trunc((Date.now() - this.state.startTimestamp) / 1000);
  }

  get secondsRemaining() {
    return this.state.allowedSeconds - this.state.elapsedSeconds;
  }

  get numAnswers() {
    return this.state.answers.length;
  }

  get numCorrectAnswers() {
    return this.state.answers.reduce((tally, answer, i) => {
      if (answer === this.state.problems[i].correctAnswer) {
        return tally + 1;
      }
      return tally;
    }, 0);
  }

  get elapsedTime(): string {
    const { wholeMinutes, leftoverSeconds } = secondsToWholeMinsAndLeftoverSecs(this.state.elapsedSeconds);
    return `${wholeMinutes > 0 ? wholeMinutes + ' min ' : ''}${leftoverSeconds} sec`;
  }

  get numProblems() {
    return this.state.problemCount;
  }

  get percentCorrectDisplay() {
    return `${Math.round((this.numCorrectAnswers / this.numAnswers) * 100)}%`;
  }

  get averageTimePerQuestion() {
    const averageTimePerQuestion = this.state.elapsedSeconds / this.numAnswers;
    return `${averageTimePerQuestion.toFixed(1)} seconds per question`;
  }

  get percentCorrect() {
    return (this.numCorrectAnswers / this.numAnswers) * 100;
  }

  get allAnswered(): boolean {
    return this.numAnswers === this.numProblems;
  }

  get finished() {
    const finished =
      this.state.elapsedSeconds >= this.state.allowedSeconds || //
      this.state.answers.length === this.state.problemCount;
    return finished;
  }
}
