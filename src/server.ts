#!/usr/bin/env node
import * as yargs from "yargs";

import { Arguments } from "./types";

const argv: Arguments = yargs.options({
  port: { type: "number", default: 4000 },
  wait: { type: "number", default: 5000 },
  data: { type: "string", default: "./mockData.js" },
  url: { type: "string", default: "" },
}).argv;

import {
  START,
  BLOCK_START,
  BLOCK_SETTINGS,
  BLOCK_MID,
  BLOCK_LINE,
  BLOCK_END,
  BLOCK_JSON,
  BLOCK_LINE_SUCCESS,
  CLEAR,
  hello,
} from "cli-block";

argv.url = `http://localhost:${argv.port}`;

const ls = {
  borderColor: "yellow",
};

hello()
  .then(() => START("Web Socket Mock Server", ls))
  .then(() => BLOCK_START("Settings", ls))
  .then(() => BLOCK_SETTINGS(argv, ls))
  .then(() => BLOCK_MID("Data", ls))
  .then(() => BLOCK_JSON(data, ls))
  .then(() => BLOCK_MID("Connect", ls))
  .then(() =>
    BLOCK_LINE("Waiting for connection....", { ...ls, newLine: false })
  );

let data = require(argv.data);
if (!argv.data) data = data.test;

var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: argv.port });

wss.on("connection", (ws: any) => {
  hello()
    .then(() => CLEAR())
    .then(() => BLOCK_LINE_SUCCESS("Connection Started!", ls))
    .then(() => {
      let countDownTime = -1000 + argv.wait;
      const countDown = setInterval(() => {
        CLEAR();
        BLOCK_LINE_SUCCESS(
          `Sending data in ${countDownTime / 1000} seconds...`,
          { ...ls, newLine: false }
        );
        countDownTime = countDownTime - 1000;
        if (countDownTime <= 0) {
          clearInterval(countDown);
        }
      }, 1000);
    });

  wss.on("message", (message: string) => {
    if (message === "ping") {
      ws.send("pong");
    }
    hello().then(() => BLOCK_LINE(message, ls));
  });

  setTimeout(() => {
    hello()
      .then(() => {
        CLEAR();
        BLOCK_LINE_SUCCESS("Send Data", ls);
        ws.send(JSON.stringify(data));
      })
      .then(() => BLOCK_END(undefined, ls))
      .then(() => process.exit(0));
  }, argv.wait);
});
