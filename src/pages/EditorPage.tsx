import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";
import { useAtom, useSetAtom } from "jotai";
import {
  investigatorDataAtom,
  loadInvestigatorAtom,
  saveInvestigatorAtom,
  rollInvestigatorAtom,
  importInvestigatorAtom,
  updatePhotoAtom,
  resetInvestigatorAtom,
  exportInvestigatorAtom,
} from "../store/investigatorAtoms";
import { zoomLevelAtom } from "../store/uiAtoms";
import Sidebar from "../components/layout/Sidebar";
import ZoomControls from "../components/layout/ZoomControls";
import Footer from "../components/layout/Footer";
import InvestigatorSheet from "../components/investigator/InvestigatorSheet";
import arrowUpIcon from "../assets/arrow-up.svg";
import "./EditorPage.css";

const EditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [data] = useAtom(investigatorDataAtom);
  const loadInvestigator = useSetAtom(loadInvestigatorAtom);
  const saveInvestigator = useSetAtom(saveInvestigatorAtom);
  const rollInvestigator = useSetAtom(rollInvestigatorAtom);
  const importInvestigator = useSetAtom(importInvestigatorAtom);
  const resetInvestigator = useSetAtom(resetInvestigatorAtom);
  const exportInvestigator = useSetAtom(exportInvestigatorAtom);

  const [loading, setLoading] = useState(true);

  const [zoom, setZoom] = useAtom(zoomLevelAtom);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 2));

  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.5));
  const handleResetZoom = () => setZoom(1);
  const handleFitWidth = () => {
    const sheet = document.querySelector(".investigator-sheet");
    if (sheet) {
      const scale =
        (window.innerWidth - 40) / (sheet as HTMLElement).offsetWidth;
      setZoom(Math.min(scale, 1.5));
    }
  };
  const handleFitHeight = () => {
    const sheet = document.querySelector(".investigator-sheet");
    if (sheet) {
      const scale =
        (window.innerHeight - 80) / (sheet as HTMLElement).offsetHeight;
      setZoom(Math.min(scale, 1.5));
    }
  };

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

  const handleSave = async () => {
    await saveInvestigator();
    toast.success(t("toast_save_success"));
  };

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
    <div className="app-container">
      <Toaster position="bottom-right" />

      <nav className="editor-nav breadcrumb">
        <Link to="/">{t("home", "Home")}</Link> /
        <Link to="/manager">{t("manager", "Manager")}</Link> /
        <span>{data.identity.name || t("unnamed", "Unnamed")}</span>
      </nav>

      <Sidebar
        onRoll={rollInvestigator}
        onPrint={handlePrint}
        onSave={handleSave}
        onReset={resetInvestigator}
        onExport={exportInvestigator}
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
