import { getNutritions } from "../services/nutritionService.js";

import { buildFoodGroups, bindSearchEvents, renderDefaultTables, initNutritionData } from "../fn/foodSearchEvents.js";

import { renderSidebarPageLayout } from "../layouts/sidebarPageLayout.js";
import { bindSidebar, bindMenuListToggle } from "../fn/sidebarEvents.js";

import { renderPageLayout } from "../layouts/pageLayout.js";
import { renderNotification } from "../layouts/notificationLayout.js";

import { renderSearchFoodName } from "../components/searchFoodNameSidebar.js";
import { renderSearchSettings } from "../components/searchSettingsSidebar.js";
import { renderFoodGroupList } from "../components/searchFoodGroupListSidebar.js";

import { loadImages } from "../services/imageService.js";
import { renderImageModal, bindImageModalEvents } from "../components/imageModal.js";

import { t } from "../i18n/i18n.js";

let imageModalBound = false;

export async function renderSearchPage() {
  const app = document.getElementById("app");

  if (!app) {
    console.log("LOADED: searchFoodGroupListSidebar", import.meta.url);
    console.error('Элемент "#app" олдсонгүй.');
    return;
  }

  // Өгөгдөл ачаалж байх үеийн мэдээлэл
  app.innerHTML = renderPageLayout({
    content: renderNotification(t("notification.loadingData")),
  });

  try {
    // 1. Хүнсний найрлагын өгөгдөл ачаална
    const nutritionData = await getNutritions();

    if (!Array.isArray(nutritionData)) {
      throw new Error("Хүнсний өгөгдөл массив хэлбэртэй биш байна.");
    }

    // 2. Хүнсний зургийн өгөгдөл ачаална
    await loadImages();

    // 3. Хайлтын өгөгдлийг тохируулна
    initNutritionData(nutritionData);

    // 4. Хүнсийг бүлгээр ангилна
    const groupedFoods = buildFoodGroups(nutritionData);

    // 5. Хажуугийн цэс болон үндсэн хүснэгтийг зурна
    app.innerHTML =
      renderSidebarPageLayout({
        sidebarContent: `
          ${renderSearchFoodName()}
          ${renderSearchSettings()}
          ${renderFoodGroupList(groupedFoods)}
        `,
        pageId: "search",
        pageTitle: t("searchPage.title"),
        mainContent: `
          <div id="resultTbl">
            ${renderDefaultTables(nutritionData)}
          </div>
        `,
      }) + renderImageModal();

    // 6. Хажуугийн цэсийн үйлдлүүд
    bindSidebar();
    bindMenuListToggle();

    // 7. Хайлтын үйлдлүүд
    bindSearchEvents();

    // 8. Зургийн modal үйлдлийг давхар холбохгүй
    if (!imageModalBound) {
      bindImageModalEvents();
      imageModalBound = true;
    }
  } catch (error) {
    console.error("Хүнсний өгөгдөл ачаалахад алдаа гарлаа:", error);

    app.innerHTML = renderPageLayout({
      content: renderNotification(t("notification.failedToLoadNutritionData"), "danger"),
    });
  }
}
