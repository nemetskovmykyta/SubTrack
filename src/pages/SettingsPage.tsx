import { FormEvent, useState } from "react";
import { DashboardNav } from "../components/layout";
import { Icon } from "../components/icons";
import { Toggle } from "../components/ui";
import { IconName } from "../types";
import styles from "./SettingsPage.module.css";

interface SettingsNavItem {
  label: string;
  icon: IconName;
  target: string;
}

const SETTINGS_NAVIGATION: SettingsNavItem[] = [
  { label: "Profile & Account", icon: "user", target: "profile" },
  { label: "Preferences & Currency", icon: "sliders", target: "preferences" },
  { label: "Notifications & Reminders", icon: "bell", target: "notifications" },
  { label: "Security & Password", icon: "security", target: "security" },
  { label: "Integrations & Export", icon: "upload", target: "integrations" },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [autoConvert, setAutoConvert] = useState(true);
  const [emailReminders, setEmailReminders] = useState(true);
  const [telegramNotifications, setTelegramNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const goToSection = (target: string) => {
    setActiveSection(target);
    document.getElementById(target)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const saveSettings = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return (
    <main className={styles.settingsShell}>
      <DashboardNav active="settings" />

      <div className={styles.settingsContent}>
        <div className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>PERSONALIZE SUBTRACK</span>
            <h1>Account Settings</h1>
            <p>Manage your profile, preferences, and payment notifications.</p>
          </div>
          <div className={styles.accountChip}>
            <span className={styles.avatar}>MN</span>
            <div>
              <strong>Mykyta Nemetskov</strong>
              <small>Personal account</small>
            </div>
          </div>
        </div>

        <div className={styles.settingsLayout}>
          <aside className={styles.navigationCard}>
            <div className={styles.navHeading}>
              <span>
                <Icon name="settings" />
              </span>
              <div>
                <strong>Settings</strong>
                <small>Account preferences</small>
              </div>
            </div>
            <nav className={styles.navMenu} aria-label="Settings categories">
              {SETTINGS_NAVIGATION.map((item) => (
                <button
                  className={`${styles.navBtn} ${
                    activeSection === item.target ? styles.active : ""
                  }`}
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
            <div className={styles.helpBox}>
              <span className={styles.helpBadge}>?</span>
              <div>
                <strong>Need help?</strong>
                <small>Visit the support center</small>
              </div>
            </div>
          </aside>

          <form className={styles.settingsForm} onSubmit={saveSettings}>
            <section className={styles.settingsSection} id="profile">
              <div className={styles.sectionHeading}>
                <span className={`${styles.metricIcon} ${styles.indigo}`}>
                  <Icon name="user" />
                </span>
                <div>
                  <h2>Profile Information</h2>
                  <p>Update your personal details and profile photo.</p>
                </div>
              </div>

              <div className={styles.avatarSetting}>
                <span className={styles.largeAvatar}>MN</span>
                <div className={styles.avatarInfo}>
                  <strong>Mykyta Nemetskov</strong>
                  <small>JPG, GIF or PNG. Max size 2 MB.</small>
                </div>
                <button type="button" className={styles.changeAvatarBtn}>
                  <Icon name="upload" /> Change Avatar
                </button>
              </div>

              <div className={styles.fieldsGrid}>
                <label className={styles.formGroup}>
                  <span>Full Name</span>
                  <input type="text" defaultValue="Mykyta Nemetskov" />
                </label>
                <label className={styles.formGroup}>
                  <span>Email Address</span>
                  <input type="email" defaultValue="mykyta@example.com" />
                </label>
              </div>
            </section>

            <section className={styles.settingsSection} id="preferences">
              <div className={styles.sectionHeading}>
                <span className={`${styles.metricIcon} ${styles.blue}`}>
                  <Icon name="sliders" />
                </span>
                <div>
                  <h2>Preferences & Currency</h2>
                  <p>Configure how SubTrack displays and converts your spending.</p>
                </div>
              </div>

              <div className={styles.fieldsGrid}>
                <label className={styles.formGroup}>
                  <span>Primary Display Currency</span>
                  <div className={styles.selectWrap}>
                    <select defaultValue="UAH">
                      <option value="UAH">UAH (Ukrainian Hryvnia)</option>
                      <option value="USD">USD (US Dollar)</option>
                      <option value="EUR">EUR (Euro)</option>
                    </select>
                    <Icon name="chevron" />
                  </div>
                </label>
                <label className={styles.formGroup}>
                  <span>Language</span>
                  <div className={styles.selectWrap}>
                    <select defaultValue="UK-EN">
                      <option value="UK-EN">Ukrainian / English</option>
                      <option value="UK">Ukrainian</option>
                      <option value="EN">English</option>
                    </select>
                    <Icon name="chevron" />
                  </div>
                </label>
              </div>

              <div className={styles.toggleRow}>
                <div>
                  <strong>Auto-convert foreign currencies</strong>
                  <small>Convert USD and EUR subscriptions using current NBU exchange rates.</small>
                </div>
                <Toggle
                  checked={autoConvert}
                  onChange={() => setAutoConvert((v) => !v)}
                  label="Auto-convert foreign currencies"
                />
              </div>
            </section>

            <section className={styles.settingsSection} id="notifications">
              <div className={styles.sectionHeading}>
                <span className={`${styles.metricIcon} ${styles.amber}`}>
                  <Icon name="bell" />
                </span>
                <div>
                  <h2>Notification Settings</h2>
                  <p>Choose when and where you receive payment reminders.</p>
                </div>
              </div>

              <div className={styles.toggleRow}>
                <div>
                  <strong>Email reminders before upcoming payments</strong>
                  <small>Receive reminders at mykyta@example.com.</small>
                </div>
                <Toggle
                  checked={emailReminders}
                  onChange={() => setEmailReminders((v) => !v)}
                  label="Email payment reminders"
                />
              </div>

              <div className={styles.formGroup} style={{ marginTop: "16px" }}>
                <span>Remind me</span>
                <div className={styles.selectWrap}>
                  <select defaultValue="1">
                    <option value="1">1 day before payment</option>
                    <option value="3">3 days before payment</option>
                    <option value="7">7 days before payment</option>
                  </select>
                  <Icon name="chevron" />
                </div>
              </div>

              <div className={styles.toggleRow} style={{ marginTop: "16px" }}>
                <div>
                  <strong>Telegram Bot notifications</strong>
                  <small>Instant reminders from @SubTrackBot.</small>
                </div>
                <span className={styles.connectedBadge}>Connected</span>
                <Toggle
                  checked={telegramNotifications}
                  onChange={() => setTelegramNotifications((v) => !v)}
                  label="Telegram Bot notifications"
                />
              </div>
            </section>

            <div className={styles.actionBar}>
              <p>
                {saved
                  ? "Your changes have been saved."
                  : "Unsaved changes will be kept until you leave this page."}
              </p>
              <div className={styles.actionButtons}>
                <button className={styles.cancelBtn} type="reset">
                  Cancel
                </button>
                <button className={`${styles.saveBtn} ${saved ? styles.saved : ""}`} type="submit">
                  {saved ? "Changes Saved" : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
