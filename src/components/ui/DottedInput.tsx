import React from "react";

interface DottedInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  ariaLabel?: string;
}

export const DottedInput: React.FC<DottedInputProps> = ({
  label,
  value,
  onChange,
  className = "",
  ariaLabel,
}) => {
  const inputId = React.useId();

  return (
    <div className={`backstory-item-line ${className}`}>
      {label && (
        <label className="backstory-label-box" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className="dotted-line-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel || (!label ? "Input" : undefined)}
      />
    </div>
  );
};
