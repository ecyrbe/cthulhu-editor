import React from "react";

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
    <input
      id={id}
      type="number"
      className="small-stat-box"
      value={value || ""}
      onChange={
        onChange ? (e) => onChange(parseInt(e.target.value) || 0) : undefined
      }
      readOnly={readOnly}
    />
  </label>
);
