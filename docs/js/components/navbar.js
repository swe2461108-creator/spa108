import { getCurrentLanguage, toggleLanguage, t } from "../i18n/i18n.js";

export function renderNavbar() {
  const language = getCurrentLanguage();

  const labels = {
    mn: {
      overview: "Тойм",
      search: "Хайх",
      calculation: "Хүнсний тооцоолуур",
      books: "Ном",
      contact: "Холбоо барих",
    },
    en: {
      overview: "Overview",
      search: "Search",
      calculation: "Food Calculator",
      books: "Books",
      contact: "Contact us",
    },
    ko: {
      overview: "개요",
      search: "검색",
      calculation: "식품 계산기",
      books: "도서",
      contact: "문의하기",
    },
  };

  const text = labels[language] || labels.en;

  return `
    <header class="app-sticky app-shadow">
      <nav class="navbar" role="navigation"
           aria-label="main navigation">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item has-text-weight-bold is-uppercase app-logo"
               href="#/overview">
              <figure class="image">
                <img src="./img/icon/icon.png" alt="logo" />
              </figure>
              <p><span>Mongolian</span> Food Composition Database</p>
            </a>

            <a class="navbar-burger" role="button"
               aria-expanded="false" data-target="topNavbar">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div class="navbar-menu has-text-weight-semibold
                      has-text-centered" id="topNavbar">
            <div class="navbar-start app-top-navbar-right">

              <a class="navbar-item" href="#/overview">
                <span class="icon has-text-warning">
                  <i class="fas fa-circle-question"></i>
                </span>
                <span>${text.overview}</span>
              </a>

              <a class="navbar-item" href="#/search">
                <span class="icon has-text-primary">
                  <i class="fas fa-search"></i>
                </span>
                <span>${text.search}</span>
              </a>

              <a class="navbar-item" href="#/calculation">
                <span class="icon has-text-link">
                  <i class="fas fa-calculator"></i>
                </span>
                <span>${text.calculation}</span>
              </a>

              <a class="navbar-item" href="#/books">
                <span class="icon has-text-info">
                  <i class="fas fa-book"></i>
                </span>
                <span>${text.books}</span>
              </a>

              <a class="navbar-item" href="#/contact">
                <span class="icon has-text-danger">
                  <i class="fas fa-address-card"></i>
                </span>
                <span>${text.contact}</span>
              </a>

            </div>

            <div class="navbar-end">
              <a class="navbar-item" href="#"
                 id="languageToggle"
                 aria-label="Change language">
                ${language.toUpperCase()} 🌐
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `;
}

export function initNavbar() {
  const languageButton = document.getElementById("languageToggle");

  if (languageButton) {
    languageButton.addEventListener("click", (event) => {
      event.preventDefault();
      toggleLanguage();
      window.location.reload();
    });
  }

  const burger = document.querySelector(".navbar-burger");
  const menu = document.getElementById("topNavbar");

  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");

    const isExpanded = burger.classList.contains("is-active");
    burger.setAttribute("aria-expanded", String(isExpanded));
  });
}
