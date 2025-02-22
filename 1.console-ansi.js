import readline from "node:readline";



// 打印空行
const repeatCount = process.stdout.rows - 2;
const blank = repeatCount > 0 ? "\n".repeat(repeatCount) : "";
console.log(blank);
// 清空控制台
readline.cursorTo(process.stdout, 0, 0);
readline.clearScreenDown(process.stdout);