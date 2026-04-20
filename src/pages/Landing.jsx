import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Moon, Brain, Utensils, Zap } from "lucide-react";
import BrandMark from "../components/BrandMark.jsx";
import CustomCursor from "../components/CustomCursor.jsx";
import Reveal from "../components/Reveal.jsx";
import CountUp from "../components/CountUp.jsx";
import MiniDash from "../components/MiniDash.jsx";
import { principles, tracks } from "../lib/data.js";

const trackIcons = { rest: Moon, focus: Brain, fuel: Utensils, output: Zap };

const tickerItems = [
  { k: "Edge", v: "78" },
  { k: "Sleep", v: "7.4h" },
  { k: "Recovery", v: "71%" },
  { k: "HRV", v: "52ms" },
  { k: "Deep", v: "95min" },
  { k: "Protein", v: "122g" },
  { k: "Water", v: "2.1L" },
  { k: "Commits", v: "4" },
  { k: "Words", v: "720" },
  { k: "Streak", v: "14d" },
  { k: "Pace", v: "+9%" },
];

export default function Landing({ theme, toggleTheme }) {
  const nav = useNavigate();

  return (
    <div className="landing">
      <CustomCursor />

      <nav className="landing-nav">
        <button className="landing-brand" onClick={() => nav("/")}>
          <span className="brand-mark" style={{ color: "var(--accent)" }}>
            <BrandMark size={20} />
          </span>
          <span>Edge</span>
        </button>
        <div className="landing-nav-actions">
          <span className="build-badge" aria-hidden="true">
            <span className="pulse" />
            built apr 2026 · live demo
          </span>
          <button className="btn btn-ghost" onClick={toggleTheme}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button className="btn btn-primary" onClick={() => nav("/app")}>
            Open the demo
            <ArrowUpRight size={14} strokeWidth={2} />
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-eyebrow">
          <span className="dot" />
          <span className="eyebrow">A daily operating system</span>
        </div>

        <h1 style={{ marginBottom: "var(--step-5)" }}>
          <span className="kine">
            <span style={{ animationDelay: "60ms" }}>What's</span>
          </span>{" "}
          <span className="kine">
            <span style={{ animationDelay: "180ms" }}>required</span>
          </span>{" "}
          <span className="kine">
            <span style={{ animationDelay: "260ms" }}>to</span>
          </span>
          <br />
          <span className="kine">
            <span
              style={{
                animationDelay: "380ms",
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--accent)",
                letterSpacing: "-0.02em",
              }}
            >
              get ahead.
            </span>
          </span>
        </h1>

        <p
          className="hero-lede rise rise-3"
          style={{ animationDelay: "560ms" }}
        >
          A quiet dashboard for the four things that actually compound: rest,
          focus, fuel, and output. No quizzes. No upsells. No streak guilt. Just
          the inputs.
        </p>
        <div
          className="hero-cta rise rise-4"
          style={{ animationDelay: "680ms" }}
        >
          <button
            className="btn btn-primary btn-lg"
            onClick={() => nav("/app")}
          >
            Open the demo
            <ArrowUpRight size={15} strokeWidth={2} />
          </button>
          <button
            className="btn btn-line btn-lg"
            onClick={() =>
              document
                .getElementById("manifesto")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Read the manifesto
          </button>
        </div>
        <div
          className="hero-meta rise rise-4"
          style={{ animationDelay: "780ms" }}
        >
          <span className="meta-item">
            <span className="meta-tick">✓</span> No account
          </span>
          <span className="meta-item">
            <span className="meta-tick">✓</span> Private by default
          </span>
          <span className="meta-item">
            <span className="meta-tick">✓</span> One-time purchase, never ads
          </span>
        </div>
      </section>

      {/* live mini-dashboard preview */}
      <MiniDash />

      {/* live ticker */}
      <div
        className="ticker"
        aria-hidden="true"
        style={{ marginTop: "var(--step-8)" }}
      >
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="ticker-item">
              <span className="pip" />
              <span className="k">{t.k}</span>
              <span className="v">{t.v}</span>
            </span>
          ))}
        </div>
      </div>

      <section className="manifesto" id="manifesto">
        <div className="manifesto-inner">
          {principles.map((p, i) => (
            <Reveal key={p.num} className="manifesto-line" delay={i * 80}>
              <span className="num">{p.num}</span>
              {p.lead} <strong>{p.strong}</strong>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal className="section-head">
          <div>
            <h2>
              Four inputs.
              <br />
              <span style={{ color: "var(--text-2)", fontWeight: 500 }}>
                Everything else is downstream.
              </span>
            </h2>
          </div>
          <p>
            Most apps measure what's easy to measure. Edge measures what
            compounds — and stops.
          </p>
        </Reveal>
        <div className="tracks">
          {tracks.map((t, i) => {
            const Icon = trackIcons[t.id];
            return (
              <Reveal key={t.id} className="track-card" delay={i * 90}>
                <span className="glyph">
                  <Icon size={20} strokeWidth={1.5} />
                </span>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
                <span className="stat">{t.stat}</span>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="proof">
        <div className="proof-inner">
          <p className="proof-pitch">
            Three minutes a morning.
            <br />
            <em>Five units of work that count.</em>
          </p>
          <div className="proof-stat">
            <span className="num">
              <CountUp to={4} />
            </span>
            <span className="label">Inputs tracked</span>
          </div>
          <div className="proof-stat">
            <span className="num">
              <CountUp to={28} suffix="d" />
            </span>
            <span className="label">Rolling pace</span>
          </div>
          <div className="proof-stat">
            <span className="num">
              <CountUp to={0} />
            </span>
            <span className="label">Notifications</span>
          </div>
        </div>
      </section>

      <section className="section section-quiet">
        <Reveal>
          <div
            style={{
              border: "1px solid var(--hair-2)",
              borderRadius: "var(--radius-lg)",
              background: "var(--surface)",
              padding: "var(--step-7)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--step-4)",
              alignItems: "flex-start",
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            <span className="eyebrow">Now in demo</span>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 38px)", maxWidth: 520 }}>
              Try it with sample data.
              <br />
              <span style={{ color: "var(--text-2)", fontWeight: 500 }}>
                No sign-up. No email. Open and look.
              </span>
            </h2>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => nav("/app")}
              style={{ marginTop: 8 }}
            >
              Open the dashboard
              <ArrowUpRight size={15} strokeWidth={2} />
            </button>
          </div>
        </Reveal>
      </section>

      <footer className="foot">
        EDGE · BUILT IN BANGALORE · APR 2026 · DEMO BUILD ·{" "}
        <span style={{ color: "var(--accent)" }}>v0.0.1</span>
      </footer>
    </div>
  );
}
