import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAtom } from "jotai";
import { printBlankValuesAtom } from "../../store/uiAtoms";
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
  const { t } = useTranslation();
  const [printBlankValues, setPrintBlankValues] = useAtom(printBlankValuesAtom);
  const [isOpen, setIsOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
        <div className="menu-label">{t("navigation", "Navigation")}</div>

        <Link
          to="/"
          className="menu-btn nav-link"
          onClick={() => setIsOpen(false)}
        >
          {t("home", "Home")}
        </Link>
        <Link
          to="/manager"
          className="menu-btn nav-link"
          onClick={() => setIsOpen(false)}
        >
          {t("manager", "Manager")}
        </Link>

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
