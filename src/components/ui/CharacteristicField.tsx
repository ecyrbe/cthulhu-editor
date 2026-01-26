import React from "react";
import { StatBox } from "./StatBox";

interface CharacteristicFieldProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  isMvt?: boolean;
}

export const CharacteristicField: React.FC<CharacteristicFieldProps> = ({
  label,
  value,
  onChange,
  isMvt,
}) => {
  return (
    <label className="stat-container">
      <span className="stat-label">{label}</span>
      {isMvt ? (
        <div className="mvt-box">
          <input
            type="number"
            value={value || ""}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          />
        </div>
      ) : (
        <StatBox value={value} onChange={onChange} />
      )}
    </label>
  );
};
