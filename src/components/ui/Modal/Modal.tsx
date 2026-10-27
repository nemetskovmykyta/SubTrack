import { ReactNode, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, icon, maxWidth = "460px" }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="presentation" onMouseDown={onClose}>
      <section
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{ maxWidth }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {icon && <span className={styles.dialogIcon}>{icon}</span>}
        <h2 id="modal-title" className={styles.title}>
          {title}
        </h2>
        <div className={styles.content}>{children}</div>
      </section>
    </div>
  );
}
