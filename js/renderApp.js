/**
 * renderApp.js
 *
 * ONLY builds HTML.
 * No localStorage.
 * No timers.
 * No event listeners.
 * 
 * floating timer button in the buttom right
 * timer panel opens/closes
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

export default function renderApp(root, state) {
  let todos;
  todos = Array.isArray(state.todos) ? state.todos : [];

  let timeText;
  timeText = formatTime(state.timer.secondsLeft);

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

        <div class="timer-time">${timeText}</div>

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