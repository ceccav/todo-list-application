/**
 * app.js
 * 
 * holds state
 * calls render
 * connects events
 */

import renderApp from "./renderApp.js";
import bindEvents from "./events.js";
import { loadTheme, applyTheme, toggleTheme } from "./theme.js";
import { loadTodos, saveTodos } from "./storage.js";

/**
 * uid()
 * Creates a unique id for each todo.
 */
function uid() {
  return crypto.randomUUID();
}

export default function startApp(root) {
  let state;

  // Initial state
  state = {
    theme: loadTheme(),
    todos: loadTodos(),
  };

  // Safety: make sure todos is always an array
  if (!Array.isArray(state.todos)) {
    state.todos = [];
  }

  // Apply theme on startup
  applyTheme(state.theme);

  /**
   * render()
   * Calls renderApp with current state.
   */
  function render() {
    renderApp(root, state);
  }

  /**
   * handlers
   * Functions that events.js is allowed to call.
   */
  let handlers;
  handlers = {
    "theme-toggle": () => {
      state.theme = toggleTheme(state.theme);
      applyTheme(state.theme);
      render();
    },

    "add-todo": (title) => {
      let todo;

      todo = {
        id: uid(),
        title: title,
        done: false,
        createdAt: Date.now(),
      };

      // New todos go on top
      state.todos = [todo, ...state.todos];
      saveTodos(state.todos);
      render();
    },

    "toggle-done": (id) => {
      state.todos = state.todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      );

      // Move done todos to the bottom
      state.todos = [
        ...state.todos.filter((t) => !t.done),
        ...state.todos.filter((t) => t.done),
      ];

      saveTodos(state.todos);
      render();
    },

    "delete-todo": (id) => {
      state.todos = state.todos.filter((t) => t.id !== id);
      saveTodos(state.todos);
      render();
    },
  };

  // Connect UI events to handlers
  bindEvents(root, handlers);

  // First render
  render();
}