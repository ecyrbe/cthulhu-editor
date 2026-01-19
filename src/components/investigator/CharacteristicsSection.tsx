import React from "react";
import { useTranslation } from "react-i18next";
import { StatBox } from "../ui/StatBox";
import { SectionTitle } from "../ui/SectionTitle";
import type { InvestigatorData } from "../../types";

interface CharacteristicsSectionProps {
  characteristics: InvestigatorData["characteristics"];
  onValueChange: (stat: string, value: number) => void;
}

const CharacteristicsSection: React.FC<CharacteristicsSectionProps> = ({
  characteristics,
  onValueChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="header-col mid">
      <SectionTitle>{t("characteristics")}</SectionTitle>
      <div className="stats-grid">
        {[
          ["FOR", "DEX", "POU"],
          ["CON", "APP", "EDU"],
          ["TAI", "INT", "MVT"],
        ].map((row, i) => (
          <React.Fragment key={i}>
            {row.map((stat) => (
              <div key={stat} className="stat-container">
                <span className="stat-label">{t(stat.toLowerCase())}</span>
                {stat === "MVT" ? (
                  <div className="mvt-box">
                    <input
                      type="number"
                      value={characteristics.MVT || ""}
                      onChange={(e) =>
                        onValueChange("MVT", parseInt(e.target.value) || 0)
                      }
                    />
                  </div>
                ) : (
                  <StatBox
                    value={
                      characteristics[
                        stat as keyof InvestigatorData["characteristics"]
                      ]
                    }
                    onChange={(val) => onValueChange(stat, val)}
                  />
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CharacteristicsSection;
