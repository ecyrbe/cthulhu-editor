export const toField = (num: number): string => {
  return num < 0 ? "" : num.toString();
};

export const toHardField = (num: number): string => {
  return num < 0 ? "" : Math.floor(num / 2).toString();
};

export const toExtremeField = (num: number): string => {
  return num < 0 ? "" : Math.floor(num / 5).toString();
};
