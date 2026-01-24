import React from "react";

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
  return (
    <div className="stat-box">
      <div className="stat-main">
        <input
          type="number"
          value={value || ""}
          onChange={(e) => onChange?.(parseInt(e.target.value) || 0)}
          readOnly={readOnly}
          aria-label={ariaLabel}
        />
      </div>
      <div className="stat-subs">
        <div className="stat-sub hard">
          {value ? Math.floor(value / 2) : ""}
        </div>
        <div className="stat-sub extreme">
          {value ? Math.floor(value / 5) : ""}
        </div>
      </div>
    </div>
  );
};
