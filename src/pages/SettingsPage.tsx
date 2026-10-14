import { FormEvent, useState } from "react";
import { DashboardNav, Icon } from "./DashboardPage";

const settingsNavigation = [
  { label: "Profile & Account", icon: "user" as const, target: "profile" },
  { label: "Preferences & Currency", icon: "sliders" as const, target: "preferences" },
  { label: "Notifications & Reminders", icon: "bell" as const, target: "notifications" },
  { label: "Security & Password", icon: "security" as const, target: "security" },
  { label: "Integrations & Export", icon: "upload" as const, target: "integrations" },
];

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      className={`settings-toggle ${checked ? "active" : ""}`}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
    >
      <span />
    </button>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [autoConvert, setAutoConvert] = useState(true);
  const [emailReminders, setEmailReminders] = useState(true);
  const [telegramNotifications, setTelegramNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const goToSection = (target: string) => {
    setActiveSection(target);
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const saveSettings = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <main className="dashboard-shell settings-shell">
      <DashboardNav active="settings" />

      <div className="dashboard-content settings-content">
        <div className="dashboard-heading settings-heading">
          <div>
            <p className="dash-eyebrow">PERSONALIZE SUBTRACK</p>
            <h1>Account Settings</h1>
            <p>Manage your profile, preferences, and payment notifications.</p>
          </div>
          <div className="settings-account-chip">
            <span className="avatar">MN</span>
            <div>
              <strong>Mykyta Nemetskov</strong>
              <small>Personal account</small>
            </div>
          </div>
        </div>

        <div className="settings-layout">
          <aside className="dashboard-card settings-navigation">
            <div className="settings-nav-heading">
              <span>
                <Icon name="settings" />
              </span>
              <div>
                <strong>Settings</strong>
                <small>Account preferences</small>
              </div>
            </div>
            <nav aria-label="Settings categories">
              {settingsNavigation.map((item) => (
                <button
                  className={activeSection === item.target ? "active" : ""}
                  type="button"
                  key={item.target}
                  onClick={() => goToSection(item.target)}
                >
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
                  <b>›</b>
                </button>
              ))}
            </nav>
            <div className="settings-help">
              <span>?</span>
              <div>
                <strong>Need help?</strong>
                <small>Visit the support center</small>
              </div>
            </div>
          </aside>

          <form className="settings-form" onSubmit={saveSettings}>
            <section className="dashboard-card settings-section" id="profile">
              <div className="settings-section-heading">
                <span className="metric-icon indigo">
                  <Icon name="user" />
                </span>
                <div>
                  <h2>Profile Information</h2>
                  <p>Update your personal details and profile photo.</p>
                </div>
              </div>

              <div className="avatar-setting">
                <span className="settings-avatar">MN</span>
                <div>
                  <strong>Mykyta Nemetskov</strong>
                  <small>JPG, GIF or PNG. Max size 2 MB.</small>
                </div>
                <button type="button">
                  <Icon name="upload" /> Change Avatar
                </button>
              </div>

              <div className="settings-fields two-column">
                <label>
                  <span>Full Name</span>
                  <input type="text" defaultValue="Mykyta Nemetskov" />
                </label>
                <label>
                  <span>Email Address</span>
                  <input type="email" defaultValue="mykyta@example.com" />
                </label>
              </div>
            </section>

            <section className="dashboard-card settings-section" id="preferences">
              <div className="settings-section-heading">
                <span className="metric-icon blue">
                  <Icon name="sliders" />
                </span>
                <div>
                  <h2>Preferences & Currency</h2>
                  <p>Configure how SubTrack displays and converts your spending.</p>
                </div>
              </div>

              <div className="settings-fields two-column">
                <label>
                  <span>Primary Display Currency</span>
                  <div className="settings-select">
                    <select defaultValue="UAH">
                      <option value="UAH">UAH (Ukrainian Hryvnia)</option>
                      <option value="USD">USD (US Dollar)</option>
                      <option value="EUR">EUR (Euro)</option>
                    </select>
                    <Icon name="chevron" />
                  </div>
                </label>
                <label>
                  <span>Language</span>
                  <div className="settings-select">
                    <select defaultValue="UK-EN">
                      <option value="UK-EN">Ukrainian / English</option>
                      <option value="UK">Ukrainian</option>
                      <option value="EN">English</option>
                    </select>
                    <Icon name="chevron" />
                  </div>
                </label>
              </div>

              <div className="setting-toggle-row">
                <div>
                  <strong>Auto-convert foreign currencies</strong>
                  <small>
                    Convert USD and EUR subscriptions using the current NBU exchange rate.
                  </small>
                </div>
                <Toggle
                  checked={autoConvert}
                  onChange={() => setAutoConvert((value) => !value)}
                  label="Auto-convert foreign currencies"
                />
              </div>
            </section>

            <section className="dashboard-card settings-section" id="notifications">
              <div className="settings-section-heading">
                <span className="metric-icon amber">
                  <Icon name="bell" />
                </span>
                <div>
                  <h2>Notification Settings</h2>
                  <p>Choose when and where you receive payment reminders.</p>
                </div>
              </div>

              <div className="notification-setting">
                <div>
                  <strong>Email reminders before upcoming payments</strong>
                  <small>Receive a reminder at mykyta@example.com.</small>
                </div>
                <Toggle
                  checked={emailReminders}
                  onChange={() => setEmailReminders((value) => !value)}
                  label="Email payment reminders"
                />
              </div>

              <div className="settings-fields reminder-field">
                <label>
                  <span>Remind me</span>
                  <div className="settings-select">
                    <select defaultValue="1">
                      <option value="1">1 day before payment</option>
                      <option value="3">3 days before payment</option>
                      <option value="7">7 days before payment</option>
                    </select>
                    <Icon name="chevron" />
                  </div>
                </label>
              </div>

              <div className="notification-setting telegram-setting">
                <div>
                  <strong>Telegram Bot notifications</strong>
                  <small>Instant reminders from @SubTrackBot.</small>
                </div>
                <span className="connected-badge">Connected</span>
                <Toggle
                  checked={telegramNotifications}
                  onChange={() => setTelegramNotifications((value) => !value)}
                  label="Telegram Bot notifications"
                />
              </div>
            </section>

            <section className="settings-action-bar">
              <p>
                {saved
                  ? "Your changes have been saved."
                  : "Unsaved changes will be kept until you leave this page."}
              </p>
              <div>
                <button className="cancel-settings" type="reset">
                  Cancel
                </button>
                <button className={`save-settings ${saved ? "saved" : ""}`} type="submit">
                  {saved ? "Changes Saved" : "Save Changes"}
                </button>
              </div>
            </section>
          </form>
        </div>
      </div>
    </main>
  );
}
