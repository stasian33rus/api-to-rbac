import React, {
  ChangeEvent,
  createRef,
  RefObject,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  GlobalContext,
  INITIAL_GLOBAL_CONTEXT,
  Operation,
  Role,
} from "../../../features/render/globalContext";
import { apiParser } from "../../../features/render/apiParser/apiParser";
import { FileViewer } from "../../components/FileViewer";
import { removeExt } from "../../../features/removeExt";
import { Entitie } from "../../components/Editor";
import { Button } from "../../components/Button";
import { Line } from "../../components/Line";
import { Permissions } from "./Permissions";
import { Roles } from "./Roles";
import { File } from "./File";
import {
  Error,
  Header,
  HiddenInputFile,
  StyledButton,
  Title,
} from "./ProjectPage.styled";

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

  const [formValues, setFormValues] = useState(initialValues);
  const [valuesEqual, setValuesEqual] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [file, setFile] = useState<APIFile | undefined>();
  const [addedOperations, setAddedOperations] = useState<string[]>([]);
  const [removedOperations, setRemovedOperations] = useState<string[]>([]);
  const [addedOperationsText, setAddedOperationsText] = useState<string>();
  const [removedOperationsText, setRemovedOperationsText] = useState<string>();

  useEffect(() => {
    if (file == undefined) {
      return;
    }
    const removed = getRemovedOperations(
      initialValues.operations,
      file.operations
    );
    setRemovedOperations(removed.map((o) => o.name));
    const added = getAddedOperations(initialValues.operations, file.operations);
    setAddedOperations(added.map((o) => o.name));
    let addedText;
    let removedText;
    if (added.length !== 0) {
      addedText = added
        .map((r) => r.name)
        .slice(0, 2)
        .join(" ");

      if (added.length > 2) {
        addedText += ` and ${added.length - 2} others are`;
      }
      setAddedOperationsText(addedText);
    }

    if (removed.length !== 0) {
      removedText = removed
        .map((r) => r.name)
        .slice(0, 2)
        .join(" ");

      if (removed.length > 2) {
        removedText += ` and ${removed.length - 2} others are`;
      }
      setRemovedOperationsText(removedText);
    }
  }, [file]);

  useEffect(() => {
    if (
      formValues.name === initialValues.name &&
      formValues.path === initialValues.path &&
      formValues.permissions == initialValues.permissions &&
      formValues.roles == initialValues.roles &&
      formValues.operations == initialValues.operations
    ) {
      setValuesEqual(true);
      return;
    }
    setValuesEqual(false);
  }, [formValues]);
  const recentProjectsNames = recentProjects.map((project) => project.name);

  return (
    <>
      <Error>{errorMessage}</Error>
      <Header>
        <Title
          value={formValues.name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const name = event.target.value || "";
            setFormValues({
              ...formValues,
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
          <Button
            onClick={() => {
              if (setSelectedProject == undefined) {
                return;
              }
              if (valuesEqual) {
                setSelectedProject(INITIAL_GLOBAL_CONTEXT.selectedProject);
                return;
              }
              const name = formValues.name;
              const oldName = selectedProject.name;
              const content = JSON.stringify({
                ...formValues,
                name,
                path: selectedProject.path.replace(oldName, name),
              });
              window.ipcApi.updateProject(name, oldName, content).then(() => {
                setSelectedProject(INITIAL_GLOBAL_CONTEXT.selectedProject);
              });
            }}
            disabled={errorMessage !== undefined}
          >
            Save
          </Button>
          <Button
            onClick={() =>
              setSelectedProject &&
              setSelectedProject(INITIAL_GLOBAL_CONTEXT.selectedProject)
            }
          >
            Return
          </Button>
        </div>
      </Header>
      <Line />
      {file === undefined && (
        <StyledButton
          outlined
          onClick={() => inputFileRef.current && inputFileRef.current.click()}
        >
          Upload API file
        </StyledButton>
      )}
      <HiddenInputFile
        ref={inputFileRef}
        type="file"
        accept=".yaml, .json"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          if (
            event.target.files == undefined ||
            event.target.files[0] == undefined
          ) {
            return;
          }
          const file = event.target.files[0];
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
                setFormValues({ ...formValues, operations });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      />
      {file !== undefined && (
        <File
          name={file.name}
          path={file.path}
          operations={file.operations}
          onChangeFile={() =>
            inputFileRef.current && inputFileRef.current.click()
          }
          addedOperationsText={addedOperationsText}
          removedOperationsText={removedOperationsText}
        />
      )}
      <Line />
      <Permissions
        addedOperations={addedOperations}
        removedOperations={removedOperations}
        onSubmit={(values: {
          name?: string;
          entities?: Entitie[];
          oldName?: string;
        }) => {
          const permissions = [
            ...formValues.permissions.filter((p) => p.name !== values.oldName),
          ];

          if (values.name !== undefined && values.entities !== undefined) {
            permissions.push({
              name: values.name,
              operations: values.entities.map((e) => {
                const [method, path] = e.text.split(" : ");
                return { name: e.name, method, path };
              }),
            });
          }

          setFormValues({
            ...formValues,
            permissions,
          });
        }}
        operations={formValues.operations}
        permissions={formValues.permissions}
      />
      <Line />
      <Roles
        onSubmit={(values: {
          name?: string;
          entities?: Entitie<Operation>[];
          oldName?: string;
        }) => {
          const roles = [
            ...formValues.roles.filter((p) => p.name !== values.oldName),
          ];

          if (values.name !== undefined && values.entities !== undefined) {
            roles.push({
              name: values.name,
              permissions: values.entities.map((e) => {
                return { name: e.name, operations: e.data || [] };
              }),
            });
          }

          setFormValues({
            ...formValues,
            roles,
          });
        }}
        permissions={formValues.permissions}
        roles={formValues.roles}
      />
      <Line />
      <FileViewer title="RBAC - file" text={getRbacValues(formValues.roles)} />
      <Line />
      <FileViewer
        title="Rules - file"
        text={formValues.roles
          .map(
            (p) =>
              `${p.name}:\n${p.permissions
                .map((o) => "   - " + o.name + "\n")
                .join("")}`
          )
          .join("")}
      />
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

const getRbacValues = (roles: Role[]) =>
  roles
    .map((r) => {
      return r.permissions
        .map((p) => {
          return p.operations
            .map((o) => {
              return `${p.name},${r.name},${o.path},${o.method.toUpperCase()}`;
            })
            .join("\n");
        })
        .join("\n");
    })
    .join("\n");

const getAddedOperations = (
  projectOperations: Operation[],
  fileOperations: Operation[]
): Operation[] => {
  const addedOperations: Operation[] = [];
  const parsedOperations: Record<string, Operation> = {};
  projectOperations.map((o) => {
    parsedOperations[o.name] = o;
  });

  fileOperations.map((p) => {
    if (!(p.name in parsedOperations)) {
      addedOperations.push(p);
    }
  });
  return addedOperations;
};

const getRemovedOperations = (
  projectOperations: Operation[],
  fileOperations: Operation[]
): Operation[] => {
  const removedOperations: Operation[] = [];
  const parsedOperations: Record<string, Operation> = {};
  fileOperations.map((o) => {
    parsedOperations[o.name] = o;
  });

  projectOperations.map((p) => {
    if (!(p.name in parsedOperations)) {
      removedOperations.push(p);
    }
  });
  return removedOperations;
};
