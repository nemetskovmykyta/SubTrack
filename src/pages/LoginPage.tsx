import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { BrandMark, MailIcon, LockIcon, EyeIcon, GoogleIcon, AppleIcon } from "../components/icons";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Lab 4 Part 1: basic layout & presentation without business logic
    navigate("/dashboard");
  };

  return (
    <div className={styles.appShell}>
      <div className={`${styles.ambient} ${styles.ambientOne}`} />
      <div className={`${styles.ambient} ${styles.ambientTwo}`} />

      <header className={styles.siteHeader}>
        <div className={styles.brand}>
          <BrandMark />
          <span>SubTrack</span>
        </div>
        <p className={styles.headerText}>Personal Subscription Intelligence</p>
        <div className={styles.languageSwitch}>
          <button type="button" className={styles.active}>
            EN
          </button>
          <span />
          <button type="button">UA</button>
        </div>
      </header>

      <main className={styles.authCard}>
        <div className={styles.cardAccent} />
        <div className={styles.formWrap}>
          <div className={styles.tabs} role="tablist">
            <div
              className={`${styles.tabIndicator} ${activeTab === "register" ? styles.create : ""}`}
            />
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "login"}
              className={`${styles.tabBtn} ${activeTab === "login" ? styles.active : ""}`}
              onClick={() => setActiveTab("login")}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "register"}
              className={`${styles.tabBtn} ${activeTab === "register" ? styles.active : ""}`}
              onClick={() => setActiveTab("register")}
            >
              Create Account
            </button>
          </div>

          <div className={styles.intro}>
            <span className={styles.eyebrow}>
              {activeTab === "login" ? "WELCOME BACK" : "START OPTIMIZING TODAY"}
            </span>
            <h1>{activeTab === "login" ? "Sign in to SubTrack" : "Create your account"}</h1>
            <p>
              {activeTab === "login"
                ? "Take complete control of your recurring subscriptions and expenses."
                : "Track subscriptions, analyze spending, and never miss a renewal."}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label className={styles.fieldLabel} htmlFor="email-input">
              Email Address
            </label>
            <div className={styles.inputShell}>
              <MailIcon />
              <input
                id="email-input"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <label className={styles.fieldLabel} htmlFor="password-input">
              Password
            </label>
            <div className={styles.inputShell}>
              <LockIcon />
              <input
                id="password-input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon hidden={showPassword} />
              </button>
            </div>

            <div className={styles.formOptions}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className={styles.customCheck}>
                  <svg viewBox="0 0 12 12" fill="none">
                    <path d="m2 6 3 3 5-6" />
                  </svg>
                </span>
                Remember this device
              </label>
              <a href="#forgot" className={styles.forgotLink}>
                Forgot password?
              </a>
            </div>

            <button type="submit" className={styles.primaryButton}>
              {activeTab === "login" ? "Sign In to Dashboard" : "Create Account"}
              <span>→</span>
            </button>

            <div className={styles.divider}>
              <span />
              <p>OR CONTINUE WITH</p>
              <span />
            </div>

            <div className={styles.socialButtons}>
              <button
                type="button"
                className={styles.socialBtn}
                onClick={() => navigate("/dashboard")}
              >
                <GoogleIcon /> Google
              </button>
              <button
                type="button"
                className={styles.socialBtn}
                onClick={() => navigate("/dashboard")}
              >
                <AppleIcon /> Apple
              </button>
            </div>

            <p className={styles.legal}>
              By signing in, you agree to SubTrack Terms of Service and Privacy Policy.
            </p>
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        © 2026 SubTrack Inc. All rights reserved. Built with modular CSS.
      </footer>
    </div>
  );
}
