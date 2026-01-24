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
            {row.map((stat) => {
              const label = t(stat.toLowerCase());
              return (
                <div key={stat} className="stat-container">
                  <span className="stat-label">{label}</span>
                  {stat === "MVT" ? (
                    <div className="mvt-box">
                      <input
                        type="number"
                        value={characteristics.MVT || ""}
                        onChange={(e) =>
                          onValueChange("MVT", parseInt(e.target.value) || 0)
                        }
                        aria-label={label}
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
                      ariaLabel={label}
                    />
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CharacteristicsSection;
