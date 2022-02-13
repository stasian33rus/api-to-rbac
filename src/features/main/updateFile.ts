import { ipcMain } from "electron";
import * as fs from "fs";
import * as path from "path";

export const updateFile = ipcMain.handle(
  "update-file",
  (_, { name, oldName, content }) => {
    new Promise((resolve, reject) => {
      try {
        fs.writeFileSync(
          path.join(__dirname, "..", "projects", name + ".project"),
          content
        );

        resolve("fileCreated");
      } catch (error) {
        reject(`cannot create file with name ${name}. Error: ${error}`);
      }
    })
      .then(() => {
        if (oldName !== name) {
          fs.unlinkSync(
            path.join(__dirname, "..", "projects", oldName + ".project")
          );
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
);
