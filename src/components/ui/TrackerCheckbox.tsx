import React from "react";

interface TrackerCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const TrackerCheckbox: React.FC<TrackerCheckboxProps> = ({
  label,
  checked,
  onChange,
}) => (
  <label className="tracker-checkbox-label">
    {label}
    <button
      className={`tracker-check ${checked ? "checked" : ""}`}
      onClick={() => onChange(!checked)}
      aria-label={label}
      aria-pressed={checked}
    />
  </label>
);
