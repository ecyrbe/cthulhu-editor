import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { db } from "../db/db";
import { type InvestigatorData } from "../types";
import { getInitialData } from "../store/investigatorAtoms";
import Footer from "../components/layout/Footer";
import "./ManagerPage.css";

const ManagerPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [investigators, setInvestigators] = useState<InvestigatorData[]>([]);

  useEffect(() => {
    const loadInvestigators = async () => {
      const all = await db.investigators.toArray();
      setInvestigators(all);
    };
    loadInvestigators();
  }, []);

  const handleCreate = async () => {
    const newData = getInitialData();

    const id = await db.investigators.add(newData);
    navigate(`/edit/${id}`);
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
    <div className="manager-page">
      <nav className="breadcrumb">
        <Link to="/">{t("home", "Home")}</Link> /{" "}
        <span>{t("manager", "Manager")}</span>
      </nav>

      <div className="manager-header">
        <h1>{t("my_investigators", "My Investigators")}</h1>
        <button className="add-button" onClick={handleCreate}>
          {t("new_investigator", "New Investigator")}
        </button>
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
                {inv.identity.occupation || t("no_occupation", "No occupation")}
              </p>
            </div>
            <button
              className="delete-btn"
              onClick={(e) => handleDelete(e, inv.id!)}
              title={t("delete", "Delete")}
            >
              ×
            </button>
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

      <Footer />
    </div>
  );
};

export default ManagerPage;
