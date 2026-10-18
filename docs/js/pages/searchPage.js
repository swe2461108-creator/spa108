import { getNutritions } from "../services/nutritionService.js";

import { buildFoodGroups, bindSearchEvents, renderDefaultTables, initNutritionData } from "../fn/foodSearchEvents.js";

import { renderSidebarPageLayout } from "../layouts/sidebarPageLayout.js";
import { bindSidebar, bindMenuListToggle } from "../fn/sidebarEvents.js";

import { renderPageLayout } from "../layouts/pageLayout.js";
import { renderNotification } from "../layouts/notificationLayout.js";

import { renderSearchFoodName } from "../components/searchFoodNameSidebar.js";
import { renderSearchSettings } from "../components/searchSettingsSidebar.js";
import { renderFoodGroupList } from "../components/searchFoodGroupListSidebar.js";

export async function renderSearchPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    content: renderNotification("Loading data..."),
  });

  try {
    // JSON өгөгдлийг нэг л удаа татна
    const nutritionData = await getNutritions();

    console.log("JSON data:", nutritionData);
    console.log("Data count:", nutritionData.length);

    // Өгөгдлийг хайлтын функцэд хадгална
    initNutritionData(nutritionData);

    // Хүнсний бүлгүүдийг үүсгэнэ
    const groupedFoods = buildFoodGroups(nutritionData);

    // Эхний хүснэгтүүдийг үүсгэнэ
    const defaultHtml = renderDefaultTables(nutritionData);

    console.log("Default table HTML:", defaultHtml);

    // Хуудсыг харуулна
    app.innerHTML = renderSidebarPageLayout({
      sidebarContent: `
        ${renderSearchFoodName()}
        ${renderSearchSettings()}
        ${renderFoodGroupList(groupedFoods)}
      `,
      pageId: "search",
      pageTitle: "Food Composition Database",
      mainContent: `
        <div id="resultTbl">
          ${defaultHtml}
        </div>
      `,
    });

    bindSidebar();
    bindMenuListToggle();
    bindSearchEvents();
  } catch (error) {
    console.error("Failed to load nutrition data:", error);

    app.innerHTML = renderPageLayout({
      content: renderNotification("Failed to load nutrition data. Please check the console.", "danger"),
    });
  }
}
