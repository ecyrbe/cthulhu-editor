import React from "react";
import { SectionTitle } from "./SectionTitle";

interface TrackerProps {
  title: string;
  start: number;
  end: number;
  columns?: number;
  currentValue: number;
  onSelect: (val: number) => void;
  extra?: React.ReactNode;
}

export const Tracker: React.FC<TrackerProps> = ({
  title,
  start,
  end,
  columns = 10,
  currentValue,
  onSelect,
  extra,
}) => {
  const items = [];
  for (let i = start; i <= end; i++) {
    items.push(i);
  }

  return (
    <div className={`tracker-col ${columns < 10 ? "small" : "large"}`}>
      <SectionTitle className="center">{title}</SectionTitle>
      {extra}
      <div
        className="number-grid"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {items.map((num) => (
          <button
            key={num}
            className={`num-item ${currentValue === num ? "circled" : ""}`}
            onClick={() => onSelect(num)}
            aria-pressed={currentValue === num}
            aria-label={`${title} ${num}`}
          >
            {num.toString().padStart(2, "0")}
          </button>
        ))}
      </div>
    </div>
  );
};
