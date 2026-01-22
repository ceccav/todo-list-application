/**
 * events.js
 * 
 * listens to events and calls handlers
 * does not change state directly
 */

export default function bindEvents(root, handlers) {
  root.addEventListener("click", (e) => {
    let btn;
    let action;

    btn = e.target.closest("button[data-action]");
    if (!btn) return;

    action = btn.dataset.action;

    //if handler exists, call it

    if (handlers[action]) {
      handlers[action]();
    }
  });
}