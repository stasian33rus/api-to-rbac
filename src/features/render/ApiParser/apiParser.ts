import YAML from "yaml";
import { APIFile, isValidFile } from "../typeGuards/isValidFile";
import { Operation } from "../globalContext/globalContext";

export type Ext = "yaml" | "json" | string;

export const apiParser = (file: string, ext?: Ext): Operation[] | undefined => {
  if (ext !== "yaml" && ext !== "json") {
    throw new Error("error: unknow file extension");
  }
  if (file.length === 0) {
    throw new Error("error: file is empty");
  }
  let parsedFile: APIFile | undefined;

  try {
    if (ext === "json") {
      parsedFile = JSON.parse(file);
    }
    if (ext === "yaml") {
      parsedFile = YAML.parse(file);
    }
  } catch (error) {
    throw new Error("Error happend when try parse the file. Error: " + error);
  }

  const operations: Operation[] = [];
  if (parsedFile !== undefined && isValidFile(parsedFile)) {
    const paths = Object.keys(parsedFile.paths);
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const methods = Object.keys(parsedFile.paths[path]);
      for (let j = 0; j < methods.length; j++) {
        const method = methods[j];

        const name = parsedFile.paths[path][method].operationId;
        operations.push({ name, method, path });
      }
    }
    return operations;
  }
};
