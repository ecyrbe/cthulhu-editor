import React from "react";
import { useTranslation } from "react-i18next";
import { Tracker } from "../ui/Tracker";
import type { InvestigatorData } from "../../types";

interface TrackersSectionProps {
  data: InvestigatorData;
  setTracker: (
    field: keyof InvestigatorData["trackers"],
    value: number | boolean,
  ) => void;
}

const TrackersSection: React.FC<TrackersSectionProps> = ({
  data,
  setTracker,
}) => {
  const { t } = useTranslation();

  return (
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
                <label htmlFor="hpMax">{t("max")}</label>
                <input
                  id="hpMax"
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
                <label htmlFor="mpMax">{t("max")}</label>
                <input
                  id="mpMax"
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
                <label className="tracker-checkbox">
                  {t("temp")}
                  <button
                    className={`tracker-check ${data.trackers.tempInsane ? "checked" : ""}`}
                    onClick={() =>
                      setTracker("tempInsane", !data.trackers.tempInsane)
                    }
                    aria-label={t("temp")}
                    aria-pressed={data.trackers.tempInsane}
                  />
                </label>
                <label className="tracker-checkbox">
                  {t("persist")}
                  <button
                    className={`tracker-check ${data.trackers.indefInsane ? "checked" : ""}`}
                    onClick={() =>
                      setTracker("indefInsane", !data.trackers.indefInsane)
                    }
                    aria-label={t("persist")}
                    aria-pressed={data.trackers.indefInsane}
                  />
                </label>
              </>
            }
            headerRight={
              <>
                <label className="tracker-checkbox">
                  {t("initial")}
                  <input
                    id="sanityInitial"
                    type="number"
                    className="small-stat-box"
                    value={data.trackers.sanityInitial || ""}
                    onChange={(e) =>
                      setTracker("sanityInitial", parseInt(e.target.value) || 0)
                    }
                  />
                </label>
                <label className="tracker-checkbox">
                  {t("max")}
                  <input
                    id="sanityMax"
                    type="number"
                    className="small-stat-box"
                    value={data.trackers.sanityMax || ""}
                    readOnly
                  />
                </label>
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
  );
};

export default TrackersSection;
