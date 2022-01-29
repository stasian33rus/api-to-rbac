import { ipcApi } from "./ipcApi/ipc-api";
import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("ipcApi", ipcApi);
