/**
 * timer.js
 *
 * Timer logic only.
 * No DOM.
 */

let DEFAULT_FOCUS_SECONDS;
let DEFAULT_BREAK_SECONDS;

DEFAULT_FOCUS_SECONDS = 25 * 60;
DEFAULT_BREAK_SECONDS = 5 * 60;

export function createTimerState() {
  return {
    mode: "focus",
    running: false,
    secondsLeft: DEFAULT_FOCUS_SECONDS,
    endsAt: null,
    focusSeconds: DEFAULT_FOCUS_SECONDS,
    breakSeconds: DEFAULT_BREAK_SECONDS,
  };
}

function getModeDuration(timer) {
  if (timer.mode === "focus") return timer.focusSeconds;
  return timer.breakSeconds;
}

export function startTimer(timer) {
  if (timer.running) return timer;

  return {
    ...timer,
    running: true,
    endsAt: Date.now() + timer.secondsLeft * 1000,
  };
}

export function pauseTimer(timer) {
  if (!timer.running) return timer;

  let now;
  let left;

  now = Date.now();
  left = Math.ceil((timer.endsAt - now) / 1000);

  return {
    ...timer,
    running: false,
    endsAt: null,
    secondsLeft: Math.max(0, left),
  };
}

export function resetTimer(timer) {
  return {
    ...timer,
    running: false,
    endsAt: null,
    secondsLeft: getModeDuration(timer),
  };
}

export function switchMode(timer) {
  let nextMode;
  nextMode = timer.mode === "focus" ? "break" : "focus";

  let next;
  next = {
    ...timer,
    mode: nextMode,
  };

  return resetTimer(next);
}

export function tickTimer(timer) {
  if (!timer.running) return timer;

  let now;
  let left;

  now = Date.now();
  left = Math.ceil((timer.endsAt - now) / 1000);

  if (left <= 0) {
    return switchMode({ ...timer, running: false, endsAt: null });
  }

  return {
    ...timer,
    secondsLeft: left,
  };
}
