import React from "react";
import { useBufferedValue } from "../../hooks/useBufferedValue";

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

  const [localValue, setLocalValue, forceSync] = useBufferedValue(
    value,
    onChange,
    500,
  );

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
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={() => forceSync()}
        aria-label={ariaLabel || (!label ? "Input" : undefined)}
      />
    </div>
  );
};
