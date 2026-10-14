import { ReactNode, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

type IconName =
  | "bell"
  | "calendar"
  | "chevron"
  | "cloud"
  | "edit"
  | "heart"
  | "help"
  | "logout"
  | "more"
  | "search"
  | "security"
  | "settings"
  | "sliders"
  | "spark"
  | "sport"
  | "trash"
  | "user"
  | "upload"
  | "wallet";

export function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4m8-4v4M3 10h18" />
      </>
    ),
    chevron: <path d="m9 10 3 3 3-3" />,
    cloud: <path d="M17.5 19H7a5 5 0 1 1 1-9.9A6 6 0 0 1 19.7 11 4 4 0 0 1 17.5 19Z" />,
    edit: (
      <>
        <path d="m14 5 5 5M4 20l3.5-.7L20 6.8a1.4 1.4 0 0 0 0-2L19.2 4a1.4 1.4 0 0 0-2 0L4.7 16.5 4 20Z" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.7 9a2.5 2.5 0 1 1 3.8 2.1c-1 .6-1.5 1.1-1.5 2.4M12 17h.01" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5m5 5H3" />
        <path d="M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" />
      </>
    ),
    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    security: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
    sliders: (
      <>
        <path d="M4 6h7m4 0h5M4 12h3m4 0h9M4 18h9m4 0h3" />
        <circle cx="13" cy="6" r="2" />
        <circle cx="9" cy="12" r="2" />
        <circle cx="15" cy="18" r="2" />
      </>
    ),
    spark: <path d="m13 2-1 7-6 3 6 2 1 8 2-7 5-3-5-2-2-8Z" />,
    sport: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m12 3 3 5-3 4-3-4 3-5Zm0 9 5 2 1 5M12 12l-5 2-1 5" />
      </>
    ),
    trash: (
      <>
        <path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7m4 4v6m4-6v6" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4m-4 4 4-4 4 4" />
        <path d="M5 15v4h14v-4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    wallet: (
      <>
        <rect x="3" y="6" width="18" height="14" rx="3" />
        <path d="M3 10h18m-5 5h2" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Logo() {
  return (
    <Link className="dash-brand" to="/">
      <span>
        <Icon name="wallet" />
      </span>
      SubTrack
    </Link>
  );
}

export function DashboardNav({
  active,
}: {
  active: "dashboard" | "analytics" | "calendar" | "settings";
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setLogoutOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const requestLogout = () => {
    setProfileOpen(false);
    setLogoutOpen(true);
  };

  const confirmLogout = () => {
    setLogoutOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="dashboard-nav">
        <Logo />
        <nav aria-label="Primary navigation">
          <Link className={active === "dashboard" ? "active" : ""} to="/dashboard">
            Dashboard
          </Link>
          <Link className={active === "analytics" ? "active" : ""} to="/analytics">
            Analytics
          </Link>
          <Link className={active === "calendar" ? "active" : ""} to="/calendar">
            Calendar
          </Link>
          <Link className={active === "settings" ? "active" : ""} to="/settings">
            Settings
          </Link>
        </nav>
        <div className="nav-actions">
          <button className="notification-button" type="button" aria-label="Notifications">
            <Icon name="bell" />
            <span />
          </button>
          <button className="add-subscription" type="button">
            <span>+</span> Add Subscription
          </button>
          <div className="profile-menu-wrap" ref={profileMenuRef}>
            <button
              className={`profile-button ${profileOpen ? "open" : ""}`}
              type="button"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
              onClick={() => setProfileOpen((value) => !value)}
            >
              <span className="avatar">MN</span>
              <span className="profile-copy">
                <strong>Mykyta Nemetskov</strong>
                <small>Personal account</small>
              </span>
              <Icon name="chevron" />
            </button>

            {profileOpen && (
              <div className="profile-dropdown" role="menu">
                <div className="profile-dropdown-header">
                  <span className="avatar">MN</span>
                  <div>
                    <strong>Mykyta Nemetskov</strong>
                    <small>mykyta@example.com</small>
                  </div>
                  <span className="pro-plan-badge">Pro Plan</span>
                </div>
                <div className="profile-menu-items">
                  <Link
                    role="menuitem"
                    to="/settings#profile"
                    onClick={() => setProfileOpen(false)}
                  >
                    <span>
                      <Icon name="user" />
                    </span>{" "}
                    My Profile
                  </Link>
                  <Link role="menuitem" to="/settings" onClick={() => setProfileOpen(false)}>
                    <span>
                      <Icon name="settings" />
                    </span>{" "}
                    Account Settings
                  </Link>
                  <a role="menuitem" href="#support" onClick={() => setProfileOpen(false)}>
                    <span>
                      <Icon name="help" />
                    </span>{" "}
                    Help & Support
                  </a>
                </div>
                <div className="profile-logout-wrap">
                  <button role="menuitem" type="button" onClick={requestLogout}>
                    <span>
                      <Icon name="logout" />
                    </span>{" "}
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {logoutOpen && (
        <div
          className="logout-overlay"
          role="presentation"
          onMouseDown={() => setLogoutOpen(false)}
        >
          <section
            className="logout-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <span className="logout-dialog-icon">
              <Icon name="logout" />
            </span>
            <h2 id="logout-title">Log Out of SubTrack?</h2>
            <p>Are you sure you want to log out of your account?</p>
            <div>
              <button className="logout-cancel" type="button" onClick={() => setLogoutOpen(false)}>
                Cancel
              </button>
              <button className="logout-confirm" type="button" onClick={confirmLogout}>
                Log Out
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

const subscriptions = [
  {
    name: "SportLife",
    category: "Sport",
    price: "800 UAH",
    icon: "sport" as const,
    tone: "orange",
  },
  {
    name: "iCloud",
    category: "Cloud Storage",
    price: "50 UAH",
    icon: "cloud" as const,
    tone: "blue",
  },
  {
    name: "Patreon",
    category: "Donations",
    price: "150 UAH",
    icon: "heart" as const,
    tone: "coral",
  },
];

export default function DashboardPage() {
  return (
    <main className="dashboard-shell">
      <DashboardNav active="dashboard" />

      <div className="dashboard-content" id="overview">
        <div className="dashboard-heading">
          <div>
            <p className="dash-eyebrow">OVERVIEW</p>
            <h1>Good evening, Mykyta</h1>
            <p>Here’s what’s happening with your subscriptions.</p>
          </div>
          <div className="date-chip">
            <Icon name="calendar" /> December 2025
          </div>
        </div>

        <section className="summary-grid" aria-label="Expense summary">
          <article className="summary-card">
            <div className="card-label">
              <span className="metric-icon indigo">
                <Icon name="wallet" />
              </span>
              <p>Monthly Expenses</p>
              <button type="button" aria-label="More options">
                <Icon name="more" />
              </button>
            </div>
            <h2>
              1,250 <span>UAH</span>
            </h2>
            <div className="metric-note positive">
              <span>↗</span> +5% <em>vs last month</em>
            </div>
            <div className="metric-glow indigo" />
          </article>

          <article className="summary-card">
            <div className="card-label">
              <span className="metric-icon teal">
                <Icon name="spark" />
              </span>
              <p>Yearly Expenses</p>
              <button type="button" aria-label="More options">
                <Icon name="more" />
              </button>
            </div>
            <h2>
              15,000 <span>UAH</span>
            </h2>
            <div className="metric-note">
              <span>12</span> active subscriptions
            </div>
            <div className="metric-glow teal" />
          </article>

          <article className="summary-card upcoming-card">
            <div className="card-label">
              <span className="metric-icon amber">
                <Icon name="calendar" />
              </span>
              <p>Upcoming Payment</p>
              <span className="urgent-badge">Due soon</span>
            </div>
            <div className="upcoming-value">
              <span className="service-logo netflix">N</span>
              <div>
                <h2>Netflix</h2>
                <p>Tomorrow · 200 UAH</p>
              </div>
            </div>
            <div className="metric-glow amber" />
          </article>
        </section>

        <section className="middle-grid">
          <article className="dashboard-card category-card" id="analytics">
            <div className="section-title">
              <div>
                <h2>Expenses by Category</h2>
                <p>Monthly distribution</p>
              </div>
              <button type="button">
                This month <Icon name="chevron" />
              </button>
            </div>
            <div className="chart-content">
              <div className="donut-chart">
                <div>
                  <strong>1,250</strong>
                  <span>UAH total</span>
                </div>
              </div>
              <div className="chart-legend">
                <div>
                  <span className="legend-dot purple" />
                  <p>
                    Entertainment<small>Netflix, Spotify</small>
                  </p>
                  <strong>45%</strong>
                </div>
                <div>
                  <span className="legend-dot blue" />
                  <p>
                    Work<small>Cloud, software</small>
                  </p>
                  <strong>30%</strong>
                </div>
                <div>
                  <span className="legend-dot teal" />
                  <p>
                    Utilities<small>Mobile, internet</small>
                  </p>
                  <strong>25%</strong>
                </div>
              </div>
            </div>
          </article>

          <article className="dashboard-card charges-card">
            <div className="section-title">
              <div>
                <h2>Next Charges</h2>
                <p>Your upcoming payments</p>
              </div>
              <a href="#subscriptions">View all →</a>
            </div>
            <div className="charge-list">
              <div className="charge-row">
                <span className="service-logo netflix">N</span>
                <div>
                  <strong>Netflix</strong>
                  <small>Entertainment</small>
                </div>
                <div className="charge-date">
                  <strong>200 UAH</strong>
                  <small className="tomorrow">Tomorrow</small>
                </div>
              </div>
              <div className="charge-row">
                <span className="service-logo spotify">●</span>
                <div>
                  <strong>Spotify</strong>
                  <small>Entertainment</small>
                </div>
                <div className="charge-date">
                  <strong>150 UAH</strong>
                  <small>In 3 days</small>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section className="dashboard-card subscriptions-card" id="subscriptions">
          <div className="subscriptions-header">
            <div className="section-title">
              <div>
                <h2>Active Subscriptions</h2>
                <p>Manage your recurring payments</p>
              </div>
            </div>
            <div className="table-tools">
              <label className="search-box">
                <Icon name="search" />
                <input
                  type="search"
                  placeholder="Search subscriptions..."
                  aria-label="Search subscriptions"
                />
              </label>
              <button className="filter-button" type="button">
                All categories <Icon name="chevron" />
              </button>
            </div>
          </div>
          <div className="subscription-table">
            <div className="table-head">
              <span>SUBSCRIPTION</span>
              <span>CATEGORY</span>
              <span>BILLING</span>
              <span>STATUS</span>
              <span>ACTIONS</span>
            </div>
            {subscriptions.map((subscription) => (
              <div className="subscription-row" key={subscription.name}>
                <div className="subscription-name">
                  <span className={`subscription-icon ${subscription.tone}`}>
                    <Icon name={subscription.icon} />
                  </span>
                  <strong>{subscription.name}</strong>
                </div>
                <span className="category-cell">{subscription.category}</span>
                <div className="billing-cell">
                  <strong>{subscription.price}</strong>
                  <span>/ mo</span>
                </div>
                <span className="active-badge">
                  <i /> Active
                </span>
                <div className="row-actions">
                  <button type="button" aria-label={`Edit ${subscription.name}`}>
                    <Icon name="edit" />
                  </button>
                  <button type="button" aria-label={`Delete ${subscription.name}`}>
                    <Icon name="trash" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="table-footer">
            <span>Showing 3 of 12 subscriptions</span>
            <a href="#all">View all subscriptions →</a>
          </div>
        </section>
      </div>
    </main>
  );
}
