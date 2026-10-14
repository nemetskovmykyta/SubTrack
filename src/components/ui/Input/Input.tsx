import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, rightElement, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="subtrack-input-group">
        {label && <label htmlFor={inputId}>{label}</label>}
        <div className="input-box">
          {icon && <span className="input-icon-left">{icon}</span>}
          <input id={inputId} ref={ref} className={className} {...props} />
          {rightElement && <span className="input-icon-right">{rightElement}</span>}
        </div>
        {error && <span className="input-error-msg">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
