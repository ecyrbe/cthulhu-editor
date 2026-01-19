import React from "react";
import { useTranslation } from "react-i18next";
import type { InvestigatorData } from "../../types";
import { DottedInput } from "../ui/DottedInput";
import { SectionTitle } from "../ui/SectionTitle";

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
  const { t } = useTranslation();

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
      <div className="wealth-item">
        <DottedInput
          label={label}
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
    <div className="wealth-section-content">
      <SectionTitle>{t("wealth")}</SectionTitle>
      {renderMultiField("spendingLevel", t("spending"), 1)}
      {renderMultiField("cash", t("cash"), 1)}
      {renderMultiField("assets", t("assets"), 5)}
    </div>
  );
};

export default WealthSection;
