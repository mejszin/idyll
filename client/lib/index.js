const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const ini = require('ini');

const debug = true;

const title = 'idyll';

const width = 20 * 32 + (debug ? 480 : 0);
const height = 16 * 32;

var config = ini.parse(fs.readFileSync('./data/config.ini', 'utf-8'));

var mainWindow = null;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        title: title,
        width: width,
        height: height,
    //  icon: path.join(__dirname, "../data/images/carton.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })
    if (debug) { mainWindow.toggleDevTools() };
//  mainWindow.setAlwaysOnTop(true, 'screen');
    mainWindow.setResizable(false);
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadFile('html/login.html');
    mainWindow.on('close', async function() {
        console.log("Closing");
    });
}

app.whenReady().then(() => {
    createWindow();
    mainWindow.setContentSize(width - 1, height - 1);
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('renderer-log', (event, arguments) => {
    console.log(arguments);
});