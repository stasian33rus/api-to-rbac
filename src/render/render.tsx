import React from "react";
import ReactDOM from "react-dom";
import { observable } from "mobx";
import { ProjectPage } from "../app/routes/ProjectPage";
import styled from "styled-components";

const fileState = observable({
  file: undefined,
  get logFile() {
    console.log(this.file);
    return this.file;
  },
  loadFile(file: File) {
    this.file = file;
  },
});

const StyledTest = styled.div`
  width: 100%;
  height: 300px;
  background: black;
`;

ReactDOM.render(
  <div>{/* <ProjectPage store={fileState} /> */}</div>,
  document.getElementById("root")
);
