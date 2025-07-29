const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
       webviewTag: true,
         contextIsolation: true,
      nodeIntegration: false,
    },
    // Prevent window from appearing in screen share
    titleBarStyle: 'default',
    transparent: true,
    hasShadow: false,
   
  });

  mainWindow.loadFile('index.html');

  // Prevent screen capture (Windows 10+ and macOS)
  mainWindow.setContentProtection(true);
}
app.commandLine.appendSwitch('disable-gpu');

app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

