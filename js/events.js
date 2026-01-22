/**
 * events.js
 * 
 * listens to events and calls handlers
 * does not change state directly
 */

export default function bindEvents(root, handlers) {
  // Add todo
  root.addEventListener("submit", (e) => {
    let form;
    let title;

    form = e.target.closest('[data-action="add-form"]');
    if (!form) return;

    e.preventDefault();

    title = form.title.value.trim();
    if (!title) return;

    handlers["add-todo"](title);
    form.reset();
  });

  // Button clicks
  root.addEventListener("click", (e) => {
    let btn;
    let action;

    btn = e.target.closest("button[data-action]");
    if (!btn) return;

    action = btn.dataset.action;

    // Actions without ids
    if (
      action === "theme-toggle" ||
      action === "timer-toggle-ui" ||
      action === "timer-start" ||
      action === "timer-pause" ||
      action === "timer-reset" ||
      action === "timer-switch"
    ) {
      handlers[action]();
      return;
    }

    // Actions with todo id
    let li;
    let id;

    li = btn.closest(".todo-item");
    if (!li) return;

    id = li.dataset.id;
    handlers[action](id);
  });
}