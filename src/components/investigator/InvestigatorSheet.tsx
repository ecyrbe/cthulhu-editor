import React from "react";
import { useTranslation } from "react-i18next";
import { useInvestigatorContext } from "../../hooks/useInvestigatorContext";
import IdentitySection from "./IdentitySection";
import CharacteristicsSection from "./CharacteristicsSection";
import SkillsSection from "./SkillsSection";
import WeaponTable from "./WeaponTable";
import CombatSection from "./CombatSection";
import BackstorySection from "./BackstorySection";
import GearSection from "./GearSection";
import WealthSection from "./WealthSection";
import FellowInvestigatorsSection from "./FellowInvestigatorsSection";
import NotesSection from "./NotesSection";
import AideMemoireSection from "./AideMemoireSection";
import { Tracker } from "../ui/Tracker";
import type { StandardSkill } from "../../types";

const InvestigatorSheet: React.FC = () => {
  const { t } = useTranslation();
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
          <div className="header-section">
            <IdentitySection
              identity={data.identity}
              onValueChange={setIdentity}
            />
            <div className="vertical-separator" />

            <CharacteristicsSection
              characteristics={data.characteristics}
              onValueChange={setCharacteristic}
            />
            <div className="vertical-separator" />

            {/* Logo/Photo Column */}
            <div className="header-col right">
              <div className="logo-container">
                <div className="call-of-label">{t("call_of")}</div>
                <div className="cthulhu-label">CTHULHU</div>
              </div>
              <label
                className="photo-box"
                style={{ backgroundImage: `url(${data.photo})` }}
              >
                {!data.photo && t("photo")}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  aria-label={t("photo_upload")}
                />
              </label>
            </div>
          </div>

          <div className="trackers-section">
            <div className="trackers-outer-container">
              <div className="trackers-group-left">
                <Tracker
                  title={t("hp")}
                  start={0}
                  end={20}
                  columns={5}
                  layoutType="offset-zero"
                  currentValue={data.trackers.hp}
                  onSelect={(val) => setTracker("hp", val)}
                >
                  <div className="tracker-extra">
                    <div className="tracker-row-top">
                      {t("major-wound")}
                      <button
                        className={`tracker-check ${data.trackers.majorWound ? "checked" : ""}`}
                        onClick={() =>
                          setTracker("majorWound", !data.trackers.majorWound)
                        }
                        aria-label={t("major-wound")}
                        aria-pressed={data.trackers.majorWound}
                      />
                    </div>
                    <div className="tracker-row-top">
                      {t("max")}{" "}
                      <input
                        type="number"
                        className="small-stat-box"
                        value={data.trackers.hpMax || ""}
                        onChange={(e) =>
                          setTracker("hpMax", parseInt(e.target.value) || 0)
                        }
                      />
                    </div>
                  </div>
                </Tracker>
                <Tracker
                  title={t("mp")}
                  start={0}
                  end={25}
                  columns={6}
                  layoutType="offset-zero"
                  currentValue={data.trackers.mp}
                  onSelect={(val) => setTracker("mp", val)}
                >
                  <div className="tracker-extra">
                    <div className="tracker-row-top">
                      {t("max")}{" "}
                      <input
                        type="number"
                        className="small-stat-box"
                        value={data.trackers.mpMax || ""}
                        onChange={(e) =>
                          setTracker("mpMax", parseInt(e.target.value) || 0)
                        }
                      />
                    </div>
                  </div>
                </Tracker>
              </div>

              <div className="trackers-group-right">
                <Tracker
                  title={t("san")}
                  start={1}
                  end={99}
                  columns={21}
                  layoutType="with-prefix"
                  prefixText={t("insanity")}
                  prefixSpan={6}
                  currentValue={data.trackers.sanity}
                  onSelect={(val) => setTracker("sanity", val)}
                  headerLeft={
                    <>
                      {t("temp")}
                      <button
                        className={`tracker-check ${data.trackers.tempInsane ? "checked" : ""}`}
                        onClick={() =>
                          setTracker("tempInsane", !data.trackers.tempInsane)
                        }
                        aria-label={t("temp")}
                        aria-pressed={data.trackers.tempInsane}
                      />
                      {t("persist")}
                      <button
                        className={`tracker-check ${data.trackers.indefInsane ? "checked" : ""}`}
                        onClick={() =>
                          setTracker("indefInsane", !data.trackers.indefInsane)
                        }
                        aria-label={t("persist")}
                        aria-pressed={data.trackers.indefInsane}
                      />
                    </>
                  }
                  headerRight={
                    <>
                      {t("initial")}
                      <input
                        type="number"
                        className="small-stat-box"
                        value={data.trackers.sanityInitial || ""}
                        onChange={(e) =>
                          setTracker(
                            "sanityInitial",
                            parseInt(e.target.value) || 0,
                          )
                        }
                      />
                      {t("max")}
                      <input
                        type="number"
                        className="small-stat-box"
                        value={data.trackers.sanityMax || ""}
                        readOnly
                      />
                    </>
                  }
                />
                <Tracker
                  title={t("luck")}
                  start={1}
                  end={99}
                  columns={21}
                  layoutType="with-prefix"
                  prefixText={t("bad_luck")}
                  prefixSpan={6}
                  currentValue={data.trackers.luck}
                  onSelect={(val) => setTracker("luck", val)}
                />
              </div>
            </div>
          </div>

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
