import { ipcMain } from "electron";
import * as fs from "fs";
import * as path from "path";

export const createFilesFolder = ipcMain.handle(
  "create-projects-folder",
  () => {
    const folderPath = path.join(__dirname, "..", "projects");

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      return "dir projects created";
    }
    return "dir projects allready exists";
  }
);
