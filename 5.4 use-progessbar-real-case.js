import https from "node:https";
import fs from "node:fs";
import { ProgressBar } from "./5.2 progressBar.js";

const downloadURLs = {
  linux: "https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/970501/chrome-linux.zip",
  darwin: "https://storage.googleapis.com/chromium-browser-snapshots/Mac/970501/chrome-mac.zip",
  win32: "https://storage.googleapis.com/chromium-browser-snapshots/Win/970501/chrome-win32.zip",
  win64: "https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/970501/chrome-win32.zip",
};

https.get(downloadURLs[process.platform], (response) => {
  //拿到响应 header 里的 content-length，就是总长度
  const totalBytes = Number(response.headers["content-length"]);
  let downloaded = 0;

  const fileStream = fs.createWriteStream("chrome.zip");
  response.pipe(fileStream);

  const progressBar = new ProgressBar();
  progressBar.start(totalBytes, downloaded);

  // 而每次触发 data 事件的时候，参数 chunk 的长度就是每次传输的长度。
  response.on("data", (chunk) => {
    downloaded += chunk.length;
    progressBar.update(downloaded);
  });

  response.on("end", () => {
    progressBar.finish();
  });
});
