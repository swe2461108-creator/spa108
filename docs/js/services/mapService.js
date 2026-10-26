function flattenTextValues(value) {
  if (value === null || value === undefined) {
    return [];
  }

  if (
    typeof value === "string" ||
    typeof value === "number"
  ) {
    const text = String(value).trim();
    return text ? [text] : [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(flattenTextValues);
  }

  if (typeof value === "object") {
    return Object.values(value).flatMap(
      flattenTextValues
    );
  }

  return [];
}

function getProvinceValues(item) {
  return [
    ...flattenTextValues(item?.province),
    ...flattenTextValues(item?.province_name),
    ...flattenTextValues(item?.province_name_en),
    ...flattenTextValues(item?.province_name_mn),
    ...flattenTextValues(item?.province_code),
    ...flattenTextValues(item?.provinceName),
    ...flattenTextValues(item?.aimag),
    ...flattenTextValues(item?.aimag_name),
  ];
}