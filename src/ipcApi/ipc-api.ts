/* eslint-disable @typescript-eslint/no-var-requires */
const ipcRenderer = require("electron").ipcRenderer;

export interface IpcApi {
  uploadApiFile: () => Promise<string>;
  updateProject: (
    name: string,
    oldName: string,
    content: string
  ) => Promise<void>;
  getRecentProjects: () => Promise<void>;
  createProjectsFolder: () => Promise<void>;
  createProject: () => Promise<string>;
}

export const ipcApi: IpcApi = {
  updateProject: (name: string, oldName: string, content: string) => {
    const data = {
      name,
      oldName,
      content,
    };
    return ipcRenderer.invoke("update-file", data);
  },
  uploadApiFile: () => ipcRenderer.invoke("upload-api-file"),
  createProject: () => ipcRenderer.invoke("create-new-project-file"),
  getRecentProjects: () => ipcRenderer.invoke("get-project-files"),
  createProjectsFolder: () => ipcRenderer.invoke("create-projects-folder"),
};
