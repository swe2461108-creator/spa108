export function renderNotification(message, type = "warning") {
  const allowedTypes = ["warning", "danger", "success", "info", "primary"];
  const safeType = allowedTypes.includes(type) ? type : "warning";

  const safeMessage = String(message ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  return `
    <div class="notification is-light is-${safeType}">
      ${safeMessage}
    </div>
  `;
}
