import React from "react";
import { useBufferedValue } from "../../hooks/useBufferedValue";

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
  const [localValue, setLocalValue, forceSync] = useBufferedValue(
    value,
    onValueChange,
    delay,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      type === "number" ? parseInt(e.target.value) || 0 : e.target.value;
    setLocalValue(newValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    forceSync();
    props.onBlur?.(e);
  };

  return (
    <input
      {...props}
      type={type}
      value={localValue ?? (type === "number" ? 0 : "")}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};
