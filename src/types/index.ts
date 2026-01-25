export interface Characteristic {
  value: number;
  half: number;
  fifth: number;
}

export interface BaseSkill {
  id: string;
}

export interface StaticSkill extends BaseSkill {
  type: "static";
  key: string;
  base: number | string;
}

export interface StandardSkill extends BaseSkill {
  type: "standard";
  key: string;
  base: number | string;
  current: number;
  checked: boolean;
}

export interface CustomSkill extends BaseSkill {
  type: "custom";
  name: string;
  current: number;
  checked: boolean;
}

export type Skill = StaticSkill | StandardSkill | CustomSkill;

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
  weapons: Weapon[];
  fellowInvestigators: Array<{ name: string; player: string }>;
  notes: string;
  photo?: string;
}

export type Language = "fr" | "en" | "es";
