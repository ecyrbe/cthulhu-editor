import React from "react";

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
  return (
    <div className="skill-stat-container">
      <div className="skill-stat-main">
        <input
          type="number"
          className="skill-main-input"
          value={value || ""}
          onChange={(e) => onChange?.(parseInt(e.target.value) || 0)}
          readOnly={readOnly}
          aria-label={ariaLabel}
        />
        <span className="skill-percent-char">%</span>
      </div>
      <div className="skill-sub-boxes">
        <div className="skill-sub-box">
          {value ? Math.floor(value / 2) : ""}
        </div>
        <div className="skill-sub-box">
          {value ? Math.floor(value / 5) : ""}
        </div>
      </div>
    </div>
  );
};
