import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import styles from "./Button.module.css";

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
    const classNames = [styles.btn, styles[variant], styles[size], className]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} type={type} className={classNames} {...props}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
