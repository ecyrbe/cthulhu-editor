import React from "react";
import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
  ...props
}) => {
  const buttonClass = `ui-button variant-${variant} size-${size} ${fullWidth ? "full-width" : ""} ${className}`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
