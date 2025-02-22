import ansiEscapes from "ansi-escapes";
import chalk from "chalk";
import { EOL } from "os";

const write = process.stdout.write.bind(process.stdout);

// const write = process.stdout.write;

export class ProgressBar {
  total = 0;
  value = 0;
  constructor() {}

  start(total, initValue) {
    this.total = total;
    this.value = initValue;
    write(ansiEscapes.cursorHide); // hide cursor
    write(ansiEscapes.cursorSavePosition); // save cursor position
    this.render();
  }

  render() {
    let progress = this.value / this.total;
    if (progress < 0) {
      progress = 0;
    } else if (progress > 1) {
      progress = 1;
      this.value = this.total;
    }

    const barLength = 40;
    const completeLength = Math.round(progress * barLength);
    const incompleteLength = barLength - completeLength;
    write(ansiEscapes.cursorRestorePosition); // 在原地方开始写restore cursor position
    write(chalk.blue("█").repeat(completeLength));
    write("░".repeat(incompleteLength));
    write(` ${this.value}/${this.total}`);
  }
  update(value) {
    this.value = value;
    this.render();
  }
  finish() {
    write(ansiEscapes.cursorRestorePosition); // restore cursor position
    write(EOL); // move to next line
    write(ansiEscapes.cursorShow); // show cursor
  }
}
