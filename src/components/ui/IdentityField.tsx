import React from "react";
import { useTranslation } from "react-i18next";
import type { InvestigatorData } from "../../types";
import { useBufferedValue } from "../../hooks/useBufferedValue";

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

  const [localValue, setLocalValue, forceSync] = useBufferedValue(
    value,
    (v) => onValueChange(field, v),
    500,
  );

  return (
    <label className={`field-row ${className}`}>
      <span className="field-label">{t(field)}</span>
      <input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={() => forceSync()}
        style={style}
      />
    </label>
  );
};
