import React from "react";
import { SectionTitle } from "./SectionTitle";

interface TrackerProps {
  title: string;
  start: number;
  end: number;
  columns?: number;
  currentValue: number;
  onSelect: (val: number) => void;
  children?: React.ReactNode;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  layoutType?: "standard" | "offset-zero" | "with-prefix";
  prefixText?: string;
  prefixSpan?: number;
}

export const Tracker: React.FC<TrackerProps> = ({
  title,
  start,
  end,
  columns = 10,
  currentValue,
  onSelect,
  children,
  headerLeft,
  headerRight,
  layoutType = "standard",
  prefixText,
  prefixSpan = 0,
}) => {
  const renderGrid = () => {
    const items = [];
    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    if (layoutType === "offset-zero") {
      const zero = items.find((n) => n === 0);
      const others = items.filter((n) => n !== 0);
      const gridCells = [];

      // First row: [0] [Numbers...]
      gridCells.push(renderButton(zero ?? 0));
      const firstRowOthers = others.slice(0, columns - 1);
      firstRowOthers.forEach((num) => gridCells.push(renderButton(num)));

      // Subsequent rows
      const remainingOthers = others.slice(columns - 1);
      remainingOthers.forEach((num, idx) => {
        if (idx % (columns - 1) === 0) {
          gridCells.push(
            <div key={`empty-${num}`} className="tracker-empty" />,
          );
        }
        gridCells.push(renderButton(num));
      });

      return gridCells;
    }

    if (layoutType === "with-prefix" && prefixText) {
      const gridCells = [];
      // Row 0: [Prefix][Numbers]
      gridCells.push(
        <div
          key="prefix"
          className="tracker-prefix"
          style={{ gridColumn: `span ${prefixSpan}` }}
        >
          {prefixText}
        </div>,
      );

      const firstRowNumbersCount = columns - prefixSpan;
      const firstRowNumbers = items.slice(0, firstRowNumbersCount);
      const remainingNumbers = items.slice(firstRowNumbersCount);

      firstRowNumbers.forEach((num) => gridCells.push(renderButton(num)));
      remainingNumbers.forEach((num) => gridCells.push(renderButton(num)));

      return gridCells;
    }

    // Default standard grid
    return items.map((num) => renderButton(num));
  };

  const renderButton = (num: number) => (
    <button
      key={num}
      className={`tracker-num ${currentValue === num ? "selected" : ""}`}
      onClick={() => onSelect(num)}
      aria-pressed={currentValue === num}
      aria-label={`${title} ${num}`}
    >
      <span className="num-text">{num.toString().padStart(2, "0")}</span>
    </button>
  );

  return (
    <div className="tracker-container">
      <div className="tracker-header">
        <div className="tracker-header-left">{headerLeft}</div>
        <SectionTitle>{title}</SectionTitle>
        <div className="tracker-header-right">{headerRight}</div>
      </div>
      <div className="tracker-content-wrapper">
        {children && <div className="tracker-left-side">{children}</div>}
        <div
          className="tracker-grid"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {renderGrid()}
        </div>
      </div>
    </div>
  );
};
