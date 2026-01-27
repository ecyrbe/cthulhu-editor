import React, { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";

interface SkillStatBoxProps {
  value: number;
  onChange?: (val: number) => void;
  readOnly?: boolean;
  ariaLabel?: string;
}

export const SkillStatBox: React.FC<SkillStatBoxProps> = ({
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
    <div className="skill-stat-container">
      <div className="skill-stat-main">
        <input
          type="number"
          className="skill-main-input"
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
        <span className="skill-percent-char">%</span>
      </div>
      <div className="skill-sub-boxes">
        <div className="skill-sub-box">
          {localValue ? Math.floor(localValue / 2) : ""}
        </div>
        <div className="skill-sub-box">
          {localValue ? Math.floor(localValue / 5) : ""}
        </div>
      </div>
    </div>
  );
};
