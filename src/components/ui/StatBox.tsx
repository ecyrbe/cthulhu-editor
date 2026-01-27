import React, { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";

interface StatBoxProps {
  value: number;
  onChange?: (val: number) => void;
  readOnly?: boolean;
  ariaLabel?: string;
}

export const StatBox: React.FC<StatBoxProps> = ({
  value,
  onChange,
  readOnly,
  ariaLabel,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const lastSentValueRef = React.useRef(value);

  const debouncedOnChange = useDebounce((val: number) => {
    lastSentValueRef.current = val;
    onChange?.(val);
  }, 300);

  useEffect(() => {
    if (value !== lastSentValueRef.current) {
      setLocalValue(value);
      lastSentValueRef.current = value;
    }
  }, [value]);

  const handleChange = (newValue: number) => {
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  return (
    <div className="stat-box">
      <div className="stat-main">
        <input
          type="number"
          value={localValue || ""}
          onChange={(e) => handleChange(parseInt(e.target.value) || 0)}
          onBlur={() => {
            if (localValue !== value) {
              onChange?.(localValue);
            }
          }}
          readOnly={readOnly}
          aria-label={ariaLabel}
        />
      </div>
      <div className="stat-subs">
        <div className="stat-sub hard">
          {localValue ? Math.floor(localValue / 2) : ""}
        </div>
        <div className="stat-sub extreme">
          {localValue ? Math.floor(localValue / 5) : ""}
        </div>
      </div>
    </div>
  );
};
