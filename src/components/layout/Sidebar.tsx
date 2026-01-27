import React, { useRef } from "react";
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <aside className="editor-toolbox" aria-label={t("toolbox", "Toolbox")}>
      <div className="toolbox-section">
        <Link
          to="/manager"
          className="toolbox-btn home-link"
          title={t("manager", "Manager")}
        >
          <span className="toolbox-icon">←</span>
        </Link>
      </div>

      <div className="toolbox-divider" />

      <div className="toolbox-section">
        <button className="toolbox-btn" onClick={onRoll} title={t("roll")}>
          <img src={diceIcon} alt="" width="20" height="20" />
        </button>
        <button className="toolbox-btn" onClick={onSave} title={t("save")}>
          <img src={saveIcon} alt="" width="20" height="20" />
        </button>
        <button className="toolbox-btn" onClick={onPrint} title={t("print")}>
          <img src={printIcon} alt="" width="20" height="20" />
        </button>
      </div>

      <div className="toolbox-divider" />

      <div className="toolbox-section">
        <button className="toolbox-btn" onClick={onExport} title={t("export")}>
          <img src={exportIcon} alt="" width="20" height="20" />
        </button>
        <button
          className="toolbox-btn"
          onClick={() => fileInputRef.current?.click()}
          title={t("import")}
        >
          <img src={importIcon} alt="" width="20" height="20" />
          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            onChange={onImport}
            style={{ display: "none" }}
          />
        </button>
      </div>

      <div className="toolbox-divider" />

      <div className="toolbox-section">
        <label className="toolbox-checkbox-btn" title={t("print_blank")}>
          <input
            type="checkbox"
            checked={printBlankValues}
            onChange={(e) => setPrintBlankValues(e.target.checked)}
          />
          <span className="checkbox-custom"></span>
        </label>
      </div>

      <div className="toolbox-divider" />

      <div className="toolbox-section">
        <button
          className="toolbox-btn reset-btn"
          onClick={onReset}
          title={t("reset")}
        >
          <img src={resetIcon} alt="" width="20" height="20" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
