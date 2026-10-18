export function initRouter(routes) {
  async function renderRoute() {
    const path = location.hash.replace("#", "") || "/";
    const render = routes[path] || routes[404];
    await render();
  }

  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}
