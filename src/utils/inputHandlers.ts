import React from "react";

/**
 * Shared onInput handler for number inputs to enforce min/max and integer values.
 */
export const handleNumberInput = (
  e: React.FormEvent<HTMLInputElement>,
  min = 0,
  max = 99,
) => {
  const target = e.currentTarget;
  const rawValue = target.value;

  if (rawValue === "") return;

  // Use parseFloat and Math.trunc to specifically truncate any decimal parts
  let val = Math.trunc(parseFloat(rawValue));

  if (isNaN(val)) return;

  if (val < min) val = min;
  if (val > max) val = max;

  target.value = val.toString();
};
