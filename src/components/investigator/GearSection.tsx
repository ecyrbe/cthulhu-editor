import React from "react";
import { useTranslation } from "react-i18next";
import { DottedInput } from "../ui/DottedInput";

interface GearSectionProps {
  gear: string;
  onValueChange: (value: string) => void;
}

const GearSection: React.FC<GearSectionProps> = ({ gear, onValueChange }) => {
  const { t } = useTranslation();
  const numLines = 7;
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
          <DottedInput
            key={i}
            value={lines[i] || ""}
            onChange={(val) => handleLineChange(i, val)}
          />
        ))}
      </div>
    </div>
  );
};

export default GearSection;
