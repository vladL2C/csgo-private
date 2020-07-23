"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
electron_1.app.on('ready', function () {
    var win = new electron_1.BrowserWindow({
        width: 800,
        height: 600
    });
    win.loadFile('./index.html');
});
