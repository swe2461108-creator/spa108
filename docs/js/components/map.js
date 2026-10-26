import {
  loadMapSvg,
  getFoodsByProvince
} from "../services/mapService.js";

import {
  openModal,
  renderModalFoodList
} from "./infoModal.js";

import {
  t,
  getCurrentLanguage
} from "../i18n/i18n.js";

// Газрын зургийн HTML
export function renderMap() {
  return `
    <div class="map-wrap">
      <div id="svg-container"></div>
    </div>
  `;
}

// Аймгийн нэрс
const provinceNameMap = {
  Uvs: { en: "Uvs", mn: "Увс" },
  Khovd: { en: "Khovd", mn: "Ховд" },
  Dornod: { en: "Dornod", mn: "Дорнод" },
  Dornogovi: { en: "Dornogovi", mn: "Дорноговь" },
  Umnugovi: { en: "Umnugovi", mn: "Өмнөговь" },
  Khuvsgul: { en: "Khuvsgul", mn: "Хөвсгөл" },
  Bulgan: { en: "Bulgan", mn: "Булган" },
  Selenge: { en: "Selenge", mn: "Сэлэнгэ" },

  "Darkhan-Uul": {
    en: "Darkhan-Uul",
    mn: "Дархан-Уул"
  },

  Khentii: { en: "Khentii", mn: "Хэнтий" },
  Tuv: { en: "Tuv", mn: "Төв" },

  Ulaanbaatar: {
    en: "Ulaanbaatar",
    mn: "Улаанбаатар"
  },

  Arkhangai: {
    en: "Arkhangai",
    mn: "Архангай"
  },

  Dundgovi: {
    en: "Dundgovi",
    mn: "Дундговь"
  },

  Uvurkhangai: {
    en: "Uvurkhangai",
    mn: "Өвөрхангай"
  },

  Zavkhan: { en: "Zavkhan", mn: "Завхан" },

  "Govi-Altai": {
    en: "Govi-Altai",
    mn: "Говь-Алтай"
  },

  Sukhbaatar: {
    en: "Sukhbaatar",
    mn: "Сүхбаатар"
  },

  Bayankhongor: {
    en: "Bayankhongor",
    mn: "Баянхонгор"
  },

  "Bayan-Ulgii": {
    en: "Bayan-Ulgii",
    mn: "Баян-Өлгий"
  }
};

// Тусгай аймгийн гарчиг
const provinceTitleMap = {
  Ulaanbaatar: {
    en: "Ulaanbaatar city",
    mn: "Улаанбаатар хот"
  }
};

// SVG газрын зургийн нэрсийг орчуулах
function updateMapLabels(svgContainer, lang = "en") {
  svgContainer.querySelectorAll("svg text").forEach((text) => {
    const name = text.textContent.trim();
    const province = provinceNameMap[name];

    if (province) {
      text.textContent = province[lang] || province.en;
    }
  });
}

// Газрын зургийг ачаалж, үйлдлүүдийг холбох
export async function bindMapEvents(
  nutritionData,
  lang = "en"
) {
  const svgContainer =
    document.getElementById("svg-container");

  if (!svgContainer) {
    console.error(
      "Алдаа: #svg-container олдсонгүй."
    );
    return;
  }

  try {
    // SVG газрын зургийг ачаална
    const svgData = await loadMapSvg();

    svgContainer.innerHTML = svgData;

    const svg = svgContainer.querySelector("svg");

    if (!svg) {
      console.error(
        "Алдаа: SVG газрын зураг олдсонгүй."
      );
      return;
    }

    // Аймгийн нэрсийг орчуулна
    updateMapLabels(svgContainer, lang);

    // Аймгийн path элементүүдийг сонгоно
    const provincePaths =
      svg.querySelectorAll("path[name]");

    if (provincePaths.length === 0) {
      console.error(
        "Аймгийн path олдсонгүй. map.svg файлын name/id атрибутыг шалгана уу."
      );
      return;
    }

    // Аймаг тус бүр дээр click event холбоно
    provincePaths.forEach((path) => {
      path.style.cursor = "pointer";

      path.addEventListener("click", () => {
        const rawName =
          path.getAttribute("name")?.trim() ||
          path.getAttribute("id")?.trim();

        if (!rawName) {
          console.warn(
            "Энэ path-д аймгийн нэр алга."
          );
          return;
        }

        // Аймгийн нэрийг үндсэн түлхүүртэй тааруулна
        const provinceKey =
          Object.keys(provinceNameMap).find(
            (key) =>
              key.toLowerCase() ===
              rawName.toLowerCase()
          ) || rawName;

        // Одоогийн хэлний тохиргоо
        const currentLang =
          getCurrentLanguage() || lang || "en";

        // Аймгийн дэлгэц дээрх нэр
        const provinceDisplayName =
          provinceTitleMap[provinceKey]?.[
            currentLang
          ] ||
          provinceNameMap[provinceKey]?.[
            currentLang
          ] ||
          rawName;

        // Тухайн аймгийн хүнсийг хайна
        const matchedFoods = getFoodsByProvince(
          nutritionData,
          provinceKey
        );

        // Хүнсний нэрийг сонгосон хэлээр бэлтгэнэ
        const foods = matchedFoods.map((item) => {
          const foodName = item.food_name;

          return {
            food_code: item.food_code,

            food_name:
              typeof foodName === "object"
                ? foodName?.[currentLang] ||
                  foodName?.mn ||
                  foodName?.en ||
                  ""
                : foodName || ""
          };
        });

        // Мэдээллийн цонх нээнэ
        openModal({
          title: provinceDisplayName,

          content:
            foods.length > 0
              ? renderModalFoodList(foods)
              : `<p class="has-text-grey">${t(
                  "notification.noFoodData"
                )}</p>`
        });
      });
    });
  } catch (error) {
    console.error(
      "Газрын зураг ачаалахад алдаа гарлаа:",
      error
    );
  }
}