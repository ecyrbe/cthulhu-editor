import React from "react";
import { DebouncedInput } from "./DebouncedInput";
import { handleNumberInput } from "../../utils/inputHandlers";

interface MvtStatBoxProps {
  value: number;
  onChange: (val: number) => void;
}

export const MvtStatBox: React.FC<MvtStatBoxProps> = ({ value, onChange }) => {
  return (
    <div className="stat-box mvt-box">
      <div className="stat-main">
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
      <div className="stat-subs">
        <div className="stat-sub hard mvt-static">+1</div>
        <div className="stat-sub extreme mvt-static">-1</div>
      </div>
    </div>
  );
};
