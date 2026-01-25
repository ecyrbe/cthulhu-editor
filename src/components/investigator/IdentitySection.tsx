import React from "react";
import { useTranslation } from "react-i18next";
import type { InvestigatorData } from "../../types";
import { SectionTitle } from "../ui/SectionTitle";
import { IdentityField } from "../ui/IdentityField";

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
      <IdentityField
        label={t("name")}
        value={identity.name}
        onChange={(val) => onValueChange("name", val)}
      />
      <IdentityField
        label={t("player")}
        value={identity.player}
        onChange={(val) => onValueChange("player", val)}
      />
      <IdentityField
        label={t("occupation")}
        value={identity.occupation}
        onChange={(val) => onValueChange("occupation", val)}
      />
      <div className="row">
        <IdentityField
          label={t("sex")}
          value={identity.sex}
          onChange={(val) => onValueChange("sex", val)}
          className="grow"
          style={{ width: "100px" }}
        />
        <IdentityField
          label={t("age")}
          value={identity.age}
          onChange={(val) => onValueChange("age", val)}
        />
      </div>
      <IdentityField
        label={t("residence")}
        value={identity.residence}
        onChange={(val) => onValueChange("residence", val)}
      />
      <IdentityField
        label={t("birthplace")}
        value={identity.birthplace}
        onChange={(val) => onValueChange("birthplace", val)}
      />
    </div>
  );
};

export default IdentitySection;
