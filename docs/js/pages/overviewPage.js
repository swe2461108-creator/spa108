import { renderPageLayout } from "../layouts/pageLayout.js";
import { t } from "../i18n/i18n.js";

export function renderOverviewPage() {
  return renderPageLayout({
    id: "overview",
    title: t("overview.title"),
    content: `
      <p>${t("overview.welcome")}</p>
    `,
  });
}
