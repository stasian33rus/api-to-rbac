import { ipcMain } from "electron";
import * as fs from "fs";
import * as path from "path";
import { removeExt } from "../removeExt";
import { INITIAL_GLOBAL_CONTEXT } from "../render/globalContext";

export const createFile = ipcMain.handle("create-new-project-file", () => {
  let fileName: string;
  const files = fs.readdirSync(path.join(__dirname, "..", "projects"));
  fileName = "new-project.project";
  for (let i = 1; i <= 50; i++) {
    if (i === 50) {
      throw new Error(
        "to much project files with new-project name, rename it please."
      );
    }

    if (gotEquals(files, fileName)) {
      let startFileName = "new-project0";
      if (i > 10) {
        startFileName = "new-project";
      }
      fileName = `${startFileName}${i}.project`;
    } else {
      const content = {
        ...INITIAL_GLOBAL_CONTEXT.selectedProject,
        name: fileName,
        path: path.join(__dirname, "..", "projects", fileName),
      };
      create(fileName, JSON.stringify(content));
      return { ...content, name: removeExt(fileName) };
    }
  }
});

const create = (fileName: string, content: string): string => {
  fs.appendFileSync(path.join(__dirname, "..", "projects", fileName), content);
  return fileName;
};

const gotEquals = (files: string[], fileName: string): boolean => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file == fileName) {
      return true;
    }
  }
  return false;
};
