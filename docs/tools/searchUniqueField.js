const fs = require("fs");

const data = JSON.parse(fs.readFileSync("./docs/data/nutritions.json", "utf8"));

const uniqueFields = [...new Set(data.map((item) => item.collection_information["Collection area"]))];

console.log(uniqueFields);
