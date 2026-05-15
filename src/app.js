import "./styles.css";
import { registerSW } from "./pwa.js";
import Layout from "./components/Layout.js";
import { router, initRouter } from "./router.js";
import { bootSequence, addEffects, revealApp } from "./components/Boot.js";

registerSW();
addEffects();

function render(content) {
  const app = document.getElementById("app");
  if (app) app.innerHTML = Layout(content);
}

bootSequence(() => {
  initRouter(render);
  revealApp();
});
