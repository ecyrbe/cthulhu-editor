import React from "react";
import { StatBox } from "./StatBox";
import { DebouncedInput } from "./DebouncedInput";
import { handleNumberInput } from "../../utils/inputHandlers";

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
            min={-1}
            max={9}
            step={1}
            onInput={(e) => handleNumberInput(e, -1, 9)}
            onValueChange={(val) => onChange(val as number)}
          />
        </div>
      ) : (
        <StatBox value={value} onChange={onChange} />
      )}
    </label>
  );
};
