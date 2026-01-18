import React from "react";
import { useLanguage } from "../LanguageContext";
import type { InvestigatorData } from "../../types";
import { DottedInput } from "../ui/DottedInput";

interface BackstorySectionProps {
  backstory: InvestigatorData["backstory"];
  onValueChange: (
    key: keyof InvestigatorData["backstory"],
    value: string,
  ) => void;
}

const BackstorySection: React.FC<BackstorySectionProps> = ({
  backstory,
  onValueChange,
}) => {
  const { t } = useLanguage();

  const col1 = [
    { key: "personalDescription", label: "description" },
    { key: "ideologyBeliefs", label: "ideology" },
    { key: "significantPeople", label: "people" },
    { key: "meaningfulLocations", label: "locations" },
    { key: "treasuredPossessions", label: "possessions" },
  ] as const;

  const col2 = [
    { key: "traits", label: "traits" },
    { key: "injuriesScars", label: "injuries" },
    { key: "phobiasManias", label: "phobias" },
    { key: "arcaneTomesSpells", label: "tomes" },
    { key: "strangeEntities", label: "entities" },
  ] as const;

  const renderMultiLine = (
    key: keyof InvestigatorData["backstory"],
    label: string,
    numLines: number = 3,
  ) => {
    const text = backstory[key] || "";
    const lines = text.split("\n");

    const handleLineChange = (index: number, newValue: string) => {
      const newLines = Array.from(
        { length: numLines },
        (_, i) => lines[i] || "",
      );
      newLines[index] = newValue;
      onValueChange(key, newLines.join("\n").replace(/\n+$/, ""));
    };

    return (
      <div key={key} className="backstory-item">
        <DottedInput
          label={t(label)}
          value={lines[0] || ""}
          onChange={(val) => handleLineChange(0, val)}
        />
        {Array.from({ length: numLines - 1 }).map((_, i) => (
          <DottedInput
            key={i + 1}
            value={lines[i + 1] || ""}
            onChange={(val) => handleLineChange(i + 1, val)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="section-box backstory-section h-profil">
      <div className="section-title">{t("profile")}</div>
      <div className="backstory-columns">
        <div className="backstory-col">
          {col1.map(({ key, label }) => renderMultiLine(key, label))}
        </div>
        <div className="backstory-col backstory-col-right">
          {col2.map(({ key, label }) => renderMultiLine(key, label))}
        </div>
      </div>
    </div>
  );
};

export default BackstorySection;
