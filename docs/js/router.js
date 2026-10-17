import { routes } from "./routes.js";
import { t } from "./i18n/i18n.js";

export function initRouter() {
  function renderRoute() {
    const app = document.getElementById("app");
    if (!app) return;

    const currentRoute = window.location.hash || "#/overview";
    const renderPage = routes[currentRoute];

    if (typeof renderPage === "function") {
      app.innerHTML = renderPage();
      return;
    }

    // Цэс бүрийн тайлбар
    const pageKeys = {
      "#/overview": "overview",
      "#/search": "search",
      "#/calculation": "calculation",
      "#/books": "books",
      "#/contact": "contact",
    };

    const pageKey = pageKeys[currentRoute] || "overview";

    app.innerHTML = `
      <section class="section">
        <div class="container">
          <h1 class="title">${t(`${pageKey}.title`)}</h1>
          <p>${t(`${pageKey}.welcome`)}</p>
        </div>
      </section>
    `;
  }

  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}
