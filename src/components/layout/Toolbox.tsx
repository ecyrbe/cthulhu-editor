import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { printBlankValuesAtom } from "../../store/uiAtoms";

// Icons
import diceIcon from "../../assets/dice-six.svg";
import printIcon from "../../assets/printing-page.svg";
import exportIcon from "../../assets/floppy-disk-arrow-out.svg";
import importIcon from "../../assets/floppy-disk-arrow-in.svg";
import resetIcon from "../../assets/erase.svg";
import fitWidthIcon from "../../assets/fit-width.svg";
import fitHeightIcon from "../../assets/fit-height.svg";

interface ToolboxProps {
  onRoll: () => void;
  onPrint: () => void;
  onReset: () => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitWidth: () => void;
  onFitHeight: () => void;
  onResetZoom: () => void;
}

const Toolbox: React.FC<ToolboxProps> = ({
  onRoll,
  onPrint,
  onReset,
  onExport,
  onImport,
  zoom,
  onZoomIn,
  onZoomOut,
  onFitWidth,
  onFitHeight,
  onResetZoom,
}) => {
  const { t } = useTranslation();
  const [printBlankValues, setPrintBlankValues] = useAtom(printBlankValuesAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Draggable logic
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(() => ({
    x: typeof window !== "undefined" ? window.innerWidth - 180 : 0,
    y: 80,
  }));
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const toolboxRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (window.innerWidth <= 900) return; // Disable dragging on mobile

    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset]);

  const style: React.CSSProperties =
    window.innerWidth > 900
      ? {
          position: "fixed",
          left: `${position.x}px`,
          top: `${position.y}px`,
          zIndex: 1000,
        }
      : {};

  return (
    <aside
      className={`editor-tools-panel ${isDragging ? "dragging" : ""}`}
      style={style}
      ref={toolboxRef}
      aria-label={t("toolbox", "Toolbox")}
    >
      <div className="toolbox-header" onMouseDown={handleMouseDown}>
        {t("toolbox", "Toolbox")}
      </div>
      <div className="tools-container">
        <div className="tools-section section-actions">
          <div className="tools-section-header">{t("actions", "Actions")}</div>
          <div className="tools-grid single-column">
            <button
              className="tool-button tool-button-large primary-action"
              onClick={onRoll}
              title={t("roll")}
            >
              <img src={diceIcon} alt="" width="24" height="24" />
            </button>
          </div>
        </div>

        <div className="tools-section section-file">
          <div className="tools-section-header">{t("file", "File")}</div>
          <div className="tools-grid two-columns">
            <button
              className="tool-button"
              onClick={() => fileInputRef.current?.click()}
              title={t("import")}
            >
              <img src={importIcon} alt="" width="18" height="18" />
              <input
                type="file"
                ref={fileInputRef}
                accept=".json"
                onChange={onImport}
                style={{ display: "none" }}
              />
            </button>
            <button
              className="tool-button"
              onClick={onExport}
              title={t("export")}
            >
              <img src={exportIcon} alt="" width="18" height="18" />
            </button>
            <button
              className="tool-button reset-btn"
              onClick={onReset}
              title={t("reset")}
            >
              <img src={resetIcon} alt="" width="16" height="16" />
            </button>
          </div>
        </div>

        <div className="tools-section section-print">
          <div className="tools-section-header">{t("print", "Print")}</div>
          <div className="tools-grid two-columns">
            <button
              className="tool-button"
              onClick={onPrint}
              title={t("print")}
            >
              <img src={printIcon} alt="" width="18" height="18" />
            </button>
            <button
              className={`tool-button ${!printBlankValues ? "active" : ""}`}
              onClick={() => setPrintBlankValues(false)}
              title={t("print_with_values")}
            >
              <span className="tool-small-text">VAL</span>
            </button>
            <button
              className={`tool-button ${printBlankValues ? "active" : ""}`}
              onClick={() => setPrintBlankValues(true)}
              title={t("print_blank")}
            >
              <span className="tool-small-text">{t("blank", "BLANK")}</span>
            </button>
          </div>
        </div>

        <div className="tools-section section-view">
          <div className="tools-section-header">{t("view", "View")}</div>
          <div className="tools-grid two-columns">
            <button
              className="tool-button"
              onClick={onZoomIn}
              title={t("zoom_in")}
            >
              <span className="tool-text">+</span>
            </button>
            <button
              className="tool-button"
              onClick={onZoomOut}
              title={t("zoom_out")}
            >
              <span className="tool-text">-</span>
            </button>
            <button
              className="tool-button"
              onClick={onFitWidth}
              title={t("fit_to_width")}
            >
              <img src={fitWidthIcon} alt="" width="18" height="18" />
            </button>
            <button
              className="tool-button"
              onClick={onFitHeight}
              title={t("fit_to_height")}
            >
              <img src={fitHeightIcon} alt="" width="18" height="18" />
            </button>
            <button
              className="tool-button"
              onClick={onResetZoom}
              title={t("reset_zoom")}
            >
              <span className="tool-small-text">{Math.round(zoom * 100)}%</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Toolbox;
