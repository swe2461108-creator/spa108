
const normalizeName = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFC")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

// Аймгийн англи, монгол нэрс
const PROVINCE_ALIASES = {
  arkhangai: ["arkhangai", "архангай"],
  bayanulgii: ["bayanulgii", "bayan ulgii", "баян өлгий"],
  bayankhongor: ["bayankhongor", "баянхонгор"],
  bulgan: ["bulgan", "булган"],
  govialtai: ["govialtai", "govi altai", "говь алтай"],
  govisumber: ["govisumber", "говьсүмбэр", "говь сүмбэр"],
  "darkhan uul": ["darkhan uul", "дархан уул"],
  dornod: ["dornod", "дорнод"],
  dornogovi: ["dornogovi", "дорноговь"],
  dundgovi: ["dundgovi", "дундговь"],
  zavkhan: ["zavkhan", "завхан"],
  orkhon: ["orkhon", "орхон"],
  uvurkhangai: ["uvurkhangai", "өвөрхангай"],
  umnugovi: ["umnugovi", "өмнөговь"],
  selenge: ["selenge", "сэлэнгэ"],
  sukhbaatar: ["sukhbaatar", "сүхбаатар"],
  tuv: ["tuv", "töv", "tov", "төв"],
  uvs: ["uvs", "увс"],
  khovd: ["khovd", "ховд"],
  khentii: ["khentii", "хэнтий"],
  khuvsgul: ["khuvsgul", "khovsgol", "khövsgöl", "хөвсгөл"],
  ulaanbaatar: ["ulaanbaatar", "улаанбаатар"],
};

function getFoodArray(nutritionData) {
  if (Array.isArray(nutritionData)) return nutritionData;

  for (const key of ["nutritions", "foods", "data", "items"]) {
    if (Array.isArray(nutritionData?.[key])) {
      return nutritionData[key];
    }
  }

  return [];
}

// Хүнсний мөрөөс аймгийн нэрийн боломжит талбаруудыг авна
function getProvinceValues(item) {
  const province = item?.province;

  const values =
    province && typeof province === "object"
      ? [
          province.en,
          province.mn,
          province.name,
          province.name_en,
          province.name_mn,
          province.code,
        ]
      : [province];

  return [
    ...values,
    item?.province_name,
    item?.province_name_en,
    item?.province_name_mn,
    item?.province_code,
    item?.provinceName,
    item?.aimag,
    item?.aimag_name,
  ].filter(
    (value) =>
      value !== null &&
      value !== undefined &&
      String(value).trim() !== ""
  );
}

function getProvinceKeys(name) {
  const normalized = normalizeName(name);

  const entry = Object.entries(PROVINCE_ALIASES).find(
    ([key, aliases]) =>
      normalizeName(key) === normalized ||
      aliases.some(
        (alias) => normalizeName(alias) === normalized
      )
  );

  if (!entry) return [normalized];

  return [
    normalizeName(entry[0]),
    ...entry[1].map(normalizeName),
  ];
}

export function getFoodsByProvince(
  nutritionData,
  provinceNameEn
) {
  const foods = getFoodArray(nutritionData);
  const acceptedNames = getProvinceKeys(provinceNameEn);

  const result = foods.filter((item) =>
    getProvinceValues(item).some((value) =>
      acceptedNames.includes(normalizeName(value))
    )
  );

  console.log("Аймгийн хүнсний мэдээлэл:", {
    selectedProvince: provinceNameEn,
    acceptedNames,
    totalFoods: foods.length,
    matchedFoods: result.length,
    sampleProvince: foods.slice(0, 5).map(
      (item) => item?.province
    ),
  });

  return result;
}

export async function loadMapSvg() {
  const response = await fetch("./img/map.svg");

  if (!response.ok) {
    throw new Error(
      `map.svg ачаалж чадсангүй: ${response.status}`
    );
  }

  return response.text();
}
