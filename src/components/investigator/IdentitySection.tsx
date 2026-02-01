import React from "react";
import { useTranslation } from "react-i18next";
import type { InvestigatorData, Category } from "../../types";
import { SectionTitle } from "../ui/SectionTitle";
import { IdentityField } from "../ui/IdentityField";

interface IdentitySectionProps {
  identity: InvestigatorData["identity"];
  categoryId?: number;
  categories: Category[];
  onValueChange: (
    field: keyof InvestigatorData["identity"],
    value: string,
  ) => void;
  onCategoryChange: (value: number | undefined) => void;
}

const IdentitySection: React.FC<IdentitySectionProps> = ({
  identity,
  categoryId,
  categories,
  onValueChange,
  onCategoryChange,
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
      <div className="row">
        <IdentityField
          field="player"
          value={identity.player}
          onValueChange={onValueChange}
        />
        <label className="field-row" style={{ marginLeft: "1rem", flex: 1 }}>
          <span className="field-label">{t("category", "Category")}</span>
          <select
            value={categoryId || ""}
            onChange={(e) =>
              onCategoryChange(
                e.target.value === "" ? undefined : Number(e.target.value),
              )
            }
            style={{
              padding: "2px",
              border: "none",
              background: "transparent",
              color: "inherit",
              fontFamily: "inherit",
              fontSize: "inherit",
              borderBottom: "1px solid var(--border-color)",
              flex: 1,
            }}
          >
            <option value="">{t("uncategorized", "Uncategorized")}</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
      </div>
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
