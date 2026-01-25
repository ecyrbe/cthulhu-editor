import React from "react";
import { useTranslation } from "react-i18next";
import type { InvestigatorData } from "../../types";

interface IdentityFieldProps {
  field: keyof InvestigatorData["identity"];
  value: string;
  onValueChange: (
    field: keyof InvestigatorData["identity"],
    value: string,
  ) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const IdentityField: React.FC<IdentityFieldProps> = ({
  field,
  value,
  onValueChange,
  className = "",
  style,
}) => {
  const { t } = useTranslation();

  return (
    <label className={`field-row ${className}`}>
      <span className="field-label">{t(field)}</span>
      <input
        value={value}
        onChange={(e) => onValueChange(field, e.target.value)}
        style={style}
      />
    </label>
  );
};
