import React from "react";
import { useTranslation } from "react-i18next";
import { CharacteristicField } from "../ui/CharacteristicField";
import { SectionTitle } from "../ui/SectionTitle";
import type { InvestigatorData } from "../../types";
import { getCharacteristicTranslationKey } from "../../utils/characteristics";

interface CharacteristicsSectionProps {
  characteristics: InvestigatorData["characteristics"];
  onValueChange: (stat: string, value: number) => void;
}

const CHARACTERISTICS_ROWS = [
  ["FOR", "DEX", "POU"],
  ["CON", "APP", "EDU"],
  ["TAI", "INT", "MVT"],
];

const CharacteristicsSection: React.FC<CharacteristicsSectionProps> = ({
  characteristics,
  onValueChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="header-col mid">
      <SectionTitle>{t("characteristics")}</SectionTitle>
      <div className="stats-grid">
        {CHARACTERISTICS_ROWS.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((stat) => (
              <CharacteristicField
                key={stat}
                label={t(getCharacteristicTranslationKey(stat))}
                value={
                  characteristics[
                    stat as keyof InvestigatorData["characteristics"]
                  ]
                }
                onChange={(val) => onValueChange(stat, val)}
                isMvt={stat === "MVT"}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CharacteristicsSection;
