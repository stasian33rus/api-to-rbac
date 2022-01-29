import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Page } from "../../components/Layout";
import { ProjectCard } from "../../components/ProjectCard";
import { GlobalContext } from "../../../features/render/globalContext";
import { isProjectFile } from "../../../features/render/typeGuards";
import { ProjectLoader } from "./ProjectLoader/ProjectLoader";

export const Home: FunctionComponent = (props) => {
  const { ...rest } = props;
  return (
    <GlobalContext.Consumer>
      {({
        selectedProject,
        recentProjects,
        setSelectedProject = (proj) => {
          throw new Error(
            `Can't set ${proj.name}, becose setsetSelectedProject is not defined`
          );
        },
      }) =>
        selectedProject.name === "unset" && (
          <Page {...rest}>
            <Header>
              <ProjectCard
                title="Create a new project"
                text="Will be created new empty project file"
                onClick={() => {
                  window.ipcApi.createProject().then((createdFile) => {
                    if (isProjectFile(createdFile)) {
                      setSelectedProject(createdFile);
                    }
                  });
                }}
              />
              <ProjectLoader setSelectedProject={setSelectedProject} />
            </Header>
            {recentProjects !== undefined && (
              <>
                <Recent>RecentProjects</Recent>
                <RecentProjects>
                  {recentProjects.map((p, i) => (
                    <ProjectCard
                      key={p.name + i}
                      title={p.name}
                      text={createPathText(
                        p.path,
                        (p.name + ".project").length
                      )}
                      onClick={() => setSelectedProject(p)}
                    />
                  ))}
                </RecentProjects>
              </>
            )}
          </Page>
        )
      }
    </GlobalContext.Consumer>
  );
};

export const createPathText = (path: string, projectNameLength: number) =>
  path.substring(0, 15) +
  "..." +
  path.substring(path.length, path.length - projectNameLength - 1);

const Header = styled.header`
  display: flex;
  justify-content: space-evenly;

  & > * {
    width: 280px;
  }
`;

const Recent = styled.h2`
  font-family: Roboto;
`;

const RecentProjects = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  grid-gap: 1em;
`;
