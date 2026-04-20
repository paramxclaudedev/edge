import { useState, useEffect } from "react";
import { Check, Flame } from "lucide-react";
import { today, week } from "../lib/data.js";

function useEase(target, duration = 1100) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setV(target);
      return;
    }
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(Math.round(target * eased * 10) / 10);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

export default function Today() {
  const [commits, setCommits] = useState(today.commitments);

  const toggle = (id) =>
    setCommits((prev) =>
      prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c)),
    );

  const score = today.edgeScore;
  const animScore = useEase(score);
  const restPct = Math.round((today.rest.sleepHrs / 8) * 100);
  const focusPct = Math.round((today.focus.deepMin / today.focus.target) * 100);

  return (
    <div className="rise">
      <header className="page-head">
        <div className="eyebrow">{today.date} · today</div>
        <h1>Today's edge.</h1>
        <div className="sub">The five things. Tap a tick when it's done.</div>
      </header>

      <div className="card rise rise-1">
        <div className="ring-wrap">
          <div className="ring" style={{ "--pct": animScore }}>
            <div className="ring-inner countup">
              {Math.round(animScore)}
              <small>EDGE</small>
            </div>
          </div>
          <div className="ring-text">
            <h3>You're on pace.</h3>
            <p>
              Rest is up. Focus is short of target. Train block still open. Two
              commits remain.
            </p>
          </div>
        </div>
      </div>

      <div className="metric-row" style={{ marginTop: "var(--step-3)" }}>
        <div className="metric rise rise-2">
          <span className="label">Rest</span>
          <span className="value">
            {today.rest.sleepHrs}
            <span className="unit">hrs</span>
          </span>
          <span className="delta up">recovery {today.rest.recovery}%</span>
          <div className="bar">
            <span style={{ width: `${restPct}%` }} />
          </div>
        </div>
        <div className="metric rise rise-2">
          <span className="label">Focus</span>
          <span className="value">
            {today.focus.deepMin}
            <span className="unit">min deep</span>
          </span>
          <span className="delta">
            {today.focus.sessions} sessions · target {today.focus.target}
          </span>
          <div className="bar">
            <span style={{ width: `${Math.min(focusPct, 100)}%` }} />
          </div>
        </div>
        <div className="metric rise rise-3">
          <span className="label">Fuel</span>
          <span className="value">
            {today.fuel.protein}
            <span className="unit">g protein</span>
          </span>
          <span className="delta">
            {today.fuel.kcal} kcal · {today.fuel.water}L water
          </span>
        </div>
        <div className="metric rise rise-3">
          <span className="label">Output</span>
          <span className="value">
            {today.output.commits}
            <span className="unit">commits</span>
          </span>
          <span className="delta">
            {today.output.words} words · {today.output.ships} ship
          </span>
        </div>
      </div>

      <div className="card rise rise-4">
        <div className="card-head">
          <span className="card-title">Commitments</span>
          <span className="card-meta">
            {commits.filter((c) => c.done).length}/{commits.length} done
          </span>
        </div>
        {commits.map((c) => (
          <div className="commit-row" key={c.id}>
            <button
              className={`commit-tick${c.done ? " on" : ""}`}
              onClick={() => toggle(c.id)}
              aria-label={`mark ${c.text}`}
            >
              {c.done && <Check size={14} strokeWidth={2.5} />}
            </button>
            <span className={`commit-text${c.done ? " done" : ""}`}>
              {c.text}
            </span>
            <span className="commit-streak">
              <Flame
                size={11}
                strokeWidth={1.6}
                style={{
                  display: "inline-block",
                  verticalAlign: -2,
                  marginRight: 3,
                }}
              />
              {c.streak}d
            </span>
          </div>
        ))}
      </div>

      <div className="card rise rise-4" style={{ marginTop: "var(--step-3)" }}>
        <div className="card-head">
          <span className="card-title">7-day Edge</span>
          <span className="card-meta">{week.trend}</span>
        </div>
        <Spark series={week.edge} />
      </div>
    </div>
  );
}

function Spark({ series }) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const range = max - min || 1;
  const w = 100;
  const h = 38;
  const step = w / (series.length - 1);
  const pts = series.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / range) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const path = `M ${pts.join(" L ")}`;
  const area = `${path} L ${w},${h} L 0,${h} Z`;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      style={{ width: "100%", height: 80 }}
    >
      <path d={area} fill="var(--accent-soft)" />
      <path
        d={path}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {series.map((v, i) => (
        <circle
          key={i}
          cx={i * step}
          cy={h - ((v - min) / range) * h}
          r="0.9"
          fill="var(--accent)"
        />
      ))}
    </svg>
  );
}
