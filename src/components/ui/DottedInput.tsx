import React from "react";

interface DottedInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const DottedInput: React.FC<DottedInputProps> = ({
  label,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className={`backstory-item-line ${className}`}>
      {label && <div className="backstory-label-box">{label}</div>}
      <input
        className="dotted-line-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
