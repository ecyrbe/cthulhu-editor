import React, { useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
  investigatorDataAtom,
  derivedCombatAtom,
  updateIdentityAtom,
  updateCharacteristicAtom,
  updateSkillAtom,
  updateTrackerAtom,
  updateBackstoryAtom,
  updateWeaponAtom,
  updateWealthAtom,
  updateGearAtom,
  updateNotesAtom,
  updateFellowInvestigatorAtom,
  updatePhotoAtom,
} from "../../store/investigatorAtoms";
import { zoomLevelAtom, printBlankValuesAtom } from "../../store/uiAtoms";
import { type InvestigatorData, type Weapon } from "../../types";

import SkillsSection from "./SkillsSection";
import WeaponTable from "./WeaponTable";
import CombatSection from "./CombatSection";
import BackstorySection from "./BackstorySection";
import GearSection from "./GearSection";
import WealthSection from "./WealthSection";
import FellowInvestigatorsSection from "./FellowInvestigatorsSection";
import NotesSection from "./NotesSection";
import AideMemoireSection from "./AideMemoireSection";
import HeaderSection from "./HeaderSection";
import TrackersSection from "./TrackersSection";
import type { StandardSkill } from "../../types";

const InvestigatorSheet: React.FC = () => {
  const data = useAtomValue(investigatorDataAtom);
  const derivedCombat = useAtomValue(derivedCombatAtom);
  const zoom = useAtomValue(zoomLevelAtom);
  const printBlankValues = useAtomValue(printBlankValuesAtom);

  const setIdentity = useSetAtom(updateIdentityAtom);
  const setCharacteristic = useSetAtom(updateCharacteristicAtom);
  const setSkill = useSetAtom(updateSkillAtom);
  const setTracker = useSetAtom(updateTrackerAtom);
  const setBackstory = useSetAtom(updateBackstoryAtom);
  const setWeapon = useSetAtom(updateWeaponAtom);
  const setWealth = useSetAtom(updateWealthAtom);
  const setGear = useSetAtom(updateGearAtom);
  const setNotes = useSetAtom(updateNotesAtom);
  const setFellowInvestigator = useSetAtom(updateFellowInvestigatorAtom);
  const updatePhoto = useSetAtom(updatePhotoAtom);

  const handleIdentityChange = useCallback(
    (field: keyof InvestigatorData["identity"], value: string) =>
      setIdentity({ field, value }),
    [setIdentity],
  );

  const handleCharacteristicChange = useCallback(
    (stat: string, value: number) => setCharacteristic({ stat, value }),
    [setCharacteristic],
  );

  const handleSkillChange = useCallback(
    (idx: number, field: string, val: string | number | boolean) =>
      setSkill({ index: idx, updates: { [field]: val } }),
    [setSkill],
  );

  const handleTrackerChange = useCallback(
    (field: keyof InvestigatorData["trackers"], value: number | boolean) =>
      setTracker({ field, value }),
    [setTracker],
  );

  const handleBackstoryChange = useCallback(
    (field: keyof InvestigatorData["backstory"], value: string) =>
      setBackstory({ field, value }),
    [setBackstory],
  );

  const handleWeaponChange = useCallback(
    (index: number, field: keyof Weapon, value: string) =>
      setWeapon({ index, field, value }),
    [setWeapon],
  );

  const handleWealthChange = useCallback(
    (field: keyof InvestigatorData["wealth"], value: string) =>
      setWealth({ field, value }),
    [setWealth],
  );

  const handleFellowChange = useCallback(
    (index: number, field: "name" | "player", value: string) =>
      setFellowInvestigator({ index, field, value }),
    [setFellowInvestigator],
  );

  const handlePhotoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          updatePhoto(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [updatePhoto],
  );

  return (
    <main
      className={`pages-wrapper investigator-sheet ${printBlankValues ? "print-blank-mode" : ""}`}
      style={
        {
          zoom: zoom as number,
          WebkitZoom: zoom as number,
        } as React.CSSProperties
      }
    >
      {/* PAGE 1 */}
      <div className="page" id="page1">
        <div className="page-box">
          <HeaderSection
            data={data}
            setIdentity={handleIdentityChange}
            setCharacteristic={handleCharacteristicChange}
            handlePhotoUpload={handlePhotoUpload}
          />

          <TrackersSection data={data} setTracker={handleTrackerChange} />

          <SkillsSection
            skills={data.skills}
            onSkillChange={handleSkillChange}
          />

          <div className="section-box combat-weapons-box">
            <WeaponTable
              weapons={data.weapons}
              onWeaponChange={handleWeaponChange}
            />
            <div className="vertical-separator" />
            <CombatSection
              db={derivedCombat.db || "0"}
              build={derivedCombat.build || 0}
              dodge={
                (
                  data.skills.find(
                    (s) => s.type === "standard" && s.key === "dodge",
                  ) as StandardSkill | undefined
                )?.current || 0
              }
            />
          </div>
        </div>
      </div>

      {/* PAGE 2 */}
      <div className="page" id="page2">
        <div className="page-box">
          <BackstorySection
            backstory={data.backstory}
            onValueChange={handleBackstoryChange}
          />

          <div className="section-box gear-wealth-row">
            <GearSection gear={data.gear} onValueChange={setGear} />
            <div className="vertical-separator" />
            <WealthSection
              wealth={data.wealth}
              onValueChange={handleWealthChange}
            />
          </div>

          <div className="section-box row friends-notes-row">
            <div className="friends-column">
              <FellowInvestigatorsSection
                fellows={data.fellowInvestigators}
                onValueChange={handleFellowChange}
              />
            </div>
            <div className="vertical-separator" />
            <div className="notes-column">
              <NotesSection notes={data.notes} onValueChange={setNotes} />
            </div>
          </div>

          <AideMemoireSection />
        </div>
      </div>
    </main>
  );
};

export default InvestigatorSheet;
