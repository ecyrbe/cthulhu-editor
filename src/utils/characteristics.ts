const STAT_TRANSLATION_KEY: Record<string, string> = {
  FOR: "str",
  DEX: "dex",
  POU: "pow",
  CON: "con",
  APP: "app",
  EDU: "edu",
  TAI: "siz",
  INT: "int",
  MVT: "mov",
};

export const getCharacteristicTranslationKey = (stat: string): string => {
  return STAT_TRANSLATION_KEY[stat] ?? stat.toLowerCase();
};
