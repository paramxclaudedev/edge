import { grid, today } from "../lib/data.js";

const labelMap = {
  wake: "Wake before 7",
  deep: "2h deep work",
  train: "Train 30+ min",
  read: "Read 20 pages",
  noscreen: "No screens · 10pm",
};

const cellClass = (v) => (v === 2 ? "full" : v === 1 ? "half" : "miss");

const COMMITMENTS = Object.keys(grid);
const N = grid[COMMITMENTS[0]].length;
const MAX_PER_DAY = COMMITMENTS.length * 2;

// daily aggregate score 0..1
const dailyScore = Array.from({ length: N }, (_, d) => {
  const sum = COMMITMENTS.reduce((acc, k) => acc + grid[k][d], 0);
  return sum / MAX_PER_DAY;
});

// catmull-rom-ish smoothed path
function smoothPath(values, w, h, pad = 0) {
  if (values.length === 0) return "";
  const xs = values.map(
    (_, i) => (i / (values.length - 1)) * (w - pad * 2) + pad,
  );
  const ys = values.map((v) => h - pad - v * (h - pad * 2));
  let d = `M ${xs[0].toFixed(2)},${ys[0].toFixed(2)}`;
  for (let i = 0; i < values.length - 1; i++) {
    const x1 = xs[i];
    const y1 = ys[i];
    const x2 = xs[i + 1];
    const y2 = ys[i + 1];
    const cx = (x1 + x2) / 2;
    d += ` C ${cx.toFixed(2)},${y1.toFixed(2)} ${cx.toFixed(2)},${y2.toFixed(2)} ${x2.toFixed(2)},${y2.toFixed(2)}`;
  }
  return d;
}

function River() {
  const W = 800;
  const H = 360;
  const pad = 24;
  const path = smoothPath(dailyScore, W, H, pad);
  const area = `${path} L ${W - pad},${H - pad} L ${pad},${H - pad} Z`;

  const lastX = W - pad;
  const lastY = H - pad - dailyScore[N - 1] * (H - pad * 2);

  // contour layers — slightly offset and faded
  const contours = [0.85, 0.7, 0.55, 0.4].map((mult, i) => {
    const adj = dailyScore.map((v) => v * mult);
    const p = smoothPath(adj, W, H, pad);
    const a = `${p} L ${W - pad},${H - pad} L ${pad},${H - pad} Z`;
    return { p, a, opacity: 0.06 + i * 0.02 };
  });

  // gridlines for compounding reference
  const ref = [0.25, 0.5, 0.75];

  return (
    <div className="river-wrap">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="river-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.34" />
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="now-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {ref.map((r) => {
          const y = H - pad - r * (H - pad * 2);
          return (
            <line
              key={r}
              x1={pad}
              y1={y}
              x2={W - pad}
              y2={y}
              stroke="var(--hair)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />
          );
        })}

        {contours.map((c, i) => (
          <path key={i} d={c.a} fill="var(--accent)" opacity={c.opacity} />
        ))}

        <path d={area} fill="url(#river-fill)" />
        <path
          d={path}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />

        {dailyScore.map((v, i) => {
          const x = (i / (dailyScore.length - 1)) * (W - pad * 2) + pad;
          const y = H - pad - v * (H - pad * 2);
          return <circle key={i} cx={x} cy={y} r="1.6" fill="var(--accent)" />;
        })}

        <circle cx={lastX} cy={lastY} r="42" fill="url(#now-glow)" />
        <circle cx={lastX} cy={lastY} r="6" fill="var(--accent)" />
        <circle cx={lastX} cy={lastY} r="3" fill="var(--bg)" />

        <text
          x={lastX - 6}
          y={lastY - 16}
          textAnchor="end"
          fill="var(--text-2)"
          fontFamily="var(--mono)"
          fontSize="10"
          letterSpacing="2"
        >
          TODAY
        </text>

        <text
          x={pad}
          y={H - 6}
          fill="var(--muted)"
          fontFamily="var(--mono)"
          fontSize="9"
          letterSpacing="1.4"
        >
          28 DAYS AGO
        </text>
        <text
          x={W - pad}
          y={H - 6}
          textAnchor="end"
          fill="var(--muted)"
          fontFamily="var(--mono)"
          fontSize="9"
          letterSpacing="1.4"
        >
          NOW
        </text>
      </svg>
    </div>
  );
}

export default function Pace() {
  const total = Object.values(grid).flat();
  const fullPct = Math.round(
    (total.filter((v) => v === 2).length / total.length) * 100,
  );
  const halfPct = Math.round(
    (total.filter((v) => v === 1).length / total.length) * 100,
  );
  const recent7 = Math.round(
    (dailyScore.slice(-7).reduce((a, b) => a + b, 0) / 7) * 100,
  );
  const prior7 = Math.round(
    (dailyScore.slice(-14, -7).reduce((a, b) => a + b, 0) / 7) * 100,
  );
  const trend = recent7 - prior7;

  return (
    <div className="rise">
      <header className="page-head">
        <div className="eyebrow">Last 28 days</div>
        <h1>Pace.</h1>
        <div className="sub">
          The river. Each peak is a full day. Valleys are the days you slipped.
        </div>
      </header>

      <div className="card rise rise-1">
        <div className="card-head">
          <span className="card-title">Compounding river</span>
          <span className="card-meta">
            {trend >= 0 ? "+" : ""}
            {trend} pts vs previous week
          </span>
        </div>
        <River />
        <div className="river-key">
          <span>
            <span className="swatch" style={{ background: "var(--accent)" }} />
            Daily aggregate
          </span>
          <span>
            <span
              className="swatch"
              style={{
                background: "var(--accent)",
                opacity: 0.18,
                height: 6,
              }}
            />
            Compounding mass
          </span>
        </div>
      </div>

      <div className="card rise rise-2">
        <div className="card-head">
          <span className="card-title">Compound rate</span>
          <span className="card-meta">28-day rolling</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: "var(--step-3)",
          }}
        >
          <div>
            <div className="bignum">
              {fullPct}
              <span className="suffix">%</span>
            </div>
            <span
              className="eyebrow"
              style={{ display: "block", marginTop: 6 }}
            >
              Full days
            </span>
          </div>
          <div>
            <div
              className="bignum"
              style={{ color: "var(--text-2)", fontSize: 48 }}
            >
              {halfPct}
              <span className="suffix">%</span>
            </div>
            <span
              className="eyebrow"
              style={{ display: "block", marginTop: 6 }}
            >
              Partial
            </span>
          </div>
          <div>
            <div className="bignum" style={{ fontSize: 48 }}>
              {Math.max(...today.commitments.map((c) => c.streak))}
              <span className="suffix">d</span>
            </div>
            <span
              className="eyebrow"
              style={{ display: "block", marginTop: 6 }}
            >
              Best streak
            </span>
          </div>
        </div>
      </div>

      <div className="card rise rise-3">
        <div className="card-head">
          <span className="card-title">Per commitment</span>
          <span className="card-meta">28 days · left-to-right</span>
        </div>
        {Object.entries(grid).map(([key, days]) => (
          <div
            key={key}
            style={{
              padding: "12px 0",
              borderBottom: "1px solid var(--hair)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <span style={{ fontSize: 13.5, color: "var(--ink)" }}>
                {labelMap[key]}
              </span>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 10.5,
                  color: "var(--muted)",
                  letterSpacing: "0.06em",
                }}
              >
                {days.filter((v) => v === 2).length}/{days.length} full
              </span>
            </div>
            <div className="dot-row">
              {days.map((v, i) => (
                <span key={i} className={`d ${cellClass(v)}`} />
              ))}
            </div>
          </div>
        ))}
        <div className="dot-legend">
          <span>
            <span className="swatch" style={{ background: "var(--accent)" }} />
            Full
          </span>
          <span>
            <span
              className="swatch"
              style={{
                background: "var(--accent-soft)",
                border: "1px solid var(--accent-hair)",
              }}
            />
            Partial
          </span>
          <span>
            <span
              className="swatch"
              style={{ border: "1px solid var(--hair-2)" }}
            />
            Miss
          </span>
        </div>
      </div>

      <div className="card rise rise-4">
        <div className="card-head">
          <span className="card-title">The compounding bet</span>
          <span className="card-meta">vs. doing nothing</span>
        </div>
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 19,
            lineHeight: 1.45,
            color: "var(--ink)",
          }}
        >
          One percent better, 28 days a month, twelve months a year. The math
          works out to roughly 38× over a year. You won't feel it on day three.
          You will feel it in week six.
        </p>
      </div>
    </div>
  );
}
