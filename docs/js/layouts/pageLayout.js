import { renderNavbar, initNavbar } from "../components/navbar.js";
import { renderFooter } from "../components/footer.js";

export function renderPageLayout(contentHtml) {
  return `
    ${renderNavbar()}
    <main class="section">
      <div class="container">
        ${contentHtml}
      </div>
    </main>
    ${renderFooter()}
  `;
}

export function initPageLayout() {
  initNavbar();
}
