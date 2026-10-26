
import { translations } from "./translations.js";

const DEFAULT_LANGUAGE = "mn";
const SUPPORTED_LANGUAGES = Object.keys(translations);

// Одоогийн хэлийг авах
export function getCurrentLanguage() {
  const savedLanguage = localStorage.getItem("language");

  return SUPPORTED_LANGUAGES.includes(savedLanguage)
    ? savedLanguage
    : DEFAULT_LANGUAGE;
}

// Хэл солих
export function setLanguage(language) {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    return;
  }

  localStorage.setItem("language", language);
}

// Орчуулгын түлхүүрээр текст авах
export function t(path) {
  const language = getCurrentLanguage();
  const keys = path.split(".");

  let value = translations[language];

  for (const key of keys) {
    value = value?.[key];
  }

  return value ?? path;
}

// Хэлийг дараагийн хэл рүү солих
export function toggleLanguage() {
  const languages = SUPPORTED_LANGUAGES;

  if (languages.length === 0) {
    return DEFAULT_LANGUAGE;
  }

  const current = getCurrentLanguage();
  const index = languages.indexOf(current);
  const next = languages[(index + 1) % languages.length];

  setLanguage(next);

  return next;
}

// Монгол, англи зэрэг хэлний утгаас тохирохыг авах
export function getLocalizedValue(value, fallback = "") {
  const language = getCurrentLanguage();

  if (value == null) {
    return fallback;
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    // { en: "...", mn: "..." } бүтэц
    if ("en" in value || "mn" in value) {
      const picked = value[language] || value.en || value.mn;

      return picked != null && picked !== ""
        ? getLocalizedValue(picked, fallback)
        : fallback;
    }

    // Энгийн объектын утгуудыг боловсруулах
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [
        key,
        getLocalizedValue(val, fallback),
      ])
    );
  }

  return value;
}

// Огноог одоогийн хэлэнд тохируулан харуулах
export function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  const language = getCurrentLanguage();
  const parts = String(dateString).split(/[.-]/);

  let day;
  let month;
  let year;

  // yyyy.mm.dd бүтэц
  if (parts.length === 3 && parts[0].length === 4) {
    [year, month, day] = parts;
  }
  // dd.mm.yyyy бүтэц
  else if (parts.length === 3 && parts[2].length === 4) {
    [day, month, year] = parts;
  } else {
    return dateString;
  }

  day = String(day).padStart(2, "0");
  month = String(month).padStart(2, "0");

  if (language === "mn") {
    return `${year}.${month}.${day}`;
  }

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
