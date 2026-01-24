export const normalize = (str: string): string => {
  return str
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "") // Remove diacritics
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .toLowerCase();
};
