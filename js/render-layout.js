(() => {
  "use strict";

  const { icons, header, sidebar, users, modals } = window.UserManagement.views;

  // These templates contain only project-owned markup. User data is rendered
  // separately with textContent by app.js after the layout is mounted.
  document.getElementById("app").innerHTML = `
    <a class="skip-link" href="#main-content">Skip to users</a>
    ${icons}
    ${header}
    <div class="workspace-frame">
      <div class="workspace">
        ${sidebar}
        ${users}
      </div>
    </div>
    <div class="notification" id="notification" role="status" aria-live="polite"></div>
    ${modals}
  `;
})();
