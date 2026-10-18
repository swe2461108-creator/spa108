import { DATA_MODE, LOCAL_NUTRITIONS_URL, API_NUTRITIONS_URL } from "../config.js";

export async function getNutritions() {
  const url = DATA_MODE === "local" ? new URL(LOCAL_NUTRITIONS_URL, window.location.href).href : API_NUTRITIONS_URL;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Хүнсний мэдээлэл татахад алдаа гарлаа: ${response.status} (${url})`);
  }

  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.nutritions)) {
    return data.nutritions;
  }

  if (Array.isArray(data.foods)) {
    return data.foods;
  }

  throw new Error("JSON файлд хүнсний мэдээллийн массив олдсонгүй.");
}
