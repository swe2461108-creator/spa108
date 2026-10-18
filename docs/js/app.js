import { renderNavbar, initNavbar } from "./components/navbar.js";
import { initRouter } from "./router.js";
import { routes } from "./routes.js"; // <-- routes-ийг импортолж оруулна
import { renderSearchPage } from "./pages/searchPage.js";

await renderSearchPage();
const navbarRoot = document.getElementById("navbar");

if (navbarRoot) {
  navbarRoot.innerHTML = renderNavbar();
  initNavbar();
}

// routes замуудыг Router руу дамжуулж ажиллуулна
initRouter(routes);
