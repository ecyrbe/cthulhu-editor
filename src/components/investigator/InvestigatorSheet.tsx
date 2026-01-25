import React from "react";
import { useInvestigatorContext } from "../../hooks/useInvestigatorContext";
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
  const {
    data,
    setIdentity,
    setCharacteristic,
    setSkill,
    setTracker,
    setBackstory,
    setWeapon,
    setWealth,
    setGear,
    setNotes,
    setFellowInvestigator,
    handlePhotoUpload,
    derivedCombat,
    zoom,
  } = useInvestigatorContext();

  return (
    <main className="pages-wrapper" style={{ zoom }}>
      {/* PAGE 1 */}
      <div className="page" id="page1">
        <div className="page-box">
          <HeaderSection
            data={data}
            setIdentity={setIdentity}
            setCharacteristic={setCharacteristic}
            handlePhotoUpload={handlePhotoUpload}
          />

          <TrackersSection data={data} setTracker={setTracker} />

          <SkillsSection
            skills={data.skills}
            onSkillChange={(idx, field, val) => setSkill(idx, { [field]: val })}
          />

          <div className="section-box combat-weapons-box">
            <WeaponTable weapons={data.weapons} onWeaponChange={setWeapon} />
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
            onValueChange={setBackstory}
          />

          <div className="section-box gear-wealth-row">
            <GearSection gear={data.gear} onValueChange={setGear} />
            <div className="vertical-separator" />
            <WealthSection wealth={data.wealth} onValueChange={setWealth} />
          </div>

          <div className="section-box row friends-notes-row">
            <div className="friends-column">
              <FellowInvestigatorsSection
                fellows={data.fellowInvestigators}
                onValueChange={setFellowInvestigator}
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
