import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { InvestigatorData } from "../../types";
import { useDebounce } from "../../hooks/useDebounce";

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
  const [localValue, setLocalValue] = useState(value);
  const lastSentValueRef = React.useRef(value);

  const debouncedOnValueChange = useDebounce(
    (f: keyof InvestigatorData["identity"], v: string) => {
      lastSentValueRef.current = v;
      onValueChange(f, v);
    },
    500,
  );

  // Sync with prop if it changes externally
  useEffect(() => {
    if (value !== lastSentValueRef.current) {
      setLocalValue(value);
      lastSentValueRef.current = value;
    }
  }, [value]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    debouncedOnValueChange(field, newValue);
  };

  return (
    <label className={`field-row ${className}`}>
      <span className="field-label">{t(field)}</span>
      <input
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => {
          if (localValue !== value) {
            onValueChange(field, localValue);
          }
        }}
        style={style}
      />
    </label>
  );
};
