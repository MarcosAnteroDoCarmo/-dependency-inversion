export const stringToNumberOrUndefined = (
  value: string | number | undefined
) => {
  return isNaN(Number(value)) ? undefined : Number(value);
};
