// Mock demo data for Edge v0. No real APIs — same shape as a real backend would return.

export const today = {
  date: new Date().toISOString().slice(0, 10),
  edgeScore: 78,
  rest: { recovery: 71, sleepHrs: 7.4, hrv: 52, rhr: 54 },
  focus: { deepMin: 95, sessions: 3, target: 120 },
  fuel: { kcal: 1480, protein: 122, water: 2.1, alcohol: 0 },
  output: { commits: 4, words: 720, ships: 1 },
  commitments: [
    { id: "wake", text: "Wake before 7", done: true, streak: 14 },
    { id: "deep", text: "2h deep work before noon", done: true, streak: 9 },
    { id: "train", text: "Train 30+ min", done: false, streak: 22 },
    { id: "read", text: "Read 20 pages", done: false, streak: 6 },
    { id: "noscreen", text: "No screens after 10pm", done: false, streak: 4 },
  ],
};

export const week = {
  edge: [62, 71, 80, 74, 85, 78, 78],
  rest: [65, 70, 78, 72, 80, 71, 71],
  focus: [80, 95, 110, 100, 130, 95, 95],
  trend: "+9% vs last week",
};

// 28-day commitment grid for Pace tab.
// values: 2=full, 1=half, 0=miss
export const grid = {
  wake: [
    2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1,
    2, 2, 2,
  ],
  deep: [
    2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2,
    2, 2, 2,
  ],
  train: [
    2, 0, 2, 1, 2, 2, 0, 2, 2, 0, 2, 1, 2, 2, 1, 2, 0, 2, 2, 1, 2, 2, 0, 2, 1,
    2, 2, 0,
  ],
  read: [
    1, 1, 2, 0, 2, 1, 2, 0, 2, 1, 1, 2, 0, 2, 2, 0, 1, 2, 1, 2, 0, 1, 2, 0, 2,
    1, 2, 0,
  ],
  noscreen: [
    0, 1, 2, 1, 2, 0, 2, 1, 2, 0, 1, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1,
    0, 2, 0,
  ],
};

export const principles = [
  { num: "01", lead: "Sleep beats", strong: "motivation.", body: "" },
  { num: "02", lead: "Discipline beats", strong: "intent.", body: "" },
  { num: "03", lead: "Reps beat", strong: "genius.", body: "" },
  { num: "04", lead: "Compounding beats", strong: "intensity.", body: "" },
];

export const tracks = [
  {
    id: "rest",
    title: "Rest",
    body: "Sleep, recovery, HRV. Without rest, the rest is theatre.",
    stat: "tracks 6 metrics",
  },
  {
    id: "focus",
    title: "Focus",
    body: "Deep-work blocks, distraction count, time-to-first-task.",
    stat: "ships per week",
  },
  {
    id: "fuel",
    title: "Fuel",
    body: "Protein, calories, hydration, alcohol. The boring inputs.",
    stat: "macros + booze",
  },
  {
    id: "output",
    title: "Output",
    body: "Commits, words, calls, money. What you actually shipped.",
    stat: "five units of work",
  },
];
