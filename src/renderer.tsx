import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app/App";
import { IpcApi } from "./ipcApi/ipc-api";

declare global {
  interface Window {
    ipcApi: IpcApi;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
