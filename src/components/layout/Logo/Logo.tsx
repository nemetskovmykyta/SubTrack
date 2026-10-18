import { Link } from "react-router";
import { Icon } from "../../icons";
import styles from "./Logo.module.css";

export function Logo() {
  return (
    <Link className={styles.dashBrand} to="/dashboard" aria-label="SubTrack Dashboard">
      <span className={styles.brandIcon}>
        <Icon name="wallet" />
      </span>
      SubTrack
    </Link>
  );
}
