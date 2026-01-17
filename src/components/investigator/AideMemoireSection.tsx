import React from "react";
import { useLanguage } from "../LanguageContext";

const AideMemoireSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="section-box aide-memoire-section">
      <div className="section-title">{t("cheat_sheet")}</div>
      <div className="aide-memoire-grid">
        <div
          className="aide-col"
          dangerouslySetInnerHTML={{ __html: t("rules_left") }}
        />
        <div
          className="aide-col"
          dangerouslySetInnerHTML={{ __html: t("rules_right") }}
        />
      </div>
    </div>
  );
};

export default AideMemoireSection;
