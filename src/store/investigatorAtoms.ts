import { atom } from "jotai";
import {
  InvestigatorDataSchema,
  type InvestigatorData,
  type Skill,
  type Weapon,
} from "../types";
import { initialSkillsData } from "../constants/skills";
import { db } from "../db/db";

const CURRENT_VERSION = "1.0.0";

export const getInitialData = (): InvestigatorData => ({
  version: CURRENT_VERSION,
  identity: {
    name: "",
    player: "",
    occupation: "",
    age: "",
    sex: "",
    residence: "",
    birthplace: "",
  },
  characteristics: {
    FOR: 0,
    CON: 0,
    TAI: 0,
    DEX: 0,
    APP: 0,
    INT: 0,
    POU: 0,
    EDU: 0,
    MVT: 8,
  },
  trackers: {
    hp: 0,
    mp: 0,
    sanity: 0,
    luck: 0,
    hpMax: 0,
    mpMax: 0,
    sanityInitial: 0,
    sanityMax: 99,
    majorWound: false,
    tempInsane: false,
    indefInsane: false,
  },
  skills: initialSkillsData,
  backstory: {
    personalDescription: "",
    ideologyBeliefs: "",
    significantPeople: "",
    meaningfulLocations: "",
    treasuredPossessions: "",
    traits: "",
    injuriesScars: "",
    phobiasManias: "",
    arcaneTomesSpells: "",
    strangeEntities: "",
  },
  weapons: Array(5).fill({
    name: "",
    regular: "",
    hard: "",
    extreme: "",
    damage: "",
    range: "",
    attacks: "",
    ammo: "",
    malfunction: "",
  }),
  gear: "",
  wealth: {
    spendingLevel: "",
    cash: "",
    assets: "",
  },
  fellowInvestigators: Array(8).fill({ name: "", player: "" }),
  notes: "",
});

// Base atoms
export const investigatorDataAtom = atom<InvestigatorData>(getInitialData());

// Optimization: Atom for identity name to avoid parent re-renders
export const investigatorNameAtom = atom(
  (get) => get(investigatorDataAtom).identity.name,
);

// Derived atoms
export const derivedCombatAtom = atom((get) => {
  const data = get(investigatorDataAtom);
  const str = data.characteristics.FOR || 0;
  const siz = data.characteristics.TAI || 0;
  const str_siz = str + siz;
  let db = "0",
    build = 0;
  if (str_siz <= 64) {
    db = "-2";
    build = -2;
  } else if (str_siz <= 84) {
    db = "-1";
    build = -1;
  } else if (str_siz <= 124) {
    db = "0";
    build = 0;
  } else if (str_siz <= 164) {
    db = "+1D4";
    build = 1;
  } else if (str_siz <= 204) {
    db = "+1D6";
    build = 2;
  }
  return { db, build };
});

// Action atoms
export const loadInvestigatorAtom = atom(
  null,
  async (_get, set, id: number) => {
    const saved = await db.investigators.get(id);
    if (saved) {
      const result = InvestigatorDataSchema.safeParse(saved);
      if (result.success) {
        set(investigatorDataAtom, result.data);
        return result.data;
      }
    }
    return null;
  },
);

export const saveInvestigatorAtom = atom(null, async (get, set) => {
  const data = get(investigatorDataAtom);
  if (data.id) {
    await db.investigators.put(data);
  } else {
    const id = await db.investigators.add(data);
    set(investigatorDataAtom, { ...data, id: id as number });
  }
});

export const rollInvestigatorAtom = atom(null, (_get, set) => {
  const rollSimple = () =>
    (Math.floor(Math.random() * 6) +
      1 +
      Math.floor(Math.random() * 6) +
      1 +
      Math.floor(Math.random() * 6) +
      1) *
    5;
  const rollEduSize = () =>
    (Math.floor(Math.random() * 6) +
      1 +
      Math.floor(Math.random() * 6) +
      1 +
      6) *
    5;

  const newStats = {
    FOR: rollSimple(),
    CON: rollSimple(),
    DEX: rollSimple(),
    APP: rollSimple(),
    POU: rollSimple(),
    TAI: rollEduSize(),
    INT: rollEduSize(),
    EDU: rollEduSize(),
  };

  set(investigatorDataAtom, (prev) => {
    const mergedChars = { ...prev.characteristics, ...newStats };
    const str = mergedChars.FOR;
    const con = mergedChars.CON;
    const siz = mergedChars.TAI;
    const dex = mergedChars.DEX;
    const pow = mergedChars.POU;

    const hpMax = Math.floor((con + siz) / 10);
    const mpMax = Math.floor(pow / 5);
    const sanityInitial = pow;
    const luck = rollSimple();

    let mov = 8;
    if (dex < siz && str < siz) mov = 7;
    if (dex > siz && str > siz) mov = 9;

    const updatedSkills = prev.skills.map((s) => {
      if (s.type === "standard" && s.key === "dodge")
        return { ...s, current: Math.floor(dex / 2) };
      if (s.type === "standard" && s.key === "mother_tongue")
        return { ...s, current: mergedChars.EDU };
      return s;
    });

    const cthulhuSkill = updatedSkills.find(
      (s) => s.type === "standard" && s.key === "cthulhu",
    );
    const sanityMax =
      cthulhuSkill && cthulhuSkill.type === "standard"
        ? 99 - (Number(cthulhuSkill.current) || 0)
        : 99;

    return {
      ...prev,
      characteristics: { ...mergedChars, MVT: mov },
      skills: updatedSkills,
      trackers: {
        ...prev.trackers,
        hpMax,
        mpMax,
        sanityInitial,
        sanityMax,
        luck,
        sanity: pow,
        hp: hpMax,
        mp: mpMax,
        majorWound: false,
        tempInsane: false,
        indefInsane: false,
      },
    };
  });
});

// Individual field update atoms
export const updateIdentityAtom = atom(
  null,
  (
    _get,
    set,
    {
      field,
      value,
    }: { field: keyof InvestigatorData["identity"]; value: string },
  ) => {
    set(investigatorDataAtom, (prev) => ({
      ...prev,
      identity: { ...prev.identity, [field]: value },
    }));
  },
);

export const updateCharacteristicAtom = atom(
  null,
  (_get, set, { stat, value }: { stat: string; value: number }) => {
    set(investigatorDataAtom, (prev) => {
      const newChars = {
        ...prev.characteristics,
        [stat]: value,
      } as InvestigatorData["characteristics"];

      const str = newChars.FOR || 0;
      const con = newChars.CON || 0;
      const siz = newChars.TAI || 0;
      const dex = newChars.DEX || 0;
      const pow = newChars.POU || 0;
      const edu = newChars.EDU || 0;

      const hpMax = Math.floor((con + siz) / 10);
      const mpMax = Math.floor(pow / 5);
      const sanityInitial = pow;

      let mov = 8;
      if (dex < siz && str < siz) mov = 7;
      if (dex > siz && str > siz) mov = 9;

      let updatedSkills = prev.skills;
      if (stat === "DEX") {
        updatedSkills = updatedSkills.map((s) =>
          s.type === "standard" && s.key === "dodge"
            ? { ...s, current: Math.floor(dex / 2) }
            : s,
        );
      } else if (stat === "EDU") {
        updatedSkills = updatedSkills.map((s) =>
          s.type === "standard" && s.key === "mother_tongue"
            ? { ...s, current: edu }
            : s,
        );
      }

      return {
        ...prev,
        characteristics: { ...newChars, MVT: mov },
        skills: updatedSkills,
        trackers: {
          ...prev.trackers,
          hpMax,
          mpMax,
          sanityInitial,
        },
      };
    });
  },
);

export const updateSkillAtom = atom(
  null,
  (
    _get,
    set,
    { index, updates }: { index: number; updates: Partial<Skill> },
  ) => {
    set(investigatorDataAtom, (prev) => {
      const newSkills = [...prev.skills];
      newSkills[index] = { ...newSkills[index], ...updates } as Skill;

      const cthulhuSkill = newSkills.find(
        (s) => s.type === "standard" && s.key === "cthulhu",
      );
      const sanityMax =
        cthulhuSkill && cthulhuSkill.type === "standard"
          ? 99 - (Number(cthulhuSkill.current) || 0)
          : prev.trackers.sanityMax;

      return {
        ...prev,
        skills: newSkills,
        trackers: { ...prev.trackers, sanityMax },
      };
    });
  },
);

export const updateTrackerAtom = atom(
  null,
  (
    _get,
    set,
    {
      field,
      value,
    }: { field: keyof InvestigatorData["trackers"]; value: number | boolean },
  ) => {
    if (field === "sanityMax") return;
    set(investigatorDataAtom, (prev) => ({
      ...prev,
      trackers: { ...prev.trackers, [field]: value },
    }));
  },
);

export const updateBackstoryAtom = atom(
  null,
  (
    _get,
    set,
    {
      field,
      value,
    }: { field: keyof InvestigatorData["backstory"]; value: string },
  ) => {
    set(investigatorDataAtom, (prev) => ({
      ...prev,
      backstory: { ...prev.backstory, [field]: value },
    }));
  },
);

export const updateWeaponAtom = atom(
  null,
  (
    _get,
    set,
    {
      index,
      field,
      value,
    }: { index: number; field: keyof Weapon; value: string },
  ) => {
    set(investigatorDataAtom, (prev) => {
      const newWeapons = [...prev.weapons];
      newWeapons[index] = { ...newWeapons[index], [field]: value };
      return { ...prev, weapons: newWeapons };
    });
  },
);

export const updateWealthAtom = atom(
  null,
  (
    _get,
    set,
    {
      field,
      value,
    }: { field: keyof InvestigatorData["wealth"]; value: string },
  ) => {
    set(investigatorDataAtom, (prev) => ({
      ...prev,
      wealth: { ...prev.wealth, [field]: value },
    }));
  },
);

export const updateGearAtom = atom(null, (_get, set, value: string) => {
  set(investigatorDataAtom, (prev) => ({ ...prev, gear: value }));
});

export const updateNotesAtom = atom(null, (_get, set, value: string) => {
  set(investigatorDataAtom, (prev) => ({ ...prev, notes: value }));
});

export const updateFellowInvestigatorAtom = atom(
  null,
  (
    _get,
    set,
    {
      index,
      field,
      value,
    }: { index: number; field: "name" | "player"; value: string },
  ) => {
    set(investigatorDataAtom, (prev) => {
      const newFellows = [...prev.fellowInvestigators];
      newFellows[index] = { ...newFellows[index], [field]: value };
      return { ...prev, fellowInvestigators: newFellows };
    });
  },
);

export const updatePhotoAtom = atom(null, (_get, set, photo: string) => {
  set(investigatorDataAtom, (prev) => ({ ...prev, photo }));
});
