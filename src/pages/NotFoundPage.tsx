import { Link } from "react-router-dom";
import { Icon } from "../components/icons";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <main className={styles.notFoundShell}>
      <div className={styles.card}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          The page you are looking for doesn&apos;t exist, was removed, or is temporarily
          unavailable.
        </p>
        <div className={styles.actions}>
          <Link to="/dashboard" className={styles.primaryBtn}>
            <Icon name="wallet" />
            Back to Dashboard
          </Link>
          <Link to="/" className={styles.secondaryBtn}>
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
