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
    <aside id="zoom-controls" aria-label={t("zoom_controls")}>
      <button
        className="zoom-btn"
        onClick={onFitWidth}
        title={t("fit_to_width")}
        aria-label={t("fit_to_width")}
      >
        <img src={fitWidthIcon} aria-hidden="true" width="16" height="16" />
      </button>
      <button
        className="zoom-btn"
        onClick={onFitHeight}
        title={t("fit_to_height")}
        aria-label={t("fit_to_height")}
      >
        <img src={fitHeightIcon} aria-hidden="true" width="16" height="16" />
      </button>
      <div className="zoom-indicator">
        <button
          className="zoom-btn"
          onClick={onZoomOut}
          title={t("zoom_out")}
          aria-label={t("zoom_out")}
        >
          -
        </button>
        <button
          className="zoom-text"
          onClick={onResetZoom}
          title={t("reset")}
          aria-label={`${t("reset_zoom")}: ${Math.round(zoom * 100)}%`}
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          className="zoom-btn"
          onClick={onZoomIn}
          title={t("zoom_in")}
          aria-label={t("zoom_in")}
        >
          +
        </button>
      </div>
    </aside>
  );
};

export default ZoomControls;
