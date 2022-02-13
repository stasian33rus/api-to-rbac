import React, { FunctionComponent, useEffect, useState } from "react";
import { ProjectPage } from "./routes/ProjectPage";
import { Home } from "./routes/Home/Home";
import styled from "styled-components";
import {
  GlobalContext,
  INITIAL_GLOBAL_CONTEXT,
  ProjectFile,
} from "../features/render/globalContext";
import { isArray, isProjectFile } from "../features/render/typeGuards";

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-family: sans-serif;

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`;

export const App: FunctionComponent = () => {
  const [selectedProject, setSelectedProject] = useState(
    INITIAL_GLOBAL_CONTEXT.selectedProject
  );
  const [recentProjects, setRecentProjects] = useState<ProjectFile[]>([]);

  useEffect(() => {
    window.ipcApi.createProjectsFolder().then(() => {
      window.ipcApi.getRecentProjects().then((projects: unknown) => {
        if (isArray<ProjectFile>(projects)) {
          projects.map((p) => {
            if (!isProjectFile(p)) {
              return;
            }
          });
          setRecentProjects(projects);
        }
      });
    });
  }, [selectedProject]);

  return (
    <GlobalContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
        recentProjects,
        setRecentProjects,
      }}
    >
      <Root>
        {selectedProject.name === "unset" && <Home />}
        {selectedProject.name !== "unset" && <ProjectPage />}
      </Root>
    </GlobalContext.Provider>
  );
};
