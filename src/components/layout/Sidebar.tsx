import React, { useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
  ];

  const currentLang =
    languages.find(
      (l) => l.code === (i18n.resolvedLanguage || i18n.language),
    ) || languages[0];

  return (
    <>
      <div
        id="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title={t("menu")}
      >
        {isOpen ? "✕" : "☰"}
      </div>
      <div id="menu-panel" className={isOpen ? "open" : ""}>
        <div className="menu-label">Language / Langue</div>
        <div className="lang-selector-wrapper">
          <button
            className="lang-current-btn"
            onClick={() => setIsLangOpen(!isLangOpen)}
          >
            <span className="lang-flag">{currentLang.flag}</span>
            <span className="lang-label-text">{currentLang.label}</span>
          </button>
          {isLangOpen && (
            <div className="lang-dropdown">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className={`lang-option ${currentLang.code === lang.code ? "active" : ""}`}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setIsLangOpen(false);
                  }}
                >
                  <span className="flag">{lang.flag}</span>
                  <span className="label">{lang.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="menu-label">Actions</div>
        <button className="menu-btn" onClick={onRoll}>
          <span className="btn-icon">🎲</span>{" "}
          <span className="btn-text">{t("roll")}</span>
        </button>
        <button className="menu-btn" onClick={onSave}>
          <span className="btn-icon">💾</span>{" "}
          <span className="btn-text">{t("save")}</span>
        </button>
        <button className="menu-btn print-btn" onClick={onPrint}>
          <span className="btn-icon">🖨️</span>{" "}
          <span className="btn-text">{t("print")}</span>
        </button>

        <div className="menu-label">Data</div>
        <button className="menu-btn" onClick={onExport}>
          <span className="btn-icon">📤</span>{" "}
          <span className="btn-text">{t("export")}</span>
        </button>
        <label className="menu-btn" style={{ cursor: "pointer" }}>
          <span className="btn-icon">📥</span>{" "}
          <span className="btn-text">{t("import")}</span>
          <input
            type="file"
            accept=".json"
            onChange={onImport}
            style={{ display: "none" }}
          />
        </label>
        <button className="menu-btn reset-btn" onClick={onReset}>
          <span className="btn-icon">🗑️</span>{" "}
          <span className="btn-text">{t("reset")}</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
