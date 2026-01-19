import React from "react";
import { useTranslation } from "react-i18next";
import type { InvestigatorData } from "../../types";
import { SectionTitle } from "../ui/SectionTitle";

interface IdentitySectionProps {
  identity: InvestigatorData["identity"];
  onValueChange: (
    field: keyof InvestigatorData["identity"],
    value: string,
  ) => void;
}

const IdentitySection: React.FC<IdentitySectionProps> = ({
  identity,
  onValueChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="header-col left">
      <SectionTitle>{t("era")}</SectionTitle>
      <div className="field-row">
        <span className="field-label">{t("name")}</span>
        <input
          value={identity.name}
          onChange={(e) => onValueChange("name", e.target.value)}
        />
      </div>
      <div className="field-row">
        <span className="field-label">{t("player")}</span>
        <input
          value={identity.player}
          onChange={(e) => onValueChange("player", e.target.value)}
        />
      </div>
      <div className="field-row">
        <span className="field-label">{t("occupation")}</span>
        <input
          value={identity.occupation}
          onChange={(e) => onValueChange("occupation", e.target.value)}
        />
      </div>
      <div className="row">
        <div className="field-row grow">
          <span className="field-label">{t("sex")}</span>
          <input
            value={identity.sex}
            onChange={(e) => onValueChange("sex", e.target.value)}
            style={{ width: "100px" }}
          />
        </div>
        <div className="field-row">
          <span className="field-label">{t("age")}</span>
          <input
            value={identity.age}
            onChange={(e) => onValueChange("age", e.target.value)}
          />
        </div>
      </div>
      <div className="field-row">
        <span className="field-label">{t("residence")}</span>
        <input
          value={identity.residence}
          onChange={(e) => onValueChange("residence", e.target.value)}
        />
      </div>
      <div className="field-row">
        <span className="field-label">{t("birthplace")}</span>
        <input
          value={identity.birthplace}
          onChange={(e) => onValueChange("birthplace", e.target.value)}
        />
      </div>
    </div>
  );
};

export default IdentitySection;
