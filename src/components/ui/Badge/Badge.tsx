import { ReactNode } from "react";

export interface BadgeProps {
  variant?: "active" | "urgent" | "positive" | "savings" | "neutral";
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = "neutral", children, className = "" }: BadgeProps) {
  if (variant === "active") {
    return (
      <span className={`active-badge ${className}`}>
        <i /> {children}
      </span>
    );
  }

  if (variant === "urgent") {
    return <span className={`urgent-badge ${className}`}>{children}</span>;
  }

  if (variant === "savings") {
    return <span className={`savings-pill ${className}`}>{children}</span>;
  }

  return <span className={`subtrack-badge badge-${variant} ${className}`}>{children}</span>;
}
