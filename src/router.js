import Home, { initHome } from "./pages/Home.js";

const routes = { "/": Home };

function NotFound() {
  return `<div class="p-6 text-center text-[#00d4ff]"><h2 class="text-xl font-bold font-[Orbitron]">404 - NOT FOUND</h2></div>`;
}

export function router() {
  let path = location.hash.slice(1) || "/";
  if (!path.startsWith("/")) path = "/" + path;
  return (routes[path] || NotFound)();
}

export function initRouter(render) {
  const update = () => {
    render(router());
    initHome();
  };
  window.addEventListener("hashchange", update);
  update();
}
