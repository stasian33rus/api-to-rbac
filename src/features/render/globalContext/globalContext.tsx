import { createContext } from "react";

export interface Operation {
  name: string;
  method: string;
  path: string;
}

export interface Permission {
  name: string;
  operations: Operation[];
}

export interface Role {
  name: string;
  permissions: Permission[];
}

export interface ProjectFile {
  name: string | "unset";
  path: string;
  operations: Operation[];
  permissions: Permission[];
  roles: Role[];
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
