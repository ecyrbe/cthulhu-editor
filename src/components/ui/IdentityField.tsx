import React from "react";

interface IdentityFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const IdentityField: React.FC<IdentityFieldProps> = ({
  label,
  value,
  onChange,
  className = "",
  style,
}) => {
  return (
    <label className={`field-row ${className}`}>
      <span className="field-label">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={style}
      />
    </label>
  );
};
