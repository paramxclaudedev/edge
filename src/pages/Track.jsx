import { Moon, Brain, Utensils, Zap } from "lucide-react";
import { today } from "../lib/data.js";

const blocks = [
  {
    id: "rest",
    title: "Rest",
    Icon: Moon,
    items: [
      {
        label: "Sleep",
        value: `${today.rest.sleepHrs} hrs`,
        hint: "target 7.5–8",
      },
      { label: "Recovery", value: `${today.rest.recovery}%`, hint: "Whoop" },
      { label: "HRV", value: `${today.rest.hrv} ms`, hint: "rolling +3" },
      {
        label: "Resting HR",
        value: `${today.rest.rhr} bpm`,
        hint: "rolling -1",
      },
    ],
  },
  {
    id: "focus",
    title: "Focus",
    Icon: Brain,
    items: [
      {
        label: "Deep work",
        value: `${today.focus.deepMin} min`,
        hint: `target ${today.focus.target}`,
      },
      {
        label: "Sessions",
        value: `${today.focus.sessions}`,
        hint: "≥45 min each",
      },
      { label: "First task", value: "07:42", hint: "before 9am ✓" },
      { label: "Distractions", value: "6", hint: "phone unlocks" },
    ],
  },
  {
    id: "fuel",
    title: "Fuel",
    Icon: Utensils,
    items: [
      { label: "Calories", value: `${today.fuel.kcal}`, hint: "target 1800" },
      { label: "Protein", value: `${today.fuel.protein} g`, hint: "1g/lb ✓" },
      { label: "Water", value: `${today.fuel.water} L`, hint: "target 3" },
      { label: "Alcohol", value: `${today.fuel.alcohol}`, hint: "0 = clean" },
    ],
  },
  {
    id: "output",
    title: "Output",
    Icon: Zap,
    items: [
      { label: "Commits", value: `${today.output.commits}`, hint: "GitHub" },
      { label: "Words", value: `${today.output.words}`, hint: "drafted today" },
      { label: "Ships", value: `${today.output.ships}`, hint: "in production" },
      { label: "Calls", value: "2", hint: "≥15 min" },
    ],
  },
];

export default function Track() {
  return (
    <div className="rise">
      <header className="page-head">
        <div className="eyebrow">All inputs · live</div>
        <h1>Track.</h1>
        <div className="sub">
          The four boards. Plug in Whoop, Apple Health, GitHub, or log by hand.
        </div>
      </header>

      {blocks.map((b, i) => (
        <div key={b.id} className={`card rise rise-${(i % 4) + 1}`}>
          <div className="card-head">
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: "var(--ink)",
              }}
            >
              <b.Icon size={15} strokeWidth={1.6} color="var(--accent)" />
              <span
                className="card-title"
                style={{ color: "var(--ink)", fontSize: 14 }}
              >
                {b.title}
              </span>
            </span>
            <span className="card-meta">demo · today</span>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0,1fr))",
              gap: "var(--step-3)",
            }}
          >
            {b.items.map((it) => (
              <div
                key={it.label}
                style={{
                  padding: "12px 14px",
                  border: "1px solid var(--hair)",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--bg)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 9.5,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                  }}
                >
                  {it.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--display)",
                    fontWeight: 700,
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                    lineHeight: 1,
                  }}
                >
                  {it.value}
                </span>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10.5,
                    color: "var(--text-2)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {it.hint}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
