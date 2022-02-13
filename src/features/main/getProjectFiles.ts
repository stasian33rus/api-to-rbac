import { ipcMain } from "electron";
import * as fs from "fs";
import * as path from "path";
import { removeExt } from "../removeExt";

export const getProjectFiles = ipcMain.handle("get-project-files", () => {
  const files = fs.readdirSync(path.join(__dirname, "..", "projects"));
  const projects = files.map((name) => {
    const file = fs.readFileSync(
      path.join(__dirname, "..", "projects", name),
      "utf8"
    );

    return {
      ...JSON.parse(file),
      name: removeExt(name),
      path: path.join(__dirname, "..", "projects/", name),
    };
  });
  return projects;
});
