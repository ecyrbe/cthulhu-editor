import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { printBlankValuesAtom } from "../../store/uiAtoms";

// Icons
import diceIcon from "../../assets/dice-six.svg";
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

const PrinterIcon: React.FC<{ filled?: boolean }> = ({ filled }) => (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.5714 18H20.4C20.7314 18 21 17.7314 21 17.4V11C21 8.79086 19.2091 7 17 7H7C4.79086 7 3 8.79086 3 11V17.4C3 17.7314 3.26863 18 3.6 18H6.42857"
      stroke="currentColor"
      strokeWidth="1.5"
    ></path>
    <path
      d="M8 7V3.6C8 3.26863 8.26863 3 8.6 3H15.4C15.7314 3 16 3.26863 16 3.6V7"
      stroke="currentColor"
      strokeWidth="1.5"
    ></path>
    <path
      d="M6.09782 20.3151L6.42855 18L6.92639 14.5151C6.96862 14.2196 7.22177 14 7.52036 14H16.4796C16.7782 14 17.0313 14.2196 17.0736 14.5151L17.5714 18L17.9021 20.3151C17.9538 20.6766 17.6733 21 17.3082 21H6.69179C6.32666 21 6.04618 20.6766 6.09782 20.3151Z"
      stroke="currentColor"
      strokeWidth="1.5"
    ></path>
    <path
      d="M17 10.01L17.01 9.99889"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

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
  const [, setPrintBlankValues] = useAtom(printBlankValuesAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePrintMode = (isBlank: boolean) => {
    setPrintBlankValues(isBlank);
    // Brief timeout to ensure the blank mode class is applied before the print dialog blocks
    setTimeout(() => {
      onPrint();
    }, 50);
  };

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
        <div className="tools-section section-view">
          <div className="tools-section-header">{t("view", "View")}</div>
          <div className="tools-grid two-columns">
            <div className="zoom-controls-row">
              <button
                className="tool-button"
                onClick={onZoomOut}
                title={t("zoom_out")}
              >
                <span className="tool-text">-</span>
              </button>
              <button
                className="tool-button"
                onClick={onResetZoom}
                title={t("reset_zoom")}
              >
                <span className="tool-small-text">
                  {Math.round(zoom * 100)}%
                </span>
              </button>
              <button
                className="tool-button"
                onClick={onZoomIn}
                title={t("zoom_in")}
              >
                <span className="tool-text">+</span>
              </button>
            </div>
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
          </div>
        </div>

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
              onClick={() => handlePrintMode(false)}
              title={t("print_with_values", "Print with values")}
            >
              <PrinterIcon filled={true} />
            </button>
            <button
              className="tool-button"
              onClick={() => handlePrintMode(true)}
              title={t("print_blank", "Print blank")}
            >
              <PrinterIcon filled={false} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Toolbox;
