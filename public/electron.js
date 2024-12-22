import { join } from "path";
import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";

const VITE_DEV_SERVER_URL = "http://localhost:5173";
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (isDev) {
    win.loadURL(VITE_DEV_SERVER_URL).catch((err) => console.error(err));
    win.webContents.openDevTools();
  } else {
    win.loadFile(join(__dirname, "..dist/index.html"));
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
