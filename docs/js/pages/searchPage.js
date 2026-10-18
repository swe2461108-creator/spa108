import { getNutritions } from "../services/nutritionService.js";

export async function renderSearchPage() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="box">
      <h2 class="title is-4">Search Food</h2>
      <input
        id="food-search"
        class="input mb-4"
        type="search"
        placeholder="Search English or Mongolian food name..."
      />
      <p id="food-count" class="mb-3">Loading data...</p>
      <ul id="food-results"></ul>
    </div>
  `;

  try {
    const nutritions = await getNutritions();

    const searchInput = document.getElementById("food-search");
    const foodCount = document.getElementById("food-count");
    const foodResults = document.getElementById("food-results");

    function displayFoods(query = "") {
      const keyword = query.trim().toLowerCase();

      const filtered = nutritions.filter((item) =>
        [item.food_name, item.native_name, item.food_code, item.food_group].some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(keyword),
        ),
      );

      foodCount.textContent = `Showing ${filtered.length} of ${nutritions.length} foods`;

      foodResults.innerHTML = filtered.length
        ? filtered
            .map(
              (item) => `
            <li class="mb-3">
              <strong>${item.food_name ?? "Unknown food"}</strong>
              <br />
              <span>${item.native_name ?? ""}</span>
              <br />
              <small>
                Code: ${item.food_code ?? ""}
                | ${item.food_group ?? ""}
              </small>
            </li>
          `,
            )
            .join("")
        : "<li>No matching foods found.</li>";
    }

    searchInput.addEventListener("input", (event) => {
      displayFoods(event.target.value);
    });

    displayFoods();
  } catch (error) {
    console.error("Failed to load nutrition data:", error);

    app.innerHTML = `
      <div class="box">
        <h2 class="title is-4">Search Food</h2>
        <p class="has-text-danger">
          Failed to load food data.
        </p>
        <p>${error.message}</p>
      </div>
    `;
  }
}
