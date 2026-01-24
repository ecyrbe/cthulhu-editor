import React from "react";
import { useTranslation } from "react-i18next";
import { DottedInput } from "../ui/DottedInput";
import { SectionTitle } from "../ui/SectionTitle";

interface NotesSectionProps {
  notes: string;
  onValueChange: (value: string) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  onValueChange,
}) => {
  const { t } = useTranslation();
  const numLines = 8;
  const lines = (notes || "").split("\n");

  const handleLineChange = (index: number, newValue: string) => {
    const newLines = Array.from({ length: numLines }, (_, i) => lines[i] || "");
    newLines[index] = newValue;
    onValueChange(newLines.join("\n").replace(/\n+$/, ""));
  };

  return (
    <div className="grow">
      <SectionTitle>{t("notes")}</SectionTitle>
      <div
        className="notes-list"
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        {Array.from({ length: numLines }).map((_, i) => (
          <DottedInput
            key={i}
            value={lines[i] || ""}
            onChange={(val) => handleLineChange(i, val)}
            ariaLabel={`${t("notes")} ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NotesSection;
