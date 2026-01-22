/**
 * main.js
 */

import startApp from "./app.js";

let root;
root = document.getElementById("app");

console.log("[main.js] loaded, root =", root);
startApp(root);