import React from "react";
import { useBufferedValue } from "../../hooks/useBufferedValue";
import { handleNumberInput } from "../../utils/inputHandlers";
import { toExtremeField, toField, toHardField } from "../../utils/numbers";

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
          value={toField(localValue)}
          onChange={(e) => setLocalValue(parseInt(e.target.value) || 0)}
          onInput={handleNumberInput}
          min={-1}
          max={99}
          step={1}
          onBlur={() => forceSync()}
          readOnly={readOnly}
          aria-label={ariaLabel}
        />
        <span className="skill-percent-char">%</span>
      </div>
      <div className="skill-sub-boxes">
        <div className="skill-sub-box">{toHardField(localValue)}</div>
        <div className="skill-sub-box">{toExtremeField(localValue)}</div>
      </div>
    </div>
  );
};
