import { Link } from "react-router";
import { Icon } from "../../icons";
import { Logo } from "../Logo/Logo";
import { ProfileDropdown } from "../ProfileDropdown/ProfileDropdown";

export interface DashboardNavProps {
  active: "dashboard" | "analytics" | "calendar" | "settings";
  onAddSubscription?: () => void;
}

export function DashboardNav({ active, onAddSubscription }: DashboardNavProps) {
  return (
    <header className="dashboard-nav" data-testid="dashboard-nav">
      <Logo />
      <nav aria-label="Primary navigation">
        <Link
          className={active === "dashboard" ? "active" : ""}
          to="/dashboard"
          data-testid="nav-dashboard"
        >
          Dashboard
        </Link>
        <Link
          className={active === "analytics" ? "active" : ""}
          to="/analytics"
          data-testid="nav-analytics"
        >
          Analytics
        </Link>
        <Link
          className={active === "calendar" ? "active" : ""}
          to="/calendar"
          data-testid="nav-calendar"
        >
          Calendar
        </Link>
        <Link
          className={active === "settings" ? "active" : ""}
          to="/settings"
          data-testid="nav-settings"
        >
          Settings
        </Link>
      </nav>
      <div className="nav-actions">
        <button className="notification-button" type="button" aria-label="Notifications">
          <Icon name="bell" />
          <span />
        </button>
        <button
          className="add-subscription"
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
