import React, { useState } from "react";
import { useLanguage } from "../LanguageContext";
import type { Language } from "../../types";

interface SidebarProps {
  onRoll: () => void;
  onPrint: () => void;
  onSave: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onRoll, onPrint, onSave }) => {
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
          💾 Save
        </button>
        <button className="menu-btn" onClick={onPrint}>
          🖨️ {t("print")}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
