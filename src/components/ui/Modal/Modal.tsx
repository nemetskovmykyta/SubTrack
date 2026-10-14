import { ReactNode, useEffect, useRef } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, icon, maxWidth = "420px" }: ModalProps) {
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
    <div className="logout-overlay" role="presentation" onMouseDown={onClose}>
      <section
        ref={dialogRef}
        className="logout-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{ maxWidth }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {icon && <span className="logout-dialog-icon">{icon}</span>}
        <h2 id="modal-title">{title}</h2>
        {children}
      </section>
    </div>
  );
}
