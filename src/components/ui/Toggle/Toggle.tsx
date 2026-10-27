import styles from "./Toggle.module.css";

export interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      className={`${styles.toggle} ${checked ? styles.active : ""}`}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
    >
      <span className={styles.thumb} />
    </button>
  );
}
