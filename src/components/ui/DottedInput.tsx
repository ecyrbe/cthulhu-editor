import React, { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";

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
  const [localValue, setLocalValue] = useState(value);
  const lastSentValueRef = React.useRef(value);

  const debouncedOnChange = useDebounce((newValue: string) => {
    lastSentValueRef.current = newValue;
    onChange(newValue);
  }, 500);

  // Sync with prop if it changes externally
  useEffect(() => {
    if (value !== lastSentValueRef.current) {
      setLocalValue(value);
      lastSentValueRef.current = value;
    }
  }, [value]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

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
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => {
          if (localValue !== value) {
            onChange(localValue);
          }
        }}
        aria-label={ariaLabel || (!label ? "Input" : undefined)}
      />
    </div>
  );
};
