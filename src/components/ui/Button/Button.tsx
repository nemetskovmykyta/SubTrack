import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "primary", size = "md", icon, children, type = "button", ...props },
    ref
  ) => {
    const classNames = ["subtrack-btn", `btn-${variant}`, `btn-${size}`, className]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} type={type} className={classNames} {...props}>
        {icon && <span className="btn-icon">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
