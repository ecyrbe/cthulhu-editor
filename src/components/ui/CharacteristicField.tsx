import React from "react";
import { StatBox } from "./StatBox";
import { MvtStatBox } from "./MvtStatBox";

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
        <MvtStatBox value={value} onChange={onChange} />
      ) : (
        <StatBox value={value} onChange={onChange} />
      )}
    </label>
  );
};
