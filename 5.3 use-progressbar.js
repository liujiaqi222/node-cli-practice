import { clearTimeout } from "timers";
import { ProgressBar } from "./5.2 progressBar.js";

const bar = new ProgressBar();

bar.start(200, 0);

let value = 0;
const timer = setInterval(() => {
  value++;
  bar.update(value);
  if (value > bar.total) {
    clearTimeout(timer);
    bar.finish();
  }
}, 20);
