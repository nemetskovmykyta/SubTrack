import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="5.5" y="8.5" width="19" height="14" rx="3" />
        <path d="M6 13h18M10 18h4" />
        <path d="M22.5 7a6 6 0 0 1 3.8 2.1l1.2-1.2v4.6h-4.6l1.4-1.4" />
      </svg>
    </div>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="3" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
    </svg>
  );
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
      {hidden && <path d="m4 4 16 16" className="eye-slash" />}
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.38a4.6 4.6 0 0 1-2 3.01v2.53h3.24c1.9-1.75 2.98-4.33 2.98-7.38Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.98-.9 6.63-2.4l-3.25-2.52c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.76-5.61-4.13H3.03v2.6A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.39 13.91A6.01 6.01 0 0 1 6.07 12c0-.66.11-1.3.32-1.91v-2.6H3.03A10 10 0 0 0 2 12c0 1.61.39 3.14 1.03 4.51l3.36-2.6Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.96c1.47 0 2.79.5 3.83 1.5l2.87-2.88A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.97 5.49l3.36 2.6C7.18 7.72 9.39 5.96 12 5.96Z"
      />
    </svg>
  );
}

const copy = {
  en: {
    tagline: "Take control of your recurring expenses.",
    eyebrow: "Your subscriptions, simplified",
    title: "Welcome back",
    subtitle: "Sign in to keep your spending in focus.",
    signIn: "Sign In",
    create: "Create Account",
    email: "Email Address",
    password: "Password",
    remember: "Remember me",
    forgot: "Forgot password?",
    submit: "Sign In to SubTrack",
    createSubmit: "Create your SubTrack account",
    divider: "or continue with",
    google: "Sign in with Google",
    legal: "By continuing, you agree to our Terms and Privacy Policy.",
    show: "Show password",
    hide: "Hide password",
  },
  uk: {
    tagline: "Контролюйте свої регулярні витрати.",
    eyebrow: "Усі підписки — під контролем",
    title: "З поверненням",
    subtitle: "Увійдіть, щоб тримати витрати у фокусі.",
    signIn: "Увійти",
    create: "Створити акаунт",
    email: "Електронна пошта",
    password: "Пароль",
    remember: "Запам’ятати мене",
    forgot: "Забули пароль?",
    submit: "Увійти в SubTrack",
    createSubmit: "Створити акаунт SubTrack",
    divider: "або продовжити через",
    google: "Увійти через Google",
    legal: "Продовжуючи, ви погоджуєтеся з Умовами та Політикою конфіденційності.",
    show: "Показати пароль",
    hide: "Приховати пароль",
  },
};

export default function App() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "create">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState<"en" | "uk">("en");
  const t = copy[language];

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/dashboard");
  };

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="site-header">
        <a className="brand" href="#" aria-label="SubTrack home">
          <BrandMark />
          <span>SubTrack</span>
        </a>
        <p>{t.tagline}</p>
        <div className="language-switch" aria-label="Language">
          <button
            type="button"
            className={language === "en" ? "active" : ""}
            onClick={() => setLanguage("en")}
            aria-pressed={language === "en"}
          >
            EN
          </button>
          <span />
          <button
            type="button"
            className={language === "uk" ? "active" : ""}
            onClick={() => setLanguage("uk")}
            aria-pressed={language === "uk"}
          >
            UA
          </button>
        </div>
      </header>

      <section className="auth-card">
        <div className="card-accent" />
        <div className="form-wrap">
          <div className="tabs" role="tablist" aria-label="Account access">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "signin"}
              className={mode === "signin" ? "active" : ""}
              onClick={() => setMode("signin")}
            >
              {t.signIn}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "create"}
              className={mode === "create" ? "active" : ""}
              onClick={() => setMode("create")}
            >
              {t.create}
            </button>
            <span className={`tab-indicator ${mode}`} />
          </div>

          <div className="intro">
            <span className="eyebrow">{t.eyebrow}</span>
            <h1>{mode === "signin" ? t.title : t.create}</h1>
            <p>{t.subtitle}</p>
          </div>

          <form onSubmit={submitForm}>
            <label htmlFor="email">{t.email}</label>
            <div className="input-shell">
              <MailIcon />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                required
              />
            </div>

            <label htmlFor="password">{t.password}</label>
            <div className="input-shell">
              <LockIcon />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                placeholder="••••••••"
                minLength={8}
                required
              />
              <button
                className="password-toggle"
                type="button"
                aria-label={showPassword ? t.hide : t.show}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                <EyeIcon hidden={showPassword} />
              </button>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="custom-check">
                  <svg viewBox="0 0 12 10" fill="none" aria-hidden="true">
                    <path d="m1 5 3 3 7-7" />
                  </svg>
                </span>
                {t.remember}
              </label>
              <a href="#">{t.forgot}</a>
            </div>

            <button className="primary-button" type="submit">
              {mode === "signin" ? t.submit : t.createSubmit}
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <div className="divider">
            <span />
            <p>{t.divider}</p>
            <span />
          </div>

          <button className="google-button" type="button">
            <GoogleIcon />
            {t.google}
          </button>

          <p className="legal">{t.legal}</p>
        </div>
      </section>

      <footer>© 2025 SubTrack</footer>
    </main>
  );
}
