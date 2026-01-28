import React from "react";
import { useBufferedValue } from "../../hooks/useBufferedValue";

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
  const [localValue, setLocalValue, forceSync] = useBufferedValue(
    value,
    (val) => onChange?.(val),
    300,
  );

  return (
    <div className="skill-stat-container">
      <div className="skill-stat-main">
        <input
          type="number"
          className="skill-main-input"
          value={localValue || ""}
          onChange={(e) => setLocalValue(parseInt(e.target.value) || 0)}
          onBlur={() => forceSync()}
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
