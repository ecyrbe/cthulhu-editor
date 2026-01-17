import React from "react";
import { useLanguage } from "../LanguageContext";

interface NotesSectionProps {
  notes: string;
  onValueChange: (value: string) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  onValueChange,
}) => {
  const { t } = useLanguage();
  const numLines = 15;
  const lines = (notes || "").split("\n");

  const handleLineChange = (index: number, newValue: string) => {
    const newLines = Array.from({ length: numLines }, (_, i) => lines[i] || "");
    newLines[index] = newValue;
    onValueChange(newLines.join("\n").replace(/\n+$/, ""));
  };

  return (
    <div className="section-box grow">
      <div className="section-title">{t("notes")}</div>
      <div
        className="notes-list"
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
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

export default NotesSection;
