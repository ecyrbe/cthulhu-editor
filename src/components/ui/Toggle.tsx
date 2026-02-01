import React from "react";
import "./Toggle.css";

interface ToggleProps {
  active: boolean;
  onChange: (active: boolean) => void;
  label?: string;
  title?: string;
}

const Toggle: React.FC<ToggleProps> = ({ active, onChange, label, title }) => {
  return (
    <button
      className={`ui-toggle ${active ? "is-active" : ""}`}
      onClick={() => onChange(!active)}
      title={title}
    >
      <div className="toggle-track">
        <div className="toggle-thumb" />
      </div>
      {label && <span className="toggle-label">{label}</span>}
    </button>
  );
};

export default Toggle;
