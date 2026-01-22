/**
 * storage.js
 * 
 * saves and loads todos from localStorage
 */

let STORAGE_KEY;
STORAGE_KEY = "todoApp.todos";

export function loadTodos() {
  let raw;
  let parsed;

  try {
    raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch {
    return [];
  }
}

export function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}