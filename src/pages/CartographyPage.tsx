import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ThemeToggle from "../components/ui/ThemeToggle";
import LanguageSelector from "../components/layout/LanguageSelector";
import compassRoseVintage from "../assets/compass-rose-vintage.svg";
import "./CartographyPage.css";

const MapInstanceBinder = ({
  onMapReady,
}: {
  onMapReady: (map: L.Map) => void;
}) => {
  const map = useMap();
  onMapReady(map);
  return null;
};

const CartographyPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const hideSearchDelayMs = 2000;
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [searchMessageKind, setSearchMessageKind] = useState<
    "city" | "status" | null
  >(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const mapWrapperRef = useRef<HTMLDivElement | null>(null);
  const hideSearchTimeoutRef = useRef<number | null>(null);

  const cityTitle =
    searchMessageKind === "city"
      ? (searchMessage.split(",")[0]?.trim() ?? "")
      : "";
  const cityDetails =
    searchMessageKind === "city"
      ? searchMessage.split(",").slice(1).join(",").trim()
      : "";

  const handleMapReady = useCallback((map: L.Map) => {
    mapInstanceRef.current = map;
    setMapInstance((current) => current ?? map);
  }, []);

  const clearHideSearchTimeout = useCallback(() => {
    if (hideSearchTimeoutRef.current !== null) {
      window.clearTimeout(hideSearchTimeoutRef.current);
      hideSearchTimeoutRef.current = null;
    }
  }, []);

  const scheduleSearchHide = useCallback(() => {
    clearHideSearchTimeout();
    if (isSearchFocused) return;

    hideSearchTimeoutRef.current = window.setTimeout(() => {
      setIsSearchVisible(false);
    }, hideSearchDelayMs);
  }, [clearHideSearchTimeout, isSearchFocused]);

  const showSearchControls = useCallback(() => {
    setIsSearchVisible(true);
    scheduleSearchHide();
  }, [scheduleSearchHide]);

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

  useEffect(() => {
    if (isSearchFocused) {
      clearHideSearchTimeout();
      setIsSearchVisible(true);
      return;
    }

    scheduleSearchHide();

    return () => {
      clearHideSearchTimeout();
    };
  }, [isSearchFocused, scheduleSearchHide, clearHideSearchTimeout]);

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
        t(
          "cartography_fullscreen_error",
          "Fullscreen is unavailable in this browser.",
        ),
      );
    }
  };

  const handleSearchCity = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();

    if (!query) {
      setSearchMessage("");
      setSearchMessageKind(null);
      return;
    }

    const activeMap = mapInstanceRef.current ?? mapInstance;

    if (!activeMap) {
      setSearchMessage(
        t(
          "cartography_not_ready",
          "Map is still loading, try once more in a second.",
        ),
      );
      setSearchMessageKind("status");
      return;
    }

    try {
      setIsSearching(true);
      setSearchMessage("");
      setSearchMessageKind(null);

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
            "Accept-Language": i18n.resolvedLanguage || i18n.language || "en",
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
          t("cartography_search_not_found", "No city found for this search."),
        );
        setSearchMessageKind("status");
        return;
      }

      const result = results[0];
      const lat = Number(result.lat);
      const lng = Number(result.lon);

      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        activeMap.flyTo([lat, lng], 12);
      }

      setSearchMessage(result.display_name);
      setSearchMessageKind("city");
    } catch {
      setSearchMessage(
        t("cartography_search_error", "Search is currently unavailable."),
      );
      setSearchMessageKind("status");
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
              <span>{t("cartography_breadcrumb", "Cartography")}</span>
            </div>
            <div className="header-actions">
              <ThemeToggle />
              <LanguageSelector align="right" />
            </div>
          </header>

          <div className="map-header">
            <h1 className="map-title">{t("cartography_title")}</h1>
          </div>
        </div>

        <main className="map-main">
          <div
            className="map-wrapper"
            ref={mapWrapperRef}
            onMouseMove={showSearchControls}
          >
            <div
              className={`map-top-controls ${isSearchVisible ? "map-top-controls-visible" : "map-top-controls-hidden"}`}
            >
              <form
                className="map-overlay-search"
                onSubmit={handleSearchCity}
                onFocusCapture={() => {
                  setIsSearchFocused(true);
                  setIsSearchVisible(true);
                }}
                onBlurCapture={(event) => {
                  if (
                    !event.currentTarget.contains(event.relatedTarget as Node)
                  ) {
                    setIsSearchFocused(false);
                  }
                }}
              >
                <div className="map-search-input-wrap">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t(
                      "cartography_search_placeholder",
                      "Search city (e.g. Arkham, Boston, Paris)",
                    )}
                    aria-label={t(
                      "cartography_search_placeholder",
                      "Search city (e.g. Arkham, Boston, Paris)",
                    )}
                  />
                  <button
                    className="map-search-icon-btn"
                    type="submit"
                    disabled={isSearching}
                    aria-label={t("cartography_search_action", "Search")}
                    title={t("cartography_search_action", "Search")}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="11" cy="11" r="6.5" />
                      <line x1="16" y1="16" x2="21" y2="21" />
                    </svg>
                  </button>
                </div>
              </form>
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

            {searchMessage && (
              <div className="map-bottom-message-wrap">
                {searchMessageKind === "city" ? (
                  <div className="map-search-message map-overlay-message map-bottom-message map-bottom-message-city">
                    <div className="map-city-title">{cityTitle}</div>
                    {cityDetails && (
                      <div className="map-city-details">{cityDetails}</div>
                    )}
                  </div>
                ) : (
                  <p className="map-search-message map-overlay-message map-bottom-message">
                    {searchMessage}
                  </p>
                )}
              </div>
            )}

            <button
              className="map-fullscreen-control"
              type="button"
              onClick={handleToggleFullscreen}
              aria-label={
                isFullscreen
                  ? t("cartography_exit_fullscreen", "Exit fullscreen")
                  : t("cartography_fullscreen", "Enter fullscreen")
              }
              title={
                isFullscreen
                  ? t("cartography_exit_fullscreen", "Exit fullscreen")
                  : t("cartography_fullscreen", "Enter fullscreen")
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

export default CartographyPage;
