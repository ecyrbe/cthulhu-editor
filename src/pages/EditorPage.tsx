import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";
import { useSetAtom, useAtomValue } from "jotai";
import {
  investigatorDataAtom,
  loadInvestigatorAtom,
  saveInvestigatorAtom,
  rollInvestigatorAtom,
  importInvestigatorAtom,
  resetInvestigatorAtom,
  exportInvestigatorAtom,
} from "../store/investigatorAtoms";
import {
  zoomLevelAtom,
  zoomInAtom,
  zoomOutAtom,
  resetZoomAtom,
  fitWidthAtom,
  fitHeightAtom,
} from "../store/uiAtoms";
import Toolbox from "../components/layout/Toolbox";
import Footer from "../components/layout/Footer";
import InvestigatorSheet from "../components/investigator/InvestigatorSheet";
import arrowUpIcon from "../assets/arrow-up.svg";
import "./EditorPage.css";

const EditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const data = useAtomValue(investigatorDataAtom);
  const loadInvestigator = useSetAtom(loadInvestigatorAtom);
  const saveInvestigator = useSetAtom(saveInvestigatorAtom);
  const rollInvestigator = useSetAtom(rollInvestigatorAtom);
  const importInvestigator = useSetAtom(importInvestigatorAtom);
  const resetInvestigator = useSetAtom(resetInvestigatorAtom);
  const exportInvestigator = useSetAtom(exportInvestigatorAtom);

  const [loading, setLoading] = useState(true);

  const zoom = useAtomValue(zoomLevelAtom);
  const handleZoomIn = useSetAtom(zoomInAtom);
  const handleZoomOut = useSetAtom(zoomOutAtom);
  const handleResetZoom = useSetAtom(resetZoomAtom);
  const handleFitWidth = useSetAtom(fitWidthAtom);
  const handleFitHeight = useSetAtom(fitHeightAtom);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (id) {
        const loaded = await loadInvestigator(parseInt(id));
        if (!loaded) {
          toast.error(t("investigator_not_found", "Investigator not found"));
          navigate("/manager");
        }
      }
      setLoading(false);
    };
    load();
  }, [id, loadInvestigator, navigate, t]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Auto-save logic
  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => {
      saveInvestigator();
    }, 2000); // Save after 2 seconds of inactivity
    return () => clearTimeout(timer);
  }, [data, saveInvestigator, loading]);

  const handlePrint = () => {
    window.print();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          importInvestigator({ newData: json, t });
        } catch (error) {
          toast.error(t("toast_import_error"));
          console.error(error);
        }
      };
      reader.readAsText(file);
    }
  };

  if (loading) return <div>{t("loading", "Loading...")}</div>;

  return (
    <div className="editor-page-container">
      <Toaster position="bottom-right" />

      <main className="editor-main-content">
        <nav className="editor-nav breadcrumb">
          <Link to="/">{t("home", "Home")}</Link> /
          <Link to="/manager">{t("manager", "Manager")}</Link> /
          <span>{data.identity.name || t("unnamed", "Unnamed")}</span>
        </nav>

        <div className="sheet-viewport">
          <InvestigatorSheet />
        </div>

        <Footer />
      </main>

      <Toolbox
        onRoll={rollInvestigator}
        onPrint={handlePrint}
        onReset={resetInvestigator}
        onExport={exportInvestigator}
        onImport={handleImport}
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onFitWidth={handleFitWidth}
        onFitHeight={handleFitHeight}
        onResetZoom={handleResetZoom}
      />

      {showScrollTop && (
        <button
          className="scroll-to-top"
          onClick={scrollToTop}
          aria-label={t("scroll_to_top")}
        >
          <img src={arrowUpIcon} alt="" />
        </button>
      )}
    </div>
  );
};

export default EditorPage;
