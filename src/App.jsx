import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon, Activity, Layers, TrendingUp } from "lucide-react";
import BrandMark from "./components/BrandMark.jsx";

const Landing = lazy(() => import("./pages/Landing.jsx"));
const Today = lazy(() => import("./pages/Today.jsx"));
const Track = lazy(() => import("./pages/Track.jsx"));
const Pace = lazy(() => import("./pages/Pace.jsx"));

const THEME_KEY = "edge-theme";

const tabs = [
  { path: "/app", label: "Today", Icon: Activity },
  { path: "/app/track", label: "Track", Icon: Layers },
  { path: "/app/pace", label: "Pace", Icon: TrendingUp },
];

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.dataset.theme || "light";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* private mode */
    }
  }, [theme]);
  return {
    theme,
    toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
  };
}

function Skel() {
  return (
    <div className="page-skel">
      <div className="skel skel-h" />
      <div className="skel skel-c" />
      <div className="skel skel-c" style={{ opacity: 0.7 }} />
    </div>
  );
}

function AppShell({ theme, toggleTheme }) {
  const nav = useNavigate();
  const loc = useLocation();
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="primary navigation">
        <button
          type="button"
          className="sidebar-brand"
          onClick={() => nav("/")}
          aria-label="Edge home"
        >
          <span style={{ color: "var(--accent)" }}>
            <BrandMark size={18} />
          </span>
          <div>
            <div className="sidebar-title">Edge</div>
            <div className="sidebar-eyebrow">DAILY · DEMO</div>
          </div>
        </button>

        <nav className="sidebar-nav">
          {tabs.map((t) => {
            const active = loc.pathname === t.path;
            return (
              <button
                key={t.path}
                className={`sidebar-link${active ? " active" : ""}`}
                onClick={() => nav(t.path)}
                aria-current={active ? "page" : undefined}
              >
                <span className="sidebar-link-icon">
                  <t.Icon size={15} strokeWidth={active ? 2 : 1.5} />
                </span>
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-foot">
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 10,
              color: "var(--muted)",
              letterSpacing: "0.08em",
            }}
          >
            edge.demo
          </span>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <Sun size={13} strokeWidth={1.6} />
            ) : (
              <Moon size={13} strokeWidth={1.6} />
            )}
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Suspense fallback={<Skel />}>
          <Routes>
            <Route path="" element={<Today />} />
            <Route path="track" element={<Track />} />
            <Route path="pace" element={<Pace />} />
          </Routes>
        </Suspense>
      </main>

      <button
        type="button"
        className="theme-toggle mobile-theme"
        onClick={toggleTheme}
        aria-label={`switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        {theme === "dark" ? (
          <Sun size={14} strokeWidth={1.6} />
        ) : (
          <Moon size={14} strokeWidth={1.6} />
        )}
      </button>

      <nav className="bottom-nav" aria-label="primary navigation mobile">
        {tabs.map((t) => {
          const active = loc.pathname === t.path;
          return (
            <button
              key={t.path}
              className={active ? "on" : ""}
              onClick={() => nav(t.path)}
              aria-current={active ? "page" : undefined}
            >
              <t.Icon size={17} strokeWidth={active ? 2 : 1.5} />
              {t.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default function App() {
  const { theme, toggle } = useTheme();
  return (
    <Suspense fallback={<Skel />}>
      <Routes>
        <Route
          path="/"
          element={<Landing theme={theme} toggleTheme={toggle} />}
        />
        <Route
          path="/app/*"
          element={<AppShell theme={theme} toggleTheme={toggle} />}
        />
      </Routes>
    </Suspense>
  );
}
