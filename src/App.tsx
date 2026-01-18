import "./App.css";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useInvestigator } from "./hooks/useInvestigator";
import { Tracker } from "./components/ui/Tracker";
import Sidebar from "./components/layout/Sidebar";
import SkillsSection from "./components/investigator/SkillsSection";
import WeaponTable from "./components/investigator/WeaponTable";
import IdentitySection from "./components/investigator/IdentitySection";
import CharacteristicsSection from "./components/investigator/CharacteristicsSection";
import CombatSection from "./components/investigator/CombatSection";
import BackstorySection from "./components/investigator/BackstorySection";
import GearSection from "./components/investigator/GearSection";
import WealthSection from "./components/investigator/WealthSection";
import FellowInvestigatorsSection from "./components/investigator/FellowInvestigatorsSection";
import NotesSection from "./components/investigator/NotesSection";
import AideMemoireSection from "./components/investigator/AideMemoireSection";

function App() {
  const {
    data,
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
  } = useInvestigator();

  const { t } = useTranslation();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    saveData();
    toast.success("Investigator data saved!");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          importData(json);
          toast.success("Investigator data imported!");
        } catch (error) {
          toast.error("Failed to parse JSON file");
          console.error(error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="app-container">
      <Toaster position="bottom-right" />
      <Sidebar
        onRoll={rollInvestigator}
        onPrint={handlePrint}
        onSave={handleSave}
        onReset={resetData}
        onExport={exportData}
        onImport={handleImport}
      />

      {/* PAGE 1 */}
      <div className="page" id="page1">
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
              />
            </label>
          </div>
        </div>

        <div className="trackers-section">
          <Tracker
            title={t("hp")}
            start={-2}
            end={20}
            columns={5}
            currentValue={data.trackers.hp}
            onSelect={(val) => setTracker("hp", val)}
            extra={
              <div className="tracker-extra align-left">
                <div className="tracker-row-top">
                  {t("max")}{" "}
                  <span className="small-stat-box">{data.trackers.hpMax}</span>
                </div>
                <div className="major-wound-box">
                  {t("major-wound")}
                  <div
                    className={`tracker-check ${data.trackers.majorWound ? "checked" : ""}`}
                    onClick={() =>
                      setTracker("majorWound", !data.trackers.majorWound)
                    }
                  />
                </div>
              </div>
            }
          />
          <Tracker
            title={t("mp")}
            start={0}
            end={25}
            columns={5}
            currentValue={data.trackers.mp}
            onSelect={(val) => setTracker("mp", val)}
            extra={
              <div className="tracker-extra align-left">
                <div className="tracker-row-top">
                  {t("max")}{" "}
                  <span className="small-stat-box">{data.trackers.mpMax}</span>
                </div>
              </div>
            }
          />
          <Tracker
            title={t("san")}
            start={0}
            end={99}
            columns={10}
            currentValue={data.trackers.sanity}
            onSelect={(val) => setTracker("sanity", val)}
            extra={
              <div className="tracker-extra">
                <div className="tracker-row-top">
                  {t("initial")}{" "}
                  <span className="small-stat-box">
                    {data.trackers.sanityInitial}
                  </span>
                  <span
                    style={{
                      marginLeft: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      {t("temp")}
                      <div
                        className={`tracker-check ${data.trackers.tempInsane ? "checked" : ""}`}
                        onClick={() =>
                          setTracker("tempInsane", !data.trackers.tempInsane)
                        }
                      />
                    </span>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      {t("persist")}
                      <div
                        className={`tracker-check ${data.trackers.indefInsane ? "checked" : ""}`}
                        onClick={() =>
                          setTracker("indefInsane", !data.trackers.indefInsane)
                        }
                      />
                    </span>
                  </span>
                </div>
              </div>
            }
          />
          <Tracker
            title={t("luck")}
            start={0}
            end={99}
            columns={10}
            currentValue={data.trackers.luck}
            onSelect={(val) => setTracker("luck", val)}
          />
        </div>

        <SkillsSection
          skills={data.skills}
          onSkillChange={(idx, field, val) => setSkill(idx, { [field]: val })}
        />

        <div className="section-box combat-weapons-box">
          <WeaponTable />
          <div className="vertical-separator" />
          <CombatSection
            db={derivedCombat.db || "0"}
            build={derivedCombat.build || 0}
            dodge={data.skills.find((s) => s.key === "dodge")?.current || 0}
          />
        </div>
      </div>

      {/* PAGE 2 */}
      <div className="page" id="page2">
        <BackstorySection
          backstory={data.backstory}
          onValueChange={setBackstory}
        />

        <div className="section-box gear-wealth-row">
          <GearSection gear={data.gear} onValueChange={setGear} />
          <WealthSection wealth={data.wealth} onValueChange={setWealth} />
        </div>

        <div className="row friends-notes-row">
          <div className="friends-column">
            <FellowInvestigatorsSection
              fellows={data.fellowInvestigators}
              onValueChange={setFellowInvestigator}
            />
          </div>
          <div className="notes-column">
            <NotesSection notes={data.notes} onValueChange={setNotes} />
          </div>
        </div>

        <AideMemoireSection />
      </div>
    </div>
  );
}

export default App;
