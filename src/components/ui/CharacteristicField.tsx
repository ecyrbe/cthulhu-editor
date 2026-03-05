import React from "react";
import { StatBox } from "./StatBox";
import { MvtStatBox } from "./MvtStatBox";
import Tooltip from "./Tooltip";

interface CharacteristicFieldProps {
  label: string;
  tootip?: string;
  value: number;
  onChange: (val: number) => void;
  isMvt?: boolean;
}

export const CharacteristicField: React.FC<CharacteristicFieldProps> = ({
  label,
  tootip,
  value,
  onChange,
  isMvt,
}) => {
  return (
    <label className="stat-container">
      {tootip ? (
        <Tooltip
          className="stat-label"
          content={tootip}
          trigger="hover"
          ariaLabel={`${label} ${tootip}`}
        >
          {label}
        </Tooltip>
      ) : (
        <span className="stat-label">{label}</span>
      )}
      {isMvt ? (
        <MvtStatBox value={value} onChange={onChange} />
      ) : (
        <StatBox value={value} onChange={onChange} />
      )}
    </label>
  );
};
