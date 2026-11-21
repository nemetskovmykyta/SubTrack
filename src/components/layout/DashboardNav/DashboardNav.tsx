import { NavLink } from "react-router-dom";
import { Icon } from "../../icons";
import { Logo } from "../Logo/Logo";
import { ProfileDropdown } from "../ProfileDropdown/ProfileDropdown";
import styles from "./DashboardNav.module.css";

export interface DashboardNavProps {
  active?: "dashboard" | "analytics" | "calendar" | "settings";
  onAddSubscription?: () => void;
}

export function DashboardNav({ active, onAddSubscription }: DashboardNavProps) {
  return (
    <header className={styles.dashboardNav} data-testid="dashboard-nav">
      <Logo />
      <nav className={styles.navLinks} aria-label="Primary navigation">
        <NavLink
          className={({ isActive }) =>
            `${styles.navLink} ${isActive || active === "dashboard" ? styles.active : ""}`
          }
          to="/dashboard"
          data-testid="nav-dashboard"
        >
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.navLink} ${isActive || active === "analytics" ? styles.active : ""}`
          }
          to="/analytics"
          data-testid="nav-analytics"
        >
          Analytics
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.navLink} ${isActive || active === "calendar" ? styles.active : ""}`
          }
          to="/calendar"
          data-testid="nav-calendar"
        >
          Calendar
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.navLink} ${isActive || active === "settings" ? styles.active : ""}`
          }
          to="/settings"
          data-testid="nav-settings"
        >
          Settings
        </NavLink>
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
