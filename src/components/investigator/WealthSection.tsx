import React from "react";
import { useLanguage } from "../LanguageContext";
import type { InvestigatorData } from "../../types";

interface WealthSectionProps {
  wealth: InvestigatorData["wealth"];
  onValueChange: (
    field: keyof InvestigatorData["wealth"],
    value: string,
  ) => void;
}

const WealthSection: React.FC<WealthSectionProps> = ({
  wealth,
  onValueChange,
}) => {
  const { t } = useLanguage();

  const renderMultiField = (
    field: keyof InvestigatorData["wealth"],
    label: string,
    numLines: number,
  ) => {
    const text = wealth[field] || "";
    const lines = text.split("\n");

    const handleLineChange = (index: number, newValue: string) => {
      const newLines = Array.from(
        { length: numLines },
        (_, i) => lines[i] || "",
      );
      newLines[index] = newValue;
      onValueChange(field, newLines.join("\n").replace(/\n+$/, ""));
    };

    return (
      <div className="wealth-item" style={{ marginBottom: "8px" }}>
        <div className="backstory-item-line">
          <div className="backstory-label-box">{label}</div>
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
    <div className="wealth-section-content">
      <div className="section-title">{t("wealth")}</div>
      {renderMultiField("spendingLevel", t("spending"), 2)}
      {renderMultiField("cash", t("cash"), 2)}
      {renderMultiField("assets", t("assets"), 8)}
    </div>
  );
};

export default WealthSection;
