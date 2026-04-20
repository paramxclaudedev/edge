import { useEffect, useState } from "react";

const cycle = [
  {
    score: 78,
    cells: [
      { lab: "Rest", val: "7.4h", pct: 92 },
      { lab: "Focus", val: "95m", pct: 79 },
      { lab: "Fuel", val: "122g", pct: 88 },
      { lab: "Output", val: "4", pct: 70 },
    ],
  },
  {
    score: 84,
    cells: [
      { lab: "Rest", val: "8.1h", pct: 100 },
      { lab: "Focus", val: "120m", pct: 100 },
      { lab: "Fuel", val: "144g", pct: 96 },
      { lab: "Output", val: "5", pct: 88 },
    ],
  },
  {
    score: 62,
    cells: [
      { lab: "Rest", val: "6.0h", pct: 75 },
      { lab: "Focus", val: "60m", pct: 50 },
      { lab: "Fuel", val: "88g", pct: 60 },
      { lab: "Output", val: "2", pct: 38 },
    ],
  },
];

export default function MiniDash() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    const id = setInterval(() => setI((p) => (p + 1) % cycle.length), 2800);
    return () => clearInterval(id);
  }, []);

  const f = cycle[i];

  return (
    <div className="preview-frame">
      <div className="preview-window">
        <div className="preview-bar">
          <div className="preview-dots">
            <span /> <span /> <span />
          </div>
          <span className="url">edge.app · today</span>
          <span style={{ width: 30 }} />
        </div>
        <div className="preview-body">
          <div className="preview-ring-card">
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: 9.5,
                letterSpacing: "0.18em",
                color: "var(--muted)",
                textTransform: "uppercase",
              }}
            >
              Edge score
            </span>
            <div className="preview-ring" style={{ "--pct": f.score }}>
              <span className="num">{f.score}</span>
            </div>
            <span
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                color: "var(--text-2)",
                fontSize: 14,
              }}
            >
              {f.score >= 80
                ? "On pace."
                : f.score >= 70
                  ? "Holding."
                  : "Slipping."}
            </span>
          </div>
          <div className="preview-grid">
            {f.cells.map((c) => (
              <div className="preview-cell" key={c.lab}>
                <span className="lab">{c.lab}</span>
                <span className="val">{c.val}</span>
                <div className="bar2">
                  <span style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="preview-caption">live demo · cycling 3 sample days</div>
    </div>
  );
}
