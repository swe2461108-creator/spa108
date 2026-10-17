import { routes } from "./routes.js";

export function initRouter() {
  window.addEventListener("hashchange", handleRoute);
  window.addEventListener("load", handleRoute);
}

function handleRoute() {
  const hash = window.location.hash.slice(1) || "/";
  const renderPage = routes[hash] || routes["404"];

  const appContainer = document.getElementById("app");
  if (appContainer) {
    appContainer.innerHTML = "";
    renderPage(appContainer);
  }
}

export function navigateTo(path) {
  window.location.hash = path;
}
