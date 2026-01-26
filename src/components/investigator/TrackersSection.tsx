import React from "react";
import { useTranslation } from "react-i18next";
import { Tracker } from "../ui/Tracker";
import { TrackerCheckbox } from "../ui/TrackerCheckbox";
import { TrackerNumber } from "../ui/TrackerNumber";
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
            <TrackerCheckbox
              label={t("major-wound")}
              checked={data.trackers.majorWound}
              onChange={(val) => setTracker("majorWound", val)}
            />
            <TrackerNumber
              label={t("max")}
              value={data.trackers.hpMax}
              onChange={(val) => setTracker("hpMax", val)}
            />
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
            <TrackerNumber
              label={t("max")}
              value={data.trackers.mpMax}
              onChange={(val) => setTracker("mpMax", val)}
            />
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
                <TrackerCheckbox
                  label={t("temp")}
                  checked={data.trackers.tempInsane}
                  onChange={(val) => setTracker("tempInsane", val)}
                />
                <TrackerCheckbox
                  label={t("persist")}
                  checked={data.trackers.indefInsane}
                  onChange={(val) => setTracker("indefInsane", val)}
                />
              </>
            }
            headerRight={
              <>
                <TrackerNumber
                  id="sanityInitial"
                  label={t("initial")}
                  value={data.trackers.sanityInitial}
                  onChange={(val) => setTracker("sanityInitial", val)}
                />
                <TrackerNumber
                  id="sanityMax"
                  label={t("max")}
                  value={data.trackers.sanityMax}
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
  );
};

export default TrackersSection;
