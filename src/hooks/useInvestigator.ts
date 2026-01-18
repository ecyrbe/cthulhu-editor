import { useState, useCallback, useMemo } from "react";
import type { InvestigatorData, Skill } from "../types";
import { initialSkillsData } from "../constants/skills";

const STORAGE_KEY = "cthulhu-investigator-data";

const getInitialData = (): InvestigatorData => ({
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
    majorWound: false,
    tempInsane: false,
    indefInsane: false,
  },
  skills: [
    ...initialSkillsData.map((s) => ({
      ...s,
      current: typeof s.base === "number" ? s.base : 0,
      checked: false,
    })),
    ...Array(11)
      .fill(null)
      .map((_, i) => ({
        isCustom: true,
        base: 0,
        current: 0,
        checked: false,
        id: `custom-${i}`,
      })),
  ],
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
  gear: "",
  wealth: {
    spendingLevel: "",
    cash: "",
    assets: "",
  },
  fellowInvestigators: Array(6).fill({ name: "", player: "" }),
  notes: "",
});

export function useInvestigator() {
  const [data, setData] = useState<InvestigatorData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Recalculate reactive skills on load
        const dex = parsed.characteristics?.DEX || 0;
        const edu = parsed.characteristics?.EDU || 0;
        if (parsed.skills) {
          parsed.skills = parsed.skills.map((s: Skill) => {
            if (s.key === "dodge")
              return { ...s, current: Math.floor(dex / 2) };
            if (s.key === "mother_tongue") return { ...s, current: edu };
            return s;
          });
        }
        return parsed;
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }
    return getInitialData();
  });

  const saveData = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const setIdentity = useCallback(
    (field: keyof InvestigatorData["identity"], value: string) => {
      setData((prev) => ({
        ...prev,
        identity: { ...prev.identity, [field]: value },
      }));
    },
    [],
  );

  const setCharacteristic = useCallback((stat: string, value: number) => {
    setData((prev) => {
      const newChars = { ...prev.characteristics, [stat]: value };

      // Calculate derived stats
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

      // Update reactive skills
      let updatedSkills = prev.skills;
      if (stat === "DEX") {
        updatedSkills = updatedSkills.map((s) =>
          s.key === "dodge" ? { ...s, current: Math.floor(dex / 2) } : s,
        );
      } else if (stat === "EDU") {
        updatedSkills = updatedSkills.map((s) =>
          s.key === "mother_tongue" ? { ...s, current: edu } : s,
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
  }, []);

  const setSkill = useCallback((index: number, updates: Partial<Skill>) => {
    setData((prev) => {
      const newSkills = [...prev.skills];
      newSkills[index] = { ...newSkills[index], ...updates };
      return { ...prev, skills: newSkills };
    });
  }, []);

  const setTracker = useCallback(
    (field: keyof InvestigatorData["trackers"], value: number | boolean) => {
      setData((prev) => ({
        ...prev,
        trackers: { ...prev.trackers, [field]: value },
      }));
    },
    [],
  );

  const setBackstory = useCallback(
    (field: keyof InvestigatorData["backstory"], value: string) => {
      setData((prev) => ({
        ...prev,
        backstory: { ...prev.backstory, [field]: value },
      }));
    },
    [],
  );

  const setWealth = useCallback(
    (field: keyof InvestigatorData["wealth"], value: string) => {
      setData((prev) => ({
        ...prev,
        wealth: { ...prev.wealth, [field]: value },
      }));
    },
    [],
  );

  const setGear = useCallback((value: string) => {
    setData((prev) => ({ ...prev, gear: value }));
  }, []);

  const setNotes = useCallback((value: string) => {
    setData((prev) => ({ ...prev, notes: value }));
  }, []);

  const setFellowInvestigator = useCallback(
    (index: number, field: "name" | "player", value: string) => {
      setData((prev) => {
        const newFellows = [...prev.fellowInvestigators];
        newFellows[index] = { ...newFellows[index], [field]: value };
        return { ...prev, fellowInvestigators: newFellows };
      });
    },
    [],
  );

  const setPhoto = useCallback((photo: string) => {
    setData((prev) => ({ ...prev, photo }));
  }, []);

  const resetData = useCallback(() => {
    if (window.confirm("Are you sure you want to reset all data?")) {
      setData(getInitialData());
    }
  }, []);

  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `investigator-${data.identity.name || "unnamed"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const importData = useCallback((newData: InvestigatorData) => {
    setData(newData);
  }, []);

  const rollInvestigator = useCallback(() => {
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

    setData((prev) => {
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

      return {
        ...prev,
        characteristics: { ...mergedChars, MVT: mov },
        skills: prev.skills.map((s) => {
          if (s.key === "dodge") return { ...s, current: Math.floor(dex / 2) };
          if (s.key === "mother_tongue")
            return { ...s, current: mergedChars.EDU };
          return s;
        }),
        trackers: {
          ...prev.trackers,
          hpMax,
          mpMax,
          sanityInitial,
          luck,
          sanity: pow, // Initial sanity is often POW
          hp: hpMax,
          mp: mpMax,
          majorWound: false,
          tempInsane: false,
          indefInsane: false,
        },
      };
    });
  }, []);

  const derivedCombat = useMemo(() => {
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
  }, [data.characteristics.FOR, data.characteristics.TAI]);

  return {
    data,
    setData,
    saveData,
    setIdentity,
    setCharacteristic,
    setSkill,
    setTracker,
    setBackstory,
    setWealth,
    setGear,
    setNotes,
    setFellowInvestigator,
    setPhoto,
    resetData,
    exportData,
    importData,
    rollInvestigator,
    derivedCombat,
  };
}
