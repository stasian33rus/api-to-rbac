import React, {
  ChangeEvent,
  createRef,
  RefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import {
  GlobalContext,
  INITIAL_GLOBAL_CONTEXT,
  Operation,
} from "../../../features/render/globalContext";
import { removeExt } from "../../../features/removeExt";
import { apiParser } from "../../../features/render/ApiParser/apiParser";
import { Button } from "../../components/Button";
import { createPathText } from "../Home/Home";

interface APIFile {
  name: string;
  path: string;
  operations: Operation[];
}

export const ProjectPage = (): React.ReactElement => {
  const {
    selectedProject,
    setSelectedProject,
    recentProjects = [],
  } = useContext(GlobalContext);
  const initialValues = {
    ...selectedProject,
    name: removeExt(selectedProject.name),
  };

  const inputFileRef: RefObject<HTMLInputElement> = createRef();

  const [projectValues, setProjectValues] = useState(initialValues);
  const [valuesEqual, setValuesEqual] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [file, setFile] = useState<APIFile | undefined>();

  useEffect(() => {
    if (
      projectValues.name === initialValues.name &&
      projectValues.path === initialValues.path &&
      projectValues.permissions == initialValues.permissions &&
      projectValues.roles == initialValues.roles &&
      projectValues.operations == initialValues.operations
    ) {
      setValuesEqual(true);
    }
  }, [projectValues]);

  const recentProjectsNames = recentProjects.map((project) => project.name);

  return (
    <>
      <Error>{errorMessage}</Error>
      <Header>
        <Title
          value={projectValues.name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const name = event.target.value || "";
            setProjectValues({
              ...projectValues,
              name,
            });
            const err = validateName(
              recentProjectsNames.filter((p) => p !== selectedProject.name),
              name
            );
            setErrorMessage(err);
          }}
        />
        <div>
          <button
            onClick={() => {
              if (setSelectedProject == undefined) {
                return;
              }
              if (valuesEqual) {
                setSelectedProject(INITIAL_GLOBAL_CONTEXT.selectedProject);
                return;
              }
              const name = projectValues.name;
              const oldName = selectedProject.name;
              const content = JSON.stringify({
                ...projectValues,
                name,
                path: selectedProject.path.replace(oldName, name),
              });

              window.ipcApi.updateProject(name, oldName, content).then(() => {
                setSelectedProject(INITIAL_GLOBAL_CONTEXT.selectedProject);
              });
            }}
            disabled={errorMessage !== undefined}
          >
            Сохранить
          </button>
        </div>
      </Header>
      {file === undefined && (
        <Button
          outlined
          onClick={() => inputFileRef.current && inputFileRef.current.click()}
        >
          Upload API file
        </Button>
      )}
      <HiddenInputFile
        ref={inputFileRef}
        type="file"
        accept=".yaml, .json"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (event.target.files == undefined) {
            return;
          }
          const file = event.target.files[0];
          console.log(file);
          file
            .text()
            .then((api) => {
              const splittedFileName = file.name.split(".");
              const fileExt = splittedFileName.pop();
              const operations = apiParser(api, fileExt);
              if (operations !== undefined) {
                setFile({
                  name: splittedFileName.join("."),
                  path: file.path,
                  operations,
                });
                setProjectValues({ ...projectValues, operations });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      />
      {file !== undefined && (
        <File>
          <h3>{file.name}</h3>
          <FileInfo>
            <FilePath>
              {createPathText(file.path, file.name.length)}
              <Button
                outlined
                onClick={() => {
                  inputFileRef.current && inputFileRef.current.click();
                }}
              >
                Change
              </Button>
            </FilePath>
            <FileOperations>
              {`${file.operations.length} operations.`}
              <Button onClick={console.log} outlined>
                Show all
              </Button>
            </FileOperations>
          </FileInfo>
        </File>
      )}
      {/* <Permissions>{selectedProject.permissions}</Permissions> */}
      {/* <Roles>{selectedProject.roles}</Roles> */}
      {/* <RbacFile>{}</RbacFile> */}
      {/* <RulesFile>{}</RulesFile> */}
    </>
  );
};

const validateName = (
  names: string[],
  name: string,
  text?: string
): string | undefined => {
  if (name.length === 0) {
    return text || "name is empty";
  }
  if (names.includes(name)) {
    return text || `${name} allready exists`;
  }
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

const Error = styled.div`
  text-align: center;
  color: red;
  font-size: 18px;
`;

const Title = styled.input`
  flex: 1;
  font-size: 18px;
  border: none;
  outline: none;
`;

const HiddenInputFile = styled.input`
  display: none;
`;

const File = styled.div`
  display: flex;
  gap: 15px;
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const FilePath = styled.div`
  display: flex;
  /* align-items: start; */
`;

const FileOperations = styled.div`
  display: flex;
  /* align-items: start; */
`;
