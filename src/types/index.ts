export interface Characteristic {
  value: number;
  half: number;
  fifth: number;
}

export interface Skill {
  key?: string;
  name?: string;
  base: number | string;
  current: number;
  checked: boolean;
  isCustom?: boolean;
  id?: string;
}

export interface Weapon {
  name: string;
  regular: string;
  hard: string;
  extreme: string;
  damage: string;
  range: string;
  attacks: string;
  ammo: string;
  malfunction: string;
}

export interface InvestigatorData {
  identity: {
    name: string;
    player: string;
    occupation: string;
    age: string;
    sex: string;
    residence: string;
    birthplace: string;
  };
  characteristics: Record<string, number>;
  trackers: {
    hp: number;
    mp: number;
    sanity: number;
    luck: number;
    hpMax: number;
    mpMax: number;
    sanityInitial: number;
    sanityMax: number;
    majorWound: boolean;
    tempInsane: boolean;
    indefInsane: boolean;
  };
  skills: Skill[];
  backstory: {
    personalDescription: string;
    ideologyBeliefs: string;
    significantPeople: string;
    meaningfulLocations: string;
    treasuredPossessions: string;
    traits: string;
    injuriesScars: string;
    phobiasManias: string;
    arcaneTomesSpells: string;
    strangeEntities: string;
  };
  gear: string;
  wealth: {
    spendingLevel: string;
    cash: string;
    assets: string;
  };
  fellowInvestigators: Array<{ name: string; player: string }>;
  notes: string;
  photo?: string;
}

export type Language = "fr" | "en" | "es";
