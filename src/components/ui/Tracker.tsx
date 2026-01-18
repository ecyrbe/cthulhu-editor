import React from "react";

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
      <div className="section-title center">{title}</div>
      {extra}
      <div
        className="number-grid"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {items.map((num) => (
          <div
            key={num}
            className={`num-item ${currentValue === num ? "circled" : ""}`}
            onClick={() => onSelect(num)}
          >
            {num.toString().padStart(2, "0")}
          </div>
        ))}
      </div>
    </div>
  );
};
