import { translations } from "./translations.js";

const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = ["mn", "en", "ko"];

export function getCurrentLanguage() {
  const language = localStorage.getItem("language") || DEFAULT_LANGUAGE;

  return SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
}

export function setLanguage(language) {
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    console.warn(`Дэмжигдээгүй хэл: ${language}`);
    return;
  }

  localStorage.setItem("language", language);
}

export function t(path) {
  const language = getCurrentLanguage();
  const keys = path.split(".");

  let value = translations[language];

  for (const key of keys) {
    value = value?.[key];
  }

  return value ?? path;
}

export function toggleLanguage() {
  const current = getCurrentLanguage();

  const languages = ["mn", "en", "ko"];
  const currentIndex = languages.indexOf(current);
  const next = languages[(currentIndex + 1) % languages.length];

  setLanguage(next);
  return next;
}
