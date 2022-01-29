import { createContext } from "react";

export interface Operation {
  [key: string]: { [key: string]: string };
}

export interface Permission {
  [key: string]: Operation[];
}

export interface Role {
  [key: string]: Permission[];
}

export interface ProjectFile {
  name: string | "unset";
  path: string;
  operations: Operation[] | undefined[];
  permissions: Permission[] | undefined[];
  roles: Role[] | undefined[];
}

export interface GlobalState {
  selectedProject: ProjectFile;
  recentProjects?: ProjectFile[];
  setSelectedProject?: (project: ProjectFile) => void;
  setRecentProjects?: (project: ProjectFile[]) => void;
}

export const INITIAL_GLOBAL_CONTEXT: GlobalState = {
  selectedProject: {
    name: "unset",
    path: "",
    operations: [],
    permissions: [],
    roles: [],
  },
};

export const GlobalContext = createContext(INITIAL_GLOBAL_CONTEXT);
