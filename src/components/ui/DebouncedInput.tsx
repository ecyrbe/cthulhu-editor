import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from "../../hooks/useDebounce";

interface DebouncedInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  value: string | number;
  onValueChange: (value: any) => void;
  delay?: number;
}

export const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value,
  onValueChange,
  delay = 500,
  type = "text",
  ...props
}) => {
  const [localValue, setLocalValue] = useState(value);
  const lastSentValueRef = useRef(value);

  const debouncedOnChange = useDebounce((newValue: any) => {
    lastSentValueRef.current = newValue;
    onValueChange(newValue);
  }, delay);

  useEffect(() => {
    if (value !== lastSentValueRef.current) {
      setLocalValue(value);
      lastSentValueRef.current = value;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      type === "number" ? parseInt(e.target.value) || 0 : e.target.value;
    setLocalValue(newValue);
    debouncedOnChange(newValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (localValue !== value) {
      onValueChange(localValue);
    }
    props.onBlur?.(e);
  };

  return (
    <input
      {...props}
      type={type}
      value={localValue || (type === "number" ? 0 : "")}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};
