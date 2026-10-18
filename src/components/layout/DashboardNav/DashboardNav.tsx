import { Link } from "react-router";
import { Icon } from "../../icons";
import { Logo } from "../Logo/Logo";
import { ProfileDropdown } from "../ProfileDropdown/ProfileDropdown";
import styles from "./DashboardNav.module.css";

export interface DashboardNavProps {
  active: "dashboard" | "analytics" | "calendar" | "settings";
  onAddSubscription?: () => void;
}

export function DashboardNav({ active, onAddSubscription }: DashboardNavProps) {
  return (
    <header className={styles.dashboardNav} data-testid="dashboard-nav">
      <Logo />
      <nav className={styles.navLinks} aria-label="Primary navigation">
        <Link
          className={`${styles.navLink} ${active === "dashboard" ? styles.active : ""}`}
          to="/dashboard"
          data-testid="nav-dashboard"
        >
          Dashboard
        </Link>
        <Link
          className={`${styles.navLink} ${active === "analytics" ? styles.active : ""}`}
          to="/analytics"
          data-testid="nav-analytics"
        >
          Analytics
        </Link>
        <Link
          className={`${styles.navLink} ${active === "calendar" ? styles.active : ""}`}
          to="/calendar"
          data-testid="nav-calendar"
        >
          Calendar
        </Link>
        <Link
          className={`${styles.navLink} ${active === "settings" ? styles.active : ""}`}
          to="/settings"
          data-testid="nav-settings"
        >
          Settings
        </Link>
      </nav>
      <div className={styles.navActions}>
        <button className={styles.notificationButton} type="button" aria-label="Notifications">
          <Icon name="bell" />
          <span className={styles.notificationDot} />
        </button>
        <button
          className={styles.addSubscriptionBtn}
          type="button"
          onClick={onAddSubscription}
          data-testid="btn-add-subscription"
        >
          <span>+</span> Add Subscription
        </button>
        <ProfileDropdown />
      </div>
    </header>
  );
}
