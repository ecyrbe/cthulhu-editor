import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../db/db";
import { InvestigatorDataSchema, type InvestigatorData } from "../types";
import { getInitialData } from "../store/investigatorAtoms";
import { normalize } from "../utils/normalize";
import Footer from "../components/layout/Footer";
import LanguageSelector from "../components/layout/LanguageSelector";
import Button from "../components/ui/Button";
import LoadingScreen from "../components/ui/LoadingScreen";

// Icons
import exportIcon from "../assets/floppy-disk-arrow-out.svg";
import importIcon from "../assets/floppy-disk-arrow-in.svg";
import binIcon from "../assets/bin.svg";

import "./ManagerPage.css";

const ManagerPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [investigators, setInvestigators] = useState<InvestigatorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvestigators = async () => {
      try {
        const all = await db.investigators.toArray();
        setInvestigators(all);
      } finally {
        setLoading(false);
      }
    };
    loadInvestigators();
  }, []);

  const handleCreate = async () => {
    const newData = getInitialData();

    const id = await db.investigators.add(newData);
    navigate(`/edit/${id}`);
  };

  const handleExport = (e: React.MouseEvent, data: InvestigatorData) => {
    e.preventDefault();
    e.stopPropagation();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `investigator-${normalize(data.identity.name) || "unnamed"}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(
      t("toast_export_success", "Investigator exported successfully!"),
    );
  };

  if (loading) return <LoadingScreen />;

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          const result = InvestigatorDataSchema.safeParse(json);

          if (!result.success) {
            console.error("Import validation failed:", result.error);
            toast.error(
              t("toast_import_error", "Failed to import: Invalid file format"),
            );
            return;
          }

          // Strip the id to avoid conflicts when importing to a new database
          const { id: _id, ...dataToSave } = result.data;

          // Ensure sanityMax is correct on import
          const cthulhuSkill = dataToSave.skills?.find(
            (s) => s.type === "standard" && s.key === "cthulhu",
          );
          if (cthulhuSkill && cthulhuSkill.type === "standard") {
            dataToSave.trackers = {
              ...(dataToSave.trackers || {}),
              sanityMax: 99 - (Number(cthulhuSkill.current) || 0),
            };
          }

          const newId = await db.investigators.add(
            dataToSave as InvestigatorData,
          );

          // Update the list
          const all = await db.investigators.toArray();
          setInvestigators(all);

          toast.success(
            t("toast_import_success", "Investigator imported successfully!"),
          );
          navigate(`/edit/${newId}`);
        } catch (error) {
          toast.error(t("toast_import_error", "Failed to import character"));
          console.error(error);
        }
      };
      reader.readAsText(file);
    }
    // Reset input
    e.target.value = "";
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      confirm(
        t(
          "confirm_delete",
          "Are you sure you want to delete this investigator?",
        ),
      )
    ) {
      await db.investigators.delete(id);
      setInvestigators(investigators.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="manager-page-container">
      <Toaster position="bottom-right" />
      <div className="manager-page">
        <nav className="breadcrumb">
          <Link to="/">{t("home", "Home")}</Link> /{" "}
          <span>{t("manager", "Manager")}</span>
        </nav>

        <div className="manager-header">
          <h1>{t("my_investigators", "My Investigators")}</h1>
          <div className="header-actions">
            <LanguageSelector />
            <div className="file-actions">
              <label className="import-btn-label" title={t("import")}>
                <img src={importIcon} alt="" width="20" height="20" />
                <span>{t("import")}</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden-file-input"
                />
              </label>
            </div>
            <Button onClick={handleCreate}>
              {t("new_investigator", "New Investigator")}
            </Button>
          </div>
        </div>

        <div className="investigator-list">
          {investigators.map((inv) => (
            <div
              key={inv.id}
              className="investigator-card"
              onClick={() => navigate(`/edit/${inv.id}`)}
            >
              <div className="photo-container">
                {inv.photo ? (
                  <img src={inv.photo} alt={inv.identity.name} />
                ) : (
                  <div className="photo-placeholder">?</div>
                )}
              </div>
              <div className="investigator-details">
                <h3>{inv.identity.name || t("unnamed", "Unnamed")}</h3>
                <p className="occupation">
                  {inv.identity.occupation ||
                    t("no_occupation", "No occupation")}
                </p>
              </div>
              <div className="card-actions">
                <button
                  className="card-action-btn delete-btn"
                  onClick={(e) => handleDelete(e, inv.id!)}
                  title={t("delete", "Delete")}
                >
                  <img src={binIcon} alt="" width="16" height="16" />
                </button>
                <button
                  className="card-action-btn export-btn"
                  onClick={(e) => handleExport(e, inv)}
                  title={t("export", "Export")}
                >
                  <img src={exportIcon} alt="" width="16" height="16" />
                </button>
              </div>
            </div>
          ))}
          {investigators.length === 0 && (
            <p className="empty-message">
              {t(
                "no_investigators_found",
                "No investigators found. Create your first one!",
              )}
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManagerPage;
