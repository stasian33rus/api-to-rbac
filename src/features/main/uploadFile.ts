// import { ipcMain, dialog, BrowserWindow } from "electron";
// import fs from "fs";

// export const uploadFile = (browserWindow: BrowserWindow): void =>
//   ipcMain.handle("upload-api-file", () => {
//     const [filePath] = dialog.showOpenDialogSync(browserWindow, {
//       properties: ["openFile"],
//       filters: [{ name: "projectFile", extensions: ["project"] }],
//     });

//     if (filePath === undefined) {
//       return;
//     }

//     const fileData = fs.readFileSync(filePath, "utf8");

//     return JSON.parse(fileData);

//     return {
//       name: filePath.split("\\").pop(),
//       methods: [],
//       permissions: [],
//       roles: [],
//     };
//   });
