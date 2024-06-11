import path from 'path';
import { app, ipcMain, BrowserWindow } from 'electron';
import express from 'express';
import { createWindow } from './helpers';

const isProd = process.env.NODE_ENV === 'production';

;(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (isProd) {
    const server = express();
    const port = 9876;
    const appPath = path.join(__dirname, '../app');

    server.use(express.static(appPath));

    server.get('*', (req, res) => {
      res.sendFile(path.join(appPath, 'index.html'));
    });

    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

    await mainWindow.loadURL(`http://localhost:${port}/home`);
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`);
});