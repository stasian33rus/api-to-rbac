import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Page } from "../../components/Layout";
import { Card } from "../../components/Card";
import { GlobalContext } from "../../../features/render/globalContext";
import { isProjectFile } from "../../../features/render/typeGuards";
import { ProjectLoader } from "./ProjectLoader/ProjectLoader";
import { Line } from "../../../app/components/Line";

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
              <Card
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
            <Line />
            {recentProjects !== undefined && (
              <>
                <RecentTitle>RecentProjects</RecentTitle>
                <RecentProjects>
                  {recentProjects.map((p, i) => (
                    <Card
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

export const createPathText = (
  path: string,
  projectNameLength: number
): string =>
  path.substring(0, 15) +
  "..." +
  path.substring(path.length, path.length - projectNameLength - 1);

const Header = styled.header`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1rem;

  & > * {
    width: 280px;
  }
`;

const RecentTitle = styled.span`
  font-family: Roboto;
  font-size: 32px;
  font-weight: 600;
`;

const RecentProjects = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  grid-gap: 1em;
`;
