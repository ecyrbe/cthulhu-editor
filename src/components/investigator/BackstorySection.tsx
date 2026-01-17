import React from "react";
import { useLanguage } from "../LanguageContext";
import type { InvestigatorData } from "../../types";

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
    numLines: number = 4,
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
        <div className="backstory-item-line">
          <div className="backstory-label-box">{t(label)}</div>
          <input
            className="dotted-line-input"
            value={lines[0] || ""}
            onChange={(e) => handleLineChange(0, e.target.value)}
          />
        </div>
        {Array.from({ length: numLines - 1 }).map((_, i) => (
          <div key={i + 1} className="backstory-item-line">
            <input
              className="dotted-line-input"
              value={lines[i + 1] || ""}
              onChange={(e) => handleLineChange(i + 1, e.target.value)}
            />
          </div>
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
