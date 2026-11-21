import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, rightElement, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const inputClasses = [
      styles.inputField,
      icon ? styles.hasLeftIcon : "",
      rightElement ? styles.hasRightIcon : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={styles.inputGroup}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={styles.inputWrapper}>
          {icon && <span className={styles.leftIcon}>{icon}</span>}
          <input id={inputId} ref={ref} className={inputClasses} {...props} />
          {rightElement && <span className={styles.rightIcon}>{rightElement}</span>}
        </div>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
