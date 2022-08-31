export const getRelationTrueOrFalse = (
  params: string | boolean | undefined
): boolean => {
  return params === "true" ? true : false;
};
