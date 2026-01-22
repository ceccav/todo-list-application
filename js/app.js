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

export default function startApp(root) {
  console.log("[app.js] startApp called");

  console.log("[app.js] before loadTheme");
  let theme;
  theme = loadTheme();
  console.log("[app.js] after loadTheme, theme =", theme);

  console.log("[app.js] before applyTheme");
  applyTheme(theme);
  console.log("[app.js] after applyTheme");

  function render() {
    console.log("[app.js] render()");
    renderApp(root, { theme: theme });
  }

  let handlers;
  handlers = {
    "theme-toggle": () => {
      theme = toggleTheme(theme);
      applyTheme(theme);
      render();
    },
  };

  console.log("[app.js] before bindEvents");
  bindEvents(root, handlers);
  console.log("[app.js] after bindEvents");

  render();
}
