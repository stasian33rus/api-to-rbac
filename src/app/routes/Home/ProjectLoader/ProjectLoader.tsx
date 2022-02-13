import React, { ChangeEvent, createRef, FunctionComponent, Ref } from "react";
import styled from "styled-components";
import { Card } from "../../../components/Card";
import { ProjectFile } from "../../../../features/render/globalContext";
import { isProjectFile } from "../../../../features/render/typeGuards";

export interface ProjectLoaderProps {
  setSelectedProject: (project: ProjectFile) => void;
}

export const ProjectLoader: FunctionComponent<ProjectLoaderProps> = (props) => {
  const { setSelectedProject } = props;
  const inputRef: Ref<HTMLInputElement> = createRef();
  return (
    <Label>
      <StyledCard
        title="Open a project"
        text="Choose a project file (.project)"
        onClick={() => inputRef.current && inputRef.current.click()}
      />
      <Input
        ref={inputRef}
        type="file"
        accept=".project"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.files == undefined) {
            return;
          }
          event.target.files[0].text().then((text) => {
            const projectFile = JSON.parse(text);
            if (isProjectFile(projectFile)) {
              setSelectedProject(projectFile);
            }
          });
        }}
      />
    </Label>
  );
};

const Label = styled.label`
  display: flex;
`;

const Input = styled.input`
  display: none;
`;

const StyledCard = styled(Card)`
  flex: 1;
`;
