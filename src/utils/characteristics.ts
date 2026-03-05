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

const CHARACTERISTIC_ROLL_FORMULA: Record<string, string> = {
  FOR: "3D6 x 5",
  DEX: "3D6 x 5",
  POU: "3D6 x 5",
  CON: "3D6 x 5",
  APP: "3D6 x 5",
  TAI: "(2D6 + 6) x 5",
  INT: "(2D6 + 6) x 5",
  EDU: "(2D6 + 6) x 5",
};

export const getCharacteristicTranslationKey = (stat: string): string => {
  return STAT_TRANSLATION_KEY[stat] ?? stat.toLowerCase();
};

export const getCharacteristicRollFormula = (
  stat: string,
): string | undefined => {
  return CHARACTERISTIC_ROLL_FORMULA[stat];
};
