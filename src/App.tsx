import "./App.css";
import React, { useCallback, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useInvestigator } from "./hooks/useInvestigator";
import {
  InvestigatorContext,
  useInvestigatorContext,
} from "./hooks/useInvestigatorContext";
import Sidebar from "./components/layout/Sidebar";
import ZoomControls from "./components/layout/ZoomControls";
import Footer from "./components/layout/Footer";
import InvestigatorSheet from "./components/investigator/InvestigatorSheet";
import arrowUpIcon from "./assets/arrow-up.svg";

// --- COMPONENTS ---

function MainLayout() {
  const { t } = useTranslation();
  const investigator = useInvestigatorContext();
  const {
    saveData,
    resetData,
    exportData,
    importData,
    rollInvestigator,
    zoom,
    handleZoomIn,
    handleZoomOut,
    handleFitWidth,
    handleFitHeight,
    handleResetZoom,
  } = investigator;

  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSave = useCallback(() => {
    saveData();
    toast.success(t("toast_save_success"));
  }, [saveData, t]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleImport = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const json = JSON.parse(event.target?.result as string);
            importData(json);
          } catch (error) {
            toast.error(t("toast_import_error"));
            console.error(error);
          }
        };
        reader.readAsText(file);
      }
    },
    [importData, t],
  );

  return (
    <div className="app-container">
      <Toaster position="bottom-right" />
      <Sidebar
        onRoll={rollInvestigator}
        onPrint={handlePrint}
        onSave={handleSave}
        onReset={resetData}
        onExport={exportData}
        onImport={handleImport}
      />

      <ZoomControls
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitWidth={handleFitWidth}
        onFitHeight={handleFitHeight}
        onResetZoom={handleResetZoom}
      />

      <InvestigatorSheet />

      <Footer />

      {showScrollTop && (
        <button
          className="scroll-to-top desktop-only"
          onClick={scrollToTop}
          title={t("go_to_top")}
          aria-label={t("go_to_top")}
        >
          <img src={arrowUpIcon} aria-hidden="true" width="24" height="24" />
        </button>
      )}
    </div>
  );
}

export default function App() {
  const [zoom, setZoom] = React.useState(1);
  const [printBlankValues, setPrintBlankValues] = React.useState(false);
  const investigator = useInvestigator();
  const { t } = useTranslation();

  // Handle shortcut links like #link=...
  React.useEffect(() => {
    const handleHash = async () => {
      const hash = window.location.hash;
      if (hash.startsWith("#link=")) {
        const urlToLoad = hash.substring(6);
        if (!urlToLoad) return;

        const toastId = toast.loading(
          t("loading_external_data") || "Loading investigator data...",
        );
        try {
          const response = await fetch(decodeURIComponent(urlToLoad));
          if (!response.ok) throw new Error("Failed to fetch");
          const json = await response.json();
          investigator.importData(json);
          toast.dismiss(toastId);
          // Redirect to root without the link Param to avoid re-loads
          window.location.hash = "/";
        } catch (error) {
          toast.error(t("toast_import_error"), { id: toastId });
          console.error(error);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [investigator, t]);

  const handleZoomIn = useCallback(
    () => setZoom((prev) => Math.min(prev + 0.1, 2)),
    [],
  );
  const handleZoomOut = useCallback(
    () => setZoom((prev) => Math.max(prev - 0.1, 0.2)),
    [],
  );
  const handleResetZoom = useCallback(() => setZoom(1), []);

  const handleFitWidth = useCallback(() => {
    const measure = document.createElement("div");
    measure.style.width = "210mm";
    measure.style.visibility = "hidden";
    measure.style.position = "absolute";
    document.body.appendChild(measure);
    const mmWidthPx = measure.offsetWidth;
    document.body.removeChild(measure);

    const availableWidth = window.innerWidth - 80;
    setZoom(availableWidth / mmWidthPx);
  }, []);

  const handleFitHeight = useCallback(() => {
    const measure = document.createElement("div");
    measure.style.height = "297mm";
    measure.style.visibility = "hidden";
    measure.style.position = "absolute";
    document.body.appendChild(measure);
    const mmHeightPx = measure.offsetHeight;
    document.body.removeChild(measure);

    const availableHeight = window.innerHeight - 40;
    setZoom(availableHeight / mmHeightPx);
  }, []);

  const handlePhotoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          investigator.setPhoto(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [investigator],
  );

  const contextValue = useMemo(
    () => ({
      investigator: {
        ...investigator,
        zoom,
        printBlankValues,
        setPrintBlankValues,
        handlePhotoUpload,
        handleZoomIn,
        handleZoomOut,
        handleFitWidth,
        handleFitHeight,
        handleResetZoom,
      },
    }),
    [
      investigator,
      zoom,
      printBlankValues,
      setPrintBlankValues,
      handlePhotoUpload,
      handleZoomIn,
      handleZoomOut,
      handleFitWidth,
      handleFitHeight,
      handleResetZoom,
    ],
  );

  return (
    <InvestigatorContext.Provider value={contextValue.investigator}>
      <MainLayout />
    </InvestigatorContext.Provider>
  );
}
