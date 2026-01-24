import React from "react";
import { useTranslation } from "react-i18next";
import fitWidthIcon from "../../assets/fit-width.svg";
import fitHeightIcon from "../../assets/fit-height.svg";

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitWidth: () => void;
  onFitHeight: () => void;
  onResetZoom: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onFitWidth,
  onFitHeight,
  onResetZoom,
}) => {
  const { t } = useTranslation();

  return (
    <div id="zoom-controls">
      <button
        className="zoom-btn"
        onClick={onFitWidth}
        title={t("fit_to_width")}
      >
        <img src={fitWidthIcon} alt="Fit Width" width="16" height="16" />
      </button>
      <button
        className="zoom-btn"
        onClick={onFitHeight}
        title={t("fit_to_height")}
      >
        <img src={fitHeightIcon} alt="Fit Height" width="16" height="16" />
      </button>
      <div className="zoom-indicator">
        <button className="zoom-btn" onClick={onZoomOut} title={t("zoom_out")}>
          -
        </button>
        <span className="zoom-text" onClick={onResetZoom} title={t("reset")}>
          {Math.round(zoom * 100)}%
        </span>
        <button className="zoom-btn" onClick={onZoomIn} title={t("zoom_in")}>
          +
        </button>
      </div>
    </div>
  );
};

export default ZoomControls;
