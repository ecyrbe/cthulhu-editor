import React from "react";

interface SectionTitleProps {
  children: string;
  className?: string;
}

/**
 * SectionTitle component that applies font sizes based on the casing of each character.
 * - Already uppercase letters: font 12pt (class title-large)
 * - Lowercase letters or other characters: font 9pt (class title-small)
 * Note: text-transform: uppercase in CSS ensures everything looks like uppercase.
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = "",
}) => {
  const segments: { text: string; isUpper: boolean }[] = [];

  for (const char of children) {
    // Check if current char is an uppercase letter (supports Unicode)
    const isUpper = char === char.toUpperCase() && char !== char.toLowerCase();

    if (
      segments.length > 0 &&
      segments[segments.length - 1].isUpper === isUpper
    ) {
      segments[segments.length - 1].text += char;
    } else {
      segments.push({ text: char, isUpper });
    }
  }

  return (
    <div className={`section-title ${className}`}>
      {segments.map((segment, i) => (
        <span
          key={i}
          className={segment.isUpper ? "title-large" : "title-small"}
        >
          {segment.text}
        </span>
      ))}
    </div>
  );
};
