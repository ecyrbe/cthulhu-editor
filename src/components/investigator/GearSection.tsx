import React from "react";
import { useLanguage } from "../LanguageContext";

interface GearSectionProps {
  gear: string;
  onValueChange: (value: string) => void;
}

const GearSection: React.FC<GearSectionProps> = ({ gear, onValueChange }) => {
  const { t } = useLanguage();
  const numLines = 10;
  const lines = (gear || "").split("\n");

  const handleLineChange = (index: number, newValue: string) => {
    const newLines = Array.from({ length: numLines }, (_, i) => lines[i] || "");
    newLines[index] = newValue;
    onValueChange(newLines.join("\n").replace(/\n+$/, ""));
  };

  return (
    <div className="gear-section-content grow">
      <div className="section-title">{t("gear")}</div>
      <div className="gear-list">
        {Array.from({ length: numLines }).map((_, i) => (
          <div key={i} className="backstory-item-line">
            <input
              className="dotted-line-input"
              value={lines[i] || ""}
              onChange={(e) => handleLineChange(i, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GearSection;
