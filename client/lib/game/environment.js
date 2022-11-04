const GAME_SRC = '../lib/game';

const { ipcRenderer } = require('electron');

function terminal_log() {
    console.log(...arguments);
    let text = [];
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'object') {
            text.push(JSON.stringify(arguments[i]));
        } else {
            text.push(arguments[i].toString());
        }
    }
    ipcRenderer.send('renderer-log', text.join(' '));
}