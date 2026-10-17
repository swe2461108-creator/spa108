export function renderPageLayout({ id, title, content }) {
  return `
    <section id="${id}" class="section">
      <div class="container">
        <h1 class="title">${title}</h1>
        <div class="content">
          ${content}
        </div>
      </div>
    </section>
  `;
}
