import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useInvestigatorContext } from "../../hooks/useInvestigatorContext";
import diceIcon from "../../assets/dice-six.svg";
import saveIcon from "../../assets/floppy-disk.svg";
import printIcon from "../../assets/printing-page.svg";
import exportIcon from "../../assets/floppy-disk-arrow-out.svg";
import importIcon from "../../assets/floppy-disk-arrow-in.svg";
import resetIcon from "../../assets/erase.svg";

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
  const { printBlankValues, setPrintBlankValues } = useInvestigatorContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "pt", label: "Português", flag: "🇵🇹" },
  ];

  const currentLang =
    languages.find(
      (l) => l.code === (i18n.resolvedLanguage || i18n.language),
    ) || languages[0];

  return (
    <nav className="sidebar-nav" aria-label={t("menu")}>
      <button
        id="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title={t("menu")}
        aria-label={t("menu")}
        aria-expanded={isOpen}
      >
        {isOpen ? "✕" : "☰"}
      </button>
      <div id="menu-panel" className={isOpen ? "open" : ""}>
        <div id="lang-label" className="menu-label">
          {t("language")}
        </div>
        <div className="lang-selector-wrapper">
          <button
            className="lang-current-btn"
            onClick={() => setIsLangOpen(!isLangOpen)}
            aria-expanded={isLangOpen}
            aria-haspopup="listbox"
            aria-labelledby="lang-label"
          >
            <span className="lang-flag" aria-hidden="true">
              {currentLang.flag}
            </span>
            <span className="lang-label-text">{currentLang.label}</span>
          </button>
          {isLangOpen && (
            <div className="lang-dropdown" role="listbox">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-option ${currentLang.code === lang.code ? "active" : ""}`}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setIsLangOpen(false);
                  }}
                  role="option"
                  aria-selected={currentLang.code === lang.code}
                >
                  <span className="flag" aria-hidden="true">
                    {lang.flag}
                  </span>
                  <span className="label">{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="menu-label">Actions</div>
        <button className="menu-btn" onClick={onRoll}>
          <img
            src={diceIcon}
            aria-hidden="true"
            width="18"
            height="18"
            className="btn-icon"
          />{" "}
          <span className="btn-text">{t("roll")}</span>
        </button>
        <button className="menu-btn" onClick={onSave}>
          <img
            src={saveIcon}
            aria-hidden="true"
            width="18"
            height="18"
            className="btn-icon"
          />{" "}
          <span className="btn-text">{t("save")}</span>
        </button>
        <button className="menu-btn print-btn" onClick={onPrint}>
          <img
            src={printIcon}
            aria-hidden="true"
            width="18"
            height="18"
            className="btn-icon"
          />{" "}
          <span className="btn-text">{t("print")}</span>
        </button>

        <div className="menu-checkbox-wrapper">
          <label className="menu-checkbox-label">
            <input
              type="checkbox"
              checked={printBlankValues}
              onChange={(e) => setPrintBlankValues(e.target.checked)}
            />
            <span className="checkbox-text">{t("print_blank")}</span>
          </label>
        </div>

        <div className="menu-label">Data</div>
        <button className="menu-btn" onClick={onExport}>
          <img
            src={exportIcon}
            aria-hidden="true"
            width="18"
            height="18"
            className="btn-icon"
          />{" "}
          <span className="btn-text">{t("export")}</span>
        </button>
        <button
          className="menu-btn"
          onClick={() => fileInputRef.current?.click()}
        >
          <img
            src={importIcon}
            aria-hidden="true"
            width="18"
            height="18"
            className="btn-icon"
          />{" "}
          <span className="btn-text">{t("import")}</span>
          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            onChange={onImport}
            style={{ display: "none" }}
          />
        </button>
        <button className="menu-btn reset-btn" onClick={onReset}>
          <img
            src={resetIcon}
            aria-hidden="true"
            width="18"
            height="18"
            className="btn-icon"
          />{" "}
          <span className="btn-text">{t("reset")}</span>
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
