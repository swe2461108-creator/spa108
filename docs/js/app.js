import { renderNavbar, initNavbar } from "./components/Navbar.js";
import { initRouter } from "./router.js";

const navbarRoot = document.getElementById("navbar");

if (navbarRoot) {
  navbarRoot.innerHTML = renderNavbar();
  initNavbar();
}

initRouter();
