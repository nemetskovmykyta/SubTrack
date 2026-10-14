import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Icon } from "../../icons";
import { useClickOutside } from "../../../hooks";
import { Modal } from "../../ui";

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
    navigate("/");
  };

  return (
    <>
      <div className="profile-menu-wrap" ref={menuRef}>
        <button
          className={`profile-button ${profileOpen ? "open" : ""}`}
          type="button"
          aria-expanded={profileOpen}
          aria-haspopup="menu"
          onClick={() => setProfileOpen((prev) => !prev)}
        >
          <span className="avatar">{initials}</span>
          <span className="profile-copy">
            <strong>{name}</strong>
            <small>Personal account</small>
          </span>
          <Icon name="chevron" />
        </button>

        {profileOpen && (
          <div className="profile-dropdown" role="menu">
            <div className="profile-dropdown-header">
              <span className="avatar">{initials}</span>
              <div>
                <strong>{name}</strong>
                <small>{email}</small>
              </div>
              <span className="pro-plan-badge">{plan}</span>
            </div>
            <div className="profile-menu-items">
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

      <Modal
        isOpen={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="Log Out of SubTrack?"
        icon={<Icon name="logout" />}
      >
        <p>Are you sure you want to log out of your account?</p>
        <div>
          <button className="logout-cancel" type="button" onClick={() => setLogoutOpen(false)}>
            Cancel
          </button>
          <button className="logout-confirm" type="button" onClick={confirmLogout}>
            Log Out
          </button>
        </div>
      </Modal>
    </>
  );
}
