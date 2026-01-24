import React from "react";
import { useTranslation } from "react-i18next";
import { StatBox } from "../ui/StatBox";
import { SectionTitle } from "../ui/SectionTitle";

interface CombatSectionProps {
  db: string;
  build: number;
  dodge: number;
}

const CombatSection: React.FC<CombatSectionProps> = ({ db, build, dodge }) => {
  const { t } = useTranslation();

  return (
    <div className="combat-derived-content">
      <SectionTitle>{t("combat")}</SectionTitle>
      <div className="combat-stats-grid">
        <div className="stat-container">
          <span className="stat-label horizontal">{t("db")}</span>
          <div className="simple-stat-box">{db}</div>
        </div>
        <div className="stat-container">
          <span className="stat-label horizontal">{t("build")}</span>
          <div className="simple-stat-box">{build}</div>
        </div>
        <div className="stat-container">
          <span className="stat-label horizontal">{t("dodge")}</span>
          <StatBox value={dodge} readOnly ariaLabel={t("dodge")} />
        </div>
      </div>
    </div>
  );
};

export default CombatSection;
