export const isArray = <T,>(arr: unknown): arr is T[] => {
  if (arr !== undefined && typeof (arr as Array<T>).length === "number") {
    return true;
  }
  return false;
};
