/**
 * renderApp.js
 * 
 * Builds HTML
 */

export default function renderApp(root, state) {
  root.innerHTML = `
    <div class="app">
      <header class="header">
        <div>
          <h1 class="title">Todos for Today</h1>
          <p class="subtitle">Clean UI first, features step by step.</p>
        </div>

        <div class="header-actions">
          <button class="btn btn-ghost" type="button" data-action="theme-toggle">
            ${state.theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <main class="content">
        <section class="card">
          <p class="muted">
            Next: add todos (add / toggle done / delete).
          </p>
        </section>
      </main>
    </div>
  `;
}