import React from "react";
import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "action";
  size?: "sm" | "md" | "lg" | "icon";
  fullWidth?: boolean;
  circle?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
  circle = false,
  ...props
}) => {
  const buttonClass = `ui-button variant-${variant} size-${size} ${fullWidth ? "full-width" : ""} ${circle ? "is-circle" : ""} ${className}`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
