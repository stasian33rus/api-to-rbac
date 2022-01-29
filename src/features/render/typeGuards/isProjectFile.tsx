import { ProjectFile } from "../globalContext/globalContext";

export const isProjectFile = (
  projectFile: unknown
): projectFile is ProjectFile => {
  if (
    projectFile !== undefined &&
    typeof (projectFile as ProjectFile).name === "string" &&
    typeof (projectFile as ProjectFile).operations === "object" &&
    typeof (projectFile as ProjectFile).operations.length === "number" &&
    typeof (projectFile as ProjectFile).permissions === "object" &&
    typeof (projectFile as ProjectFile).permissions.length === "number" &&
    typeof (projectFile as ProjectFile).roles === "object" &&
    typeof (projectFile as ProjectFile).roles.length === "number"
  ) {
    return true;
  }
  return false;
};
