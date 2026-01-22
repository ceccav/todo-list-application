/**
 * theme.js
 * 
 * handles theme
 * loads from localStorage
 * apllies to >html data-theme="...">
 * toggle and save
 */

let THEME_KEY;
THEME_KEY = "todoApp.theme";

export function loadTheme() {
  let saved;

  saved = localStorage.getItem(THEME_KEY);

  if (saved === "light" || saved === "dark") {
    return saved;
  }

  //default theme
  return "dark";
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

export function toggleTheme(currentTheme) {
  let next;

  next = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);

  return next;
}