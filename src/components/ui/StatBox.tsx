import React from "react";
import { useBufferedValue } from "../../hooks/useBufferedValue";
import { handleNumberInput } from "../../utils/inputHandlers";

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
  const [localValue, setLocalValue, forceSync] = useBufferedValue(
    value,
    (val) => onChange?.(val),
    300,
  );

  return (
    <div className="stat-box">
      <div className="stat-main">
        <input
          type="number"
          value={localValue || ""}
          onChange={(e) => setLocalValue(parseInt(e.target.value) || 0)}
          onInput={handleNumberInput}
          min={0}
          max={99}
          step={1}
          onBlur={() => forceSync()}
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
