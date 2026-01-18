import React from "react";
import { useTranslation } from "react-i18next";

const AideMemoireSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="section-box aide-memoire-section">
      <div className="section-title">{t("cheat_sheet")}</div>
      <div className="aide-memoire-grid">
        <div
          className="aide-col"
          dangerouslySetInnerHTML={{ __html: t("rules_left") }}
        />
        <div className="vertical-separator" />
        <div
          className="aide-col"
          dangerouslySetInnerHTML={{ __html: t("rules_right") }}
        />
      </div>
    </div>
  );
};

export default AideMemoireSection;
