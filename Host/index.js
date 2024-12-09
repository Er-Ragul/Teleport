const { app, BrowserWindow, desktopCapturer, ipcMain, Menu, Tray } = require('electron')
const path = require('path');

let win
let tray = null
let keyboard = 'Offline', mouse = 'Offline'
const trayIconPath = path.join(__dirname, 'cast.png') 

const createWindow = () => {
    win = new BrowserWindow({
      width: 0,
      height: 0,
      frame: false,

      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false,
        //devTools: false
      }
    })

    desktopCapturer.getSources({ types: ['window', 'screen'] })
    .then(sources => {
        console.log(sources);
    })
    .catch(e => console.log(e))
  
    win.hide()
    win.loadFile('index.html')
}

/* To auto reload */
ipcMain.on('reload-window', (event) => {
  if (win) {
      win.reload();
  }
});

function updateTray() {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Drivers', 
      submenu: [
        { label: `Keyboard ${keyboard}` },
        { label: `Mouse ${mouse}` },
      ]
    },
    { label: 'Exit', click: () => win.close() }
  ]);

  tray.setToolTip('Teleport')
  tray.setContextMenu(contextMenu)
}

/* To get driver status */
ipcMain.on('driver-online', (event) => {
  keyboard = 'Online'
  mouse = 'Online'
  console.log('Keyboard: ', keyboard);
  console.log('Mouse: ', mouse);

  if (tray) {
    updateTray();
  }
});

app.whenReady().then(() => {
    createWindow()
    tray = new Tray(trayIconPath)
    updateTray()
})