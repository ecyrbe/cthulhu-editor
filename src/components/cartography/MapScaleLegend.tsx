import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import L from "leaflet";

type MapScaleLegendProps = {
  map: L.Map | null;
  maxWidthPx?: number;
};

const formatDistance = (meters: number) => {
  if (meters >= 1000) {
    const kilometers = meters / 1000;
    const display =
      kilometers >= 10 ? Math.round(kilometers) : Number(kilometers.toFixed(1));
    return `${display} km`;
  }

  return `${Math.round(meters)} m`;
};

const getRoundedMeters = (meters: number) => {
  if (!Number.isFinite(meters) || meters <= 0) return 0;

  const precision =
    meters >= 100000
      ? 5000
      : meters >= 10000
        ? 1000
        : meters >= 1000
          ? 100
          : meters >= 100
            ? 10
            : 1;

  return Math.round(meters / precision) * precision;
};

const MapScaleLegend: React.FC<MapScaleLegendProps> = ({
  map,
  maxWidthPx = 160,
}) => {
  const { t } = useTranslation();
  const [scaleMeters, setScaleMeters] = useState(0);
  const [scaleWidthPx, setScaleWidthPx] = useState(0);

  useEffect(() => {
    if (!map) return;

    const updateScale = () => {
      const size = map.getSize();
      if (!size?.x || !size?.y) return;

      const y = size.y / 2;
      const from = map.containerPointToLatLng([0, y]);
      const to = map.containerPointToLatLng([maxWidthPx, y]);
      const measuredMeters = map.distance(from, to);
      const roundedMeters = getRoundedMeters(measuredMeters);

      if (!roundedMeters || !measuredMeters) return;

      setScaleMeters(roundedMeters);
      setScaleWidthPx(maxWidthPx);
    };

    updateScale();
    map.on("zoom moveend resize", updateScale);

    return () => {
      map.off("zoom moveend resize", updateScale);
    };
  }, [map, maxWidthPx]);

  const halfMeters = useMemo(() => scaleMeters / 2, [scaleMeters]);

  if (!scaleMeters || !scaleWidthPx) return null;

  return (
    <div className="map-scale-widget" aria-hidden="true">
      <div className="map-scale-title">{t("cartography_scale", "Scale")}</div>

      <div className="map-scale-ruler" style={{ width: `${scaleWidthPx}px` }}>
        <span
          className="map-scale-tick map-scale-tick-major"
          style={{ left: "0%" }}
        />
        <span className="map-scale-tick" style={{ left: "25%" }} />
        <span
          className="map-scale-tick map-scale-tick-major"
          style={{ left: "50%" }}
        />
        <span className="map-scale-tick" style={{ left: "75%" }} />
        <span
          className="map-scale-tick map-scale-tick-major"
          style={{ left: "100%" }}
        />
      </div>

      <div className="map-scale-labels" style={{ width: `${scaleWidthPx}px` }}>
        <span>0</span>
        <span>{formatDistance(halfMeters)}</span>
        <span>{formatDistance(scaleMeters)}</span>
      </div>
    </div>
  );
};

export default MapScaleLegend;
