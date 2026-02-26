import React from "react";
import { createPortal } from "react-dom";
import "./ClickTooltip.css";

interface ClickTooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  maxWidth?: number;
  ariaLabel?: string;
}

const ClickTooltip: React.FC<ClickTooltipProps> = ({
  content,
  children,
  className = "",
  disabled = false,
  maxWidth = 280,
  ariaLabel,
}) => {
  const [tooltipPosition, setTooltipPosition] = React.useState<{
    left: number;
    top: number;
    above: boolean;
  } | null>(null);

  const trimmedContent = content.trim();
  const hasTooltip = !disabled && trimmedContent.length > 0;

  const hideTooltip = () => {
    setTooltipPosition(null);
  };

  const showTooltip = (target: HTMLDivElement) => {
    if (!hasTooltip) {
      setTooltipPosition(null);
      return;
    }

    const rect = target.getBoundingClientRect();
    const viewportPadding = 8;
    const gap = 6;
    const estimatedTooltipHeight = 140;
    const effectiveMaxWidth = Math.min(
      maxWidth,
      window.innerWidth - viewportPadding * 2,
    );
    const estimatedTooltipWidth = effectiveMaxWidth;
    const spaceBelow = window.innerHeight - rect.bottom;
    const above =
      spaceBelow < estimatedTooltipHeight && rect.top > estimatedTooltipHeight;

    const left = Math.max(
      viewportPadding,
      Math.min(
        rect.left,
        window.innerWidth - estimatedTooltipWidth - viewportPadding,
      ),
    );

    setTooltipPosition({
      left,
      top: above ? rect.top - gap : rect.bottom + gap,
      above,
    });
  };

  React.useEffect(() => {
    if (!hasTooltip) {
      setTooltipPosition(null);
    }
  }, [hasTooltip]);

  React.useEffect(() => {
    if (!tooltipPosition) {
      return;
    }

    const handleViewportChange = () => {
      setTooltipPosition(null);
    };

    window.addEventListener("scroll", handleViewportChange, true);
    window.addEventListener("resize", handleViewportChange);

    return () => {
      window.removeEventListener("scroll", handleViewportChange, true);
      window.removeEventListener("resize", handleViewportChange);
    };
  }, [tooltipPosition]);

  return (
    <>
      <div
        className={`click-tooltip-anchor ${hasTooltip ? "has-tooltip" : ""} ${className}`}
        onClick={(event) => showTooltip(event.currentTarget)}
        onMouseLeave={hideTooltip}
        onBlur={hideTooltip}
        tabIndex={hasTooltip ? 0 : -1}
        aria-label={hasTooltip ? ariaLabel : undefined}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            showTooltip(event.currentTarget);
          }
        }}
      >
        {children}
      </div>
      {tooltipPosition &&
        createPortal(
          <div
            className={`click-tooltip-popup ${tooltipPosition.above ? "above" : "below"}`}
            style={{
              left: `${tooltipPosition.left}px`,
              top: `${tooltipPosition.top}px`,
              maxWidth: `min(${maxWidth}px, calc(100vw - 16px))`,
            }}
            role="tooltip"
          >
            {trimmedContent}
          </div>,
          document.body,
        )}
    </>
  );
};

export default ClickTooltip;
