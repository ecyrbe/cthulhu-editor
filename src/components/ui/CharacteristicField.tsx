import React from "react";
import { StatBox } from "./StatBox";
import { DebouncedInput } from "./DebouncedInput";

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
          <DebouncedInput
            type="number"
            value={value}
            onValueChange={onChange}
          />
        </div>
      ) : (
        <StatBox value={value} onChange={onChange} />
      )}
    </label>
  );
};
