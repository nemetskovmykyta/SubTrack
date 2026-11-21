import { ReactNode } from "react";
import styles from "./Badge.module.css";

export interface BadgeProps {
  variant?: "active" | "urgent" | "positive" | "savings" | "neutral";
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = "neutral", children, className = "" }: BadgeProps) {
  if (variant === "active") {
    return (
      <span className={`${styles.badge} ${styles.active} ${className}`}>
        <span className={styles.activeDot} /> {children}
      </span>
    );
  }

  const variantClass = styles[variant] || styles.neutral;

  return <span className={`${styles.badge} ${variantClass} ${className}`}>{children}</span>;
}
