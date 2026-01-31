import React from "react";

/**
 * Shared onInput handler for number inputs to enforce min/max and integer values.
 */
export const handleNumberInput = (
  e: React.FormEvent<HTMLInputElement>,
  min = -1,
  max = 99,
) => {
  const target = e.currentTarget;
  const rawValue = target.value;

  if (rawValue === "") return;

  let val = Math.trunc(parseFloat(rawValue));

  if (isNaN(val)) return;

  val = Math.min(Math.max(val, min), max);

  target.value = val.toString();
};
