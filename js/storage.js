/**
 * storage.js
 *
 * Handles saving and loading todos from localStorage.
 * This file knows NOTHING about UI or events.
 */

let STORAGE_KEY;
STORAGE_KEY = "todoApp.todos";

/**
 * loadTodos()
 * Always returns an array.
 * If something is wrong -> return empty array.
 */
export function loadTodos() {
  let raw;
  let parsed;

  try {
    raw = localStorage.getItem(STORAGE_KEY);

    // Nothing saved yet
    if (!raw) {
      return [];
    }

    parsed = JSON.parse(raw);

    // Safety check
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (err) {
    // If JSON is broken or something unexpected happens
    return [];
  }
}

/**
 * saveTodos(todos)
 * Saves the todos array to localStorage.
 */
export function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
