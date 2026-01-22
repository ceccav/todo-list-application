/**
 * renderApp.js
 *
 * ONLY builds HTML.
 * No localStorage.
 * No timers.
 * No event listeners.
 */

/**
 * escapeHtml(str)
 * Prevents user input from becoming HTML.
 */
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export default function renderApp(root, state) {
  // Safety fallback
  let todos;
  todos = Array.isArray(state.todos) ? state.todos : [];

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
            <input
              name="title"
              placeholder="Add a task…"
              autocomplete="off"
            />
            <button>Add</button>
          </form>

          <ul class="todo-list">
            ${todos
      .map(
        (t) => `
              <li
                class="todo-item ${t.done ? "done" : ""}"
                data-id="${t.id}"
              >
                <button
                  class="checkbox"
                  data-action="toggle-done"
                  aria-label="Toggle done"
                ></button>

                <span class="todo-title">
                  ${escapeHtml(t.title)}
                </span>

                <button
                  class="delete"
                  data-action="delete-todo"
                  aria-label="Delete"
                >
                  ×
                </button>
              </li>
            `
      )
      .join("")}
          </ul>
        </section>
      </main>
    </div>
  `;
}
