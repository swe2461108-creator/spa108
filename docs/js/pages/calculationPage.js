import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";

export function renderCalculationPage() {
  return renderPageLayout({
    id: "calculation",
    title: t("calculation.title"),
    content: `
      <div class="calculation-page">
        <p>${t("calculation.welcome")}</p>
      </div>
    `,
  });
}