/**
 * renderApp.js
 *
 * ONLY builds HTML.
 * No localStorage.
 * No timers.
 * No event listeners.
 *
 * Feature 2.1:
 * - Progress ring for the timer (CSS conic-gradient)
 */

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatTime(seconds) {
  let mm;
  let ss;

  mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  ss = String(seconds % 60).padStart(2, "0");

  return `${mm}:${ss}`;
}

/**
 * clamp(n, min, max)
 * Small helper so progress never goes below/above valid range.
 */
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

/**
 * getSessionTotalSeconds(timer)
 * Returns total length for the current mode (focus or break).
 */
function getSessionTotalSeconds(timer) {
  if (timer.mode === "focus") return timer.focusSeconds;
  return timer.breakSeconds;
}

export default function renderApp(root, state) {
  let todos;
  todos = Array.isArray(state.todos) ? state.todos : [];

  let timeText;
  timeText = formatTime(state.timer.secondsLeft);

  // Progress calculation:
  // - total = how long this session is
  // - done = total - secondsLeft
  // - p = done / total (0..1)
  let total;
  let done;
  let p;

  total = getSessionTotalSeconds(state.timer);
  done = total - state.timer.secondsLeft;

  // If total is 0 (should not happen), avoid dividing by zero
  if (total <= 0) {
    p = 0;
  } else {
    p = done / total;
  }

  p = clamp(p, 0, 1);

  root.innerHTML = `
    <div class="app">
      <header class="header">
        <h1 class="title">Todos for Today</h1>

        <button
          class="btn btn-ghost"
          type="button"
          data-action="theme-toggle"
        >
          ${state.theme === "dark" ? "Light" : "Dark"}
        </button>
      </header>

      <main class="content">
        <section class="card">
          <form class="todo-form" data-action="add-form">
            <input name="title" placeholder="Add a task…" autocomplete="off" />
            <button>Add</button>
          </form>

          <ul class="todo-list">
            ${todos
      .map(
        (t) => `
              <li class="todo-item ${t.done ? "done" : ""}" data-id="${t.id}">
                <button class="checkbox" data-action="toggle-done" aria-label="Toggle done"></button>
                <span class="todo-title">${escapeHtml(t.title)}</span>
                <button class="delete" data-action="delete-todo" aria-label="Delete">×</button>
              </li>
            `
      )
      .join("")}
          </ul>
        </section>
      </main>

      <!-- Floating timer button -->
      <button class="timer-fab" type="button" data-action="timer-toggle-ui" aria-label="Open timer">
        ${timeText}
      </button>

      <!-- Timer panel -->
      <section class="timer-panel ${state.isTimerOpen ? "open" : "closed"}">
        <div class="timer-panel-header">
          <h2 class="timer-title">Focus timer</h2>
          <button class="timer-close" type="button" data-action="timer-toggle-ui" aria-label="Close">×</button>
        </div>

        <p class="timer-mode">
          Mode: <b>${state.timer.mode}</b> ${state.timer.running ? "(running)" : "(paused)"}
        </p>

        <!-- Progress ring -->
        <div class="ring-wrap">
          <div class="ring" style="--p:${p};" aria-label="Progress ring">
            <div class="ring-center">
              <div class="ring-time">${timeText}</div>
              <div class="ring-sub">${state.timer.mode}</div>
            </div>
          </div>
        </div>

        <div class="timer-actions">
          <button type="button" data-action="timer-start">Start</button>
          <button type="button" data-action="timer-pause" ${state.timer.running ? "" : "disabled"}>Pause</button>
          <button type="button" data-action="timer-reset">Reset</button>
          <button type="button" data-action="timer-switch">Switch</button>
        </div>
      </section>
    </div>
  `;
}
