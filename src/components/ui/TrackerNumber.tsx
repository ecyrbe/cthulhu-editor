import React from "react";
import { DebouncedInput } from "./DebouncedInput";

interface TrackerNumberProps {
  label: string;
  value: number;
  onChange?: (value: number) => void;
  id?: string;
  readOnly?: boolean;
}

export const TrackerNumber: React.FC<TrackerNumberProps> = ({
  label,
  value,
  onChange,
  id,
  readOnly,
}) => (
  <label className="tracker-number-label">
    {label}
    <DebouncedInput
      id={id}
      type="number"
      className="small-stat-box"
      value={value}
      onValueChange={onChange || (() => {})}
      readOnly={readOnly}
    />
  </label>
);
