import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ThemeToggle from "../components/ui/ThemeToggle";
import LanguageSelector from "../components/layout/LanguageSelector";
import compassRoseVintage from "../assets/compass-rose-vintage.svg";
import "./MapPage.css";

const MapInstanceBinder = ({
  onMapReady,
}: {
  onMapReady: (map: L.Map) => void;
}) => {
  const map = useMap();
  onMapReady(map);
  return null;
};

const MapPage: React.FC = () => {
  const { t } = useTranslation();
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleMapReady = useCallback((map: L.Map) => {
    mapInstanceRef.current = map;
    setMapInstance((current) => current ?? map);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const wrapper = mapWrapperRef.current;
      setIsFullscreen(!!wrapper && document.fullscreenElement === wrapper);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleToggleFullscreen = async () => {
    const wrapper = mapWrapperRef.current;
    if (!wrapper) return;

    try {
      if (document.fullscreenElement === wrapper) {
        await document.exitFullscreen();
      } else if (!document.fullscreenElement) {
        await wrapper.requestFullscreen();
      }
    } catch {
      setSearchMessage(
        t("map_fullscreen_error", "Fullscreen is unavailable in this browser."),
      );
    }
  };

  const handleSearchCity = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();

    if (!query) {
      setSearchMessage("");
      return;
    }

    const activeMap = mapInstanceRef.current ?? mapInstance;

    if (!activeMap) {
      setSearchMessage(
        t(
          "map_search_error",
          "Map is still loading, try once more in a second.",
        ),
      );
      return;
    }

    try {
      setIsSearching(true);
      setSearchMessage("");

      const params = new URLSearchParams({
        q: query,
        format: "jsonv2",
        limit: "1",
      });

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?${params.toString()}`,
        {
          headers: {
            Accept: "application/json",
            "Accept-Language": "en",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const results = (await response.json()) as Array<{
        lat: string;
        lon: string;
        display_name: string;
      }>;

      if (results.length === 0) {
        setSearchMessage(
          t("map_search_not_found", "No city found for this search."),
        );
        return;
      }

      const result = results[0];
      const lat = Number(result.lat);
      const lng = Number(result.lon);

      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        activeMap.flyTo([lat, lng], 12);
      }

      setSearchMessage(result.display_name);
    } catch {
      setSearchMessage(
        t("map_search_error", "Search is currently unavailable."),
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleZoomIn = () => {
    const activeMap = mapInstanceRef.current ?? mapInstance;
    if (activeMap) {
      activeMap.zoomIn();
    }
  };

  const handleZoomOut = () => {
    const activeMap = mapInstanceRef.current ?? mapInstance;
    if (activeMap) {
      activeMap.zoomOut();
    }
  };

  return (
    <div className="map-page-container">
      <div className="map-page">
        <div className="map-sticky-top">
          <header className="map-page-header">
            <div className="breadcrumb">
              <Link to="/">{t("home", "Home")}</Link> /{" "}
              <span>{t("map_title")}</span>
            </div>
            <div className="header-actions">
              <ThemeToggle />
              <LanguageSelector align="right" />
            </div>
          </header>

          <div className="map-header">
            <h1 className="map-title">{t("map_title")}</h1>
          </div>
        </div>

        <main className="map-main">
          <div className="map-wrapper" ref={mapWrapperRef}>
            <div className="map-top-controls">
              <form className="map-overlay-search" onSubmit={handleSearchCity}>
                <div className="map-search-input-wrap">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t(
                      "map_search_placeholder",
                      "Search city (e.g. Arkham, Boston, Paris)",
                    )}
                    aria-label={t(
                      "map_search_placeholder",
                      "Search city (e.g. Arkham, Boston, Paris)",
                    )}
                  />
                  <button
                    className="map-search-icon-btn"
                    type="submit"
                    disabled={isSearching}
                    aria-label={t("map_search_action", "Search")}
                    title={t("map_search_action", "Search")}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="11" cy="11" r="6.5" />
                      <line x1="16" y1="16" x2="21" y2="21" />
                    </svg>
                  </button>
                </div>
              </form>

              {searchMessage && (
                <p className="map-search-message map-overlay-message">
                  {searchMessage}
                </p>
              )}
            </div>

            <div className="map-viewport">
              <MapContainer
                center={[42.5, -71.0]}
                zoom={8}
                className="leaflet-container"
                zoomControl={false}
              >
                <MapInstanceBinder onMapReady={handleMapReady} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </MapContainer>
            </div>

            <div className="map-parchment-frame" aria-hidden="true" />

            <div className="map-compass" aria-hidden="true">
              <img src={compassRoseVintage} alt="" />
            </div>

            <button
              className="map-fullscreen-control"
              type="button"
              onClick={handleToggleFullscreen}
              aria-label={
                isFullscreen
                  ? t("map_exit_fullscreen", "Exit fullscreen")
                  : t("map_fullscreen", "Enter fullscreen")
              }
              title={
                isFullscreen
                  ? t("map_exit_fullscreen", "Exit fullscreen")
                  : t("map_fullscreen", "Enter fullscreen")
              }
            >
              <span aria-hidden="true">⛶</span>
            </button>

            <div
              className="map-zoom-controls"
              aria-label={t("zoom_controls", "Zoom Controls")}
            >
              <button
                className="map-zoom-btn"
                type="button"
                onClick={handleZoomIn}
                aria-label={t("zoom_in", "Zoom In")}
                title={t("zoom_in", "Zoom In")}
              >
                +
              </button>
              <button
                className="map-zoom-btn"
                type="button"
                onClick={handleZoomOut}
                aria-label={t("zoom_out", "Zoom Out")}
                title={t("zoom_out", "Zoom Out")}
              >
                −
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MapPage;
