import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../../icons";
import { useClickOutside } from "../../../hooks";
import { Modal } from "../../ui";
import styles from "./ProfileDropdown.module.css";

export interface ProfileDropdownProps {
  name?: string;
  email?: string;
  plan?: string;
  initials?: string;
}

export function ProfileDropdown({
  name = "Mykyta Nemetskov",
  email = "mykyta@example.com",
  plan = "Pro Plan",
  initials = "MN",
}: ProfileDropdownProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useClickOutside(menuRef, () => setProfileOpen(false), profileOpen);

  const requestLogout = () => {
    setProfileOpen(false);
    setLogoutOpen(true);
  };

  const confirmLogout = () => {
    setLogoutOpen(false);
    navigate("/login");
  };

  return (
    <>
      <div className={styles.profileMenuWrap} ref={menuRef}>
        <button
          className={`${styles.profileButton} ${profileOpen ? styles.open : ""}`}
          type="button"
          aria-expanded={profileOpen}
          aria-haspopup="menu"
          onClick={() => setProfileOpen((prev) => !prev)}
        >
          <span className={styles.avatar}>{initials}</span>
          <span className={styles.profileCopy}>
            <strong>{name}</strong>
            <small>Personal account</small>
          </span>
          <Icon name="chevron" />
        </button>

        {profileOpen && (
          <div className={styles.profileDropdown} role="menu">
            <div className={styles.profileDropdownHeader}>
              <span className={styles.avatar}>{initials}</span>
              <div>
                <strong>{name}</strong>
                <small>{email}</small>
              </div>
              <span className={styles.proPlanBadge}>{plan}</span>
            </div>
            <div className={styles.profileMenuItems}>
              <Link role="menuitem" to="/settings" onClick={() => setProfileOpen(false)}>
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
            <div className={styles.profileLogoutWrap}>
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

      <Modal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="Log Out of SubTrack?"
        icon={<Icon name="logout" />}
      >
        <p
          style={{
            color: "var(--color-text-muted)",
            fontSize: "14px",
            lineHeight: "1.5",
          }}
        >
          Are you sure you want to log out of your account?
        </p>
        <div className={styles.dialogActions}>
          <button
            className={styles.logoutCancel}
            type="button"
            onClick={() => setLogoutOpen(false)}
          >
            Cancel
          </button>
          <button className={styles.logoutConfirm} type="button" onClick={confirmLogout}>
            Log Out
          </button>
        </div>
      </Modal>
    </>
  );
}
