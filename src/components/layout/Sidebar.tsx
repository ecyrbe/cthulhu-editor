import React, { useState } from "react";
import { useLanguage } from "../LanguageContext";
import type { Language } from "../../types";

interface SidebarProps {
  onRoll: () => void;
  onPrint: () => void;
  onSave: () => void;
  onReset: () => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onRoll,
  onPrint,
  onSave,
  onReset,
  onExport,
  onImport,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div id="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "☰"}
      </div>
      <div id="menu-panel" className={isOpen ? "open" : ""}>
        <div className="menu-label">Language / Langue</div>
        <select
          id="lang-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>

        <div className="menu-label">Actions</div>
        <button className="menu-btn" onClick={onRoll}>
          🎲 {t("roll")}
        </button>
        <button className="menu-btn" onClick={onSave}>
          💾 {t("save")}
        </button>
        <button className="menu-btn" onClick={onPrint}>
          🖨️ {t("print")}
        </button>

        <div className="menu-label">Data</div>
        <button className="menu-btn" onClick={onExport}>
          📤 {t("export")}
        </button>
        <label className="menu-btn" style={{ cursor: "pointer" }}>
          📥 {t("import")}
          <input
            type="file"
            accept=".json"
            onChange={onImport}
            style={{ display: "none" }}
          />
        </label>
        <button
          className="menu-btn"
          onClick={onReset}
          style={{ marginTop: "20px", color: "#ff4444" }}
        >
          🗑️ {t("reset")}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
