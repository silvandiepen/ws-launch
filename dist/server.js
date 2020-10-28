#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = __importStar(require("yargs"));
var path_1 = require("path");
var argv = yargs.options({
    port: { type: "number", default: 4000 },
    wait: { type: "number", default: 5000 },
    data: { type: "string", default: "", required: true },
    url: { type: "string", default: "" },
}).argv;
var cli_block_1 = require("cli-block");
argv.url = "http://localhost:" + argv.port;
var ls = {
    borderColor: "yellow",
};
cli_block_1.hello()
    .then(function () { return cli_block_1.START("Web Socket Mock Server", ls); })
    .then(function () { return cli_block_1.BLOCK_START("Settings", ls); })
    .then(function () { return cli_block_1.BLOCK_SETTINGS(argv, ls, { exclude: ["_", "$0"] }); })
    .then(function () { return cli_block_1.BLOCK_MID("Data", ls); })
    .then(function () { return cli_block_1.BLOCK_JSON(data, ls); })
    .then(function () { return cli_block_1.BLOCK_MID("Connect", ls); })
    .then(function () {
    return cli_block_1.BLOCK_LINE("Waiting for connection....", __assign(__assign({}, ls), { newLine: false }));
});
var data = {};
if (argv.data) {
    var dataUrl = path_1.resolve(path_1.join(process.cwd(), argv.data)) || path_1.resolve(path_1.join(__dirname, argv.data));
    data = require(dataUrl);
}
else {
    data = { content: "No data url given" };
}
var WebSocketServer = require("ws").Server, wss = new WebSocketServer({ port: argv.port });
wss.on("connection", function (ws) {
    cli_block_1.hello()
        .then(function () { return cli_block_1.CLEAR(); })
        .then(function () { return cli_block_1.BLOCK_LINE_SUCCESS("Connection Started!", ls); })
        .then(function () {
        var countDownTime = -1000 + argv.wait;
        var countDown = setInterval(function () {
            cli_block_1.CLEAR();
            cli_block_1.BLOCK_LINE_SUCCESS("Sending data in " + countDownTime / 1000 + " seconds...", __assign(__assign({}, ls), { newLine: false }));
            countDownTime = countDownTime - 1000;
            if (countDownTime <= 0) {
                clearInterval(countDown);
            }
        }, 1000);
    });
    wss.on("message", function (message) {
        if (message === "ping") {
            ws.send("pong");
        }
        cli_block_1.hello().then(function () { return cli_block_1.BLOCK_LINE(message, ls); });
    });
    setTimeout(function () {
        cli_block_1.hello()
            .then(function () {
            cli_block_1.CLEAR();
            cli_block_1.BLOCK_LINE_SUCCESS("Send Data", ls);
            ws.send(JSON.stringify(data));
        })
            .then(function () { return cli_block_1.BLOCK_END(undefined, ls); })
            .then(function () { return process.exit(0); });
    }, argv.wait);
});
