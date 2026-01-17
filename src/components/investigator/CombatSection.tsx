import React from "react";
import { useLanguage } from "../LanguageContext";
import { StatBox } from "../ui/StatBox";
import type { Skill } from "../../types";

interface CombatSectionProps {
  db: string;
  build: number;
  dodge: number;
}

const CombatSection: React.FC<CombatSectionProps> = ({ db, build, dodge }) => {
  const { t } = useLanguage();

  return (
    <div className="combat-derived-column">
      <div className="section-box combat-derived grow">
        <div className="section-title">{t("combat")}</div>
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
            <StatBox value={dodge} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombatSection;
