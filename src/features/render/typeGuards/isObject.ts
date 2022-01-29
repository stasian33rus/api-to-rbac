export const isObject = <T>(obj: unknown): obj is Record<string, T> => {
  if (
    obj !== undefined &&
    (obj as Record<string, unknown>).__proto__ !== undefined
  ) {
    return true;
  }
  return false;
};
