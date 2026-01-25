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
        field="name"
        value={identity.name}
        onValueChange={onValueChange}
      />
      <IdentityField
        field="player"
        value={identity.player}
        onValueChange={onValueChange}
      />
      <IdentityField
        field="occupation"
        value={identity.occupation}
        onValueChange={onValueChange}
      />
      <div className="row">
        <IdentityField
          field="sex"
          value={identity.sex}
          onValueChange={onValueChange}
          style={{ width: "100px" }}
        />
        <IdentityField
          field="age"
          value={identity.age}
          onValueChange={onValueChange}
        />
      </div>
      <IdentityField
        field="residence"
        value={identity.residence}
        onValueChange={onValueChange}
      />
      <IdentityField
        field="birthplace"
        value={identity.birthplace}
        onValueChange={onValueChange}
      />
    </div>
  );
};

export default IdentitySection;
