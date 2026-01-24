import "./App.css";
import React, { useCallback } from "react";
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
import ZoomControls from "./components/layout/ZoomControls";
import arrowUpIcon from "./assets/arrow-up.svg";

function App() {
  const { t } = useTranslation();
  const [zoom, setZoom] = React.useState(1);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleZoomIn = useCallback(
    () => setZoom((prev) => Math.min(prev + 0.1, 2)),
    [],
  );
  const handleZoomOut = useCallback(
    () => setZoom((prev) => Math.max(prev - 0.1, 0.2)),
    [],
  );
  const handleResetZoom = useCallback(() => setZoom(1), []);

  const handleFitWidth = useCallback(() => {
    const measure = document.createElement("div");
    measure.style.width = "210mm";
    measure.style.visibility = "hidden";
    measure.style.position = "absolute";
    document.body.appendChild(measure);
    const mmWidthPx = measure.offsetWidth;
    document.body.removeChild(measure);

    const availableWidth = window.innerWidth - 80;
    setZoom(availableWidth / mmWidthPx);
  }, []);

  const handleFitHeight = useCallback(() => {
    const measure = document.createElement("div");
    measure.style.height = "297mm";
    measure.style.visibility = "hidden";
    measure.style.position = "absolute";
    document.body.appendChild(measure);
    const mmHeightPx = measure.offsetHeight;
    document.body.removeChild(measure);

    const availableHeight = window.innerHeight - 40;
    setZoom(availableHeight / mmHeightPx);
  }, []);

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

  const handlePhotoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhoto(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [setPhoto],
  );

  const handleSave = useCallback(() => {
    saveData();
    toast.success(t("toast_save_success"));
  }, [saveData, t]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleImport = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const json = JSON.parse(event.target?.result as string);
            importData(json);
            toast.success(t("toast_import_success"));
          } catch (error) {
            toast.error(t("toast_import_error"));
            console.error(error);
          }
        };
        reader.readAsText(file);
      }
    },
    [importData, t],
  );

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

      <ZoomControls
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitWidth={handleFitWidth}
        onFitHeight={handleFitHeight}
        onResetZoom={handleResetZoom}
      />

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
                            setTracker(
                              "indefInsane",
                              !data.trackers.indefInsane,
                            )
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
                          onChange={(e) =>
                            setTracker(
                              "sanityMax",
                              parseInt(e.target.value) || 0,
                            )
                          }
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
              onSkillChange={(idx, field, val) =>
                setSkill(idx, { [field]: val })
              }
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

        {showScrollTop && (
          <button
            className="scroll-to-top desktop-only"
            onClick={scrollToTop}
            title={t("go_to_top")}
            aria-label={t("go_to_top")}
          >
            <img src={arrowUpIcon} aria-hidden="true" width="24" height="24" />
          </button>
        )}
      </main>
    </div>
  );
}

export default App;
