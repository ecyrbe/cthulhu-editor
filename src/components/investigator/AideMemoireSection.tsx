import React from "react";
import { useTranslation } from "react-i18next";
import { SectionTitle } from "../ui/SectionTitle";

const AideMemoireSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="section-box aide-memoire-section">
      <SectionTitle>{t("cheat_sheet")}</SectionTitle>
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
