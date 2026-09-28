(() => {
  "use strict";

  const PAGE_SIZE = 10;
  const seedUsers = [
    [
      "0513",
      "John",
      "Doe",
      "JohnDoe@Email.com",
      "Admin",
      "NY",
      "Corporate",
      "2025-05-01",
    ],
    [
      "1681",
      "Mike",
      "Harry",
      "Mikeharry@Email.com",
      "Admin",
      "NY",
      "Corporate",
      "2025-05-02",
      "2025-05-05",
    ],
    [
      "0123",
      "Jess",
      "Lambert",
      "JLambert91@Email.com",
      "Licensed",
      "NY",
      "Corporate",
      "2025-05-01",
    ],
    [
      "8415",
      "Yor",
      "Plan",
      "YorP@Email.com",
      "Forward",
      "NY",
      "Corporate",
      "2025-05-15",
    ],
    [
      "6512",
      "Kim",
      "Jeun",
      "KimJ99@Email.com",
      "Recruiter",
      "NY",
      "Corporate",
      "2025-05-15",
      "2025-05-16",
    ],
    [
      "1874",
      "Harry",
      "Styles",
      "HarrySS@Email.com",
      "Forward",
      "NY",
      "Corporate",
      "2025-06-01",
    ],
    [
      "6301",
      "Fulgur",
      "Metane",
      "FulgurMet@Email.com",
      "Forward",
      "NY",
      "Corporate",
      "2025-06-02",
    ],
    [
      "4328",
      "Sarah",
      "Chen",
      "SarahC@Email.com",
      "Admin",
      "CA",
      "West",
      "2025-06-10",
    ],
    [
      "9987",
      "David",
      "Park",
      "DavidP@Email.com",
      "Licensed",
      "CA",
      "West",
      "2025-06-12",
    ],
    [
      "7764",
      "Maria",
      "Santos",
      "MariaS@Email.com",
      "Recruiter",
      "TX",
      "South",
      "2025-06-15",
    ],
    [
      "2046",
      "Olivia",
      "Bennett",
      "OliviaB@Email.com",
      "Admin",
      "IL",
      "Midwest",
      "2025-06-18",
    ],
    [
      "3157",
      "Noah",
      "Williams",
      "NoahW@Email.com",
      "Licensed",
      "NY",
      "Corporate",
      "2025-06-20",
    ],
    [
      "4268",
      "Amelia",
      "Patel",
      "AmeliaP@Email.com",
      "Recruiter",
      "TX",
      "South",
      "2025-06-22",
    ],
    [
      "5379",
      "Liam",
      "Garcia",
      "LiamG@Email.com",
      "Forward",
      "CA",
      "West",
      "2025-06-25",
    ],
    [
      "6480",
      "Sophia",
      "Wilson",
      "SophiaW@Email.com",
      "Licensed",
      "IL",
      "Midwest",
      "2025-07-01",
    ],
    [
      "7591",
      "Ethan",
      "Nguyen",
      "EthanN@Email.com",
      "Recruiter",
      "CA",
      "West",
      "2025-07-03",
    ],
    [
      "8602",
      "Isabella",
      "Reed",
      "IsabellaR@Email.com",
      "Admin",
      "NY",
      "Corporate",
      "2025-07-05",
    ],
    [
      "9713",
      "Lucas",
      "Martin",
      "LucasM@Email.com",
      "Forward",
      "TX",
      "South",
      "2025-07-08",
    ],
    [
      "1824",
      "Mia",
      "Thompson",
      "MiaT@Email.com",
      "Licensed",
      "IL",
      "Midwest",
      "2025-07-10",
    ],
    [
      "2935",
      "Oliver",
      "Kim",
      "OliverK@Email.com",
      "Recruiter",
      "CA",
      "West",
      "2025-07-12",
    ],
    [
      "3046",
      "Charlotte",
      "Davis",
      "CharlotteD@Email.com",
      "Admin",
      "TX",
      "South",
      "2025-07-15",
    ],
    [
      "4157",
      "James",
      "Anderson",
      "JamesA@Email.com",
      "Licensed",
      "NY",
      "Corporate",
      "2025-07-18",
    ],
    [
      "5268",
      "Ava",
      "Robinson",
      "AvaR@Email.com",
      "Forward",
      "IL",
      "Midwest",
      "2025-07-20",
    ],
    [
      "6379",
      "Benjamin",
      "Lee",
      "BenjaminL@Email.com",
      "Recruiter",
      "CA",
      "West",
      "2025-07-22",
    ],
  ];
  const users = seedUsers.map(
    (
      [
        id,
        firstName,
        lastName,
        email,
        group,
        division,
        region,
        submittedDate,
        enabledDate = submittedDate,
      ],
      index,
    ) => ({
      id,
      firstName,
      lastName,
      email,
      group,
      division,
      region,
      submittedDate,
      userType: index % 4 === 2 ? "External" : "Internal",
      enabled: ![11, 14, 18, 22].includes(index),
      enabledDate: [11, 14, 18, 22].includes(index) ? "" : enabledDate,
    }),
  );
  const state = { page: 1, editingId: null, pendingDisableId: null };
  const byId = (id) => document.getElementById(id);
  const controls = {
    search: byId("search"),
    field: byId("search-field"),
    status: byId("status-filter"),
    division: byId("division-filter"),
    region: byId("region-filter"),
  };
  const form = byId("user-form");
  const userFields = [...form.querySelectorAll("[required]")];
  const touchedFields = new Set();
  userFields.forEach((field) => {
    const feedback = document.createElement("div");
    feedback.id = `${field.id}-error`;
    feedback.className = "invalid-feedback";
    field.insertAdjacentElement("afterend", feedback);
    field.setAttribute(
      "aria-describedby",
      [field.getAttribute("aria-describedby"), feedback.id]
        .filter(Boolean)
        .join(" "),
    );
  });
  const userModal = new bootstrap.Modal(byId("user-modal"));
  const confirmModal = new bootstrap.Modal(byId("confirm-modal"));
  const moduleModal = new bootstrap.Modal(byId("module-modal"));
  let notificationTimer;
  let returnFocus;
  let userModalReady = false;

  function getFilteredUsers() {
    const query = controls.search.value.trim().toLowerCase();
    return users.filter((user) => {
      const fields =
        controls.field.value === "all"
          ? [
              user.id,
              user.firstName,
              user.lastName,
              `${user.firstName} ${user.lastName}`,
              user.email,
              user.group,
              user.division,
              user.region,
              user.userType,
            ]
          : [user[controls.field.value]];
      return (
        fields.some((value) => String(value).toLowerCase().includes(query)) &&
        (controls.status.value === "all" ||
          user.enabled === (controls.status.value === "enabled")) &&
        (controls.division.value === "all" ||
          user.division === controls.division.value) &&
        (controls.region.value === "all" ||
          user.region === controls.region.value)
      );
    });
  }

  function formatDate(value) {
    if (!value) return "—";
    const [year, month, day] = value.split("-");
    return `${month}/${day}/${year}`;
  }

  function today() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function createAction(user, action, label, icon) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "action-button";
    button.dataset.action = action;
    button.dataset.id = user.id;
    button.setAttribute(
      "aria-label",
      `${label} ${user.firstName} ${user.lastName}`,
    );
    button.title = `${label} user`;
    // Only fixed, internal icon names enter markup. User values are always textContent.
    button.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#${icon}"/></svg>`;
    return button;
  }

  function createUserRow(user) {
    const row = document.createElement("tr");
    if (!user.enabled) row.className = "disabled-user";
    const values = [
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.group,
      user.division,
      user.region,
      user.userType,
      formatDate(user.submittedDate),
      formatDate(user.enabledDate),
    ];
    values.forEach((value, index) => {
      const cell = row.insertCell();
      cell.textContent = value;
      cell.className = "cell-truncate";
      cell.title = value;
      if (index === 7 && !user.enabled) {
        const badge = document.createElement("span");
        badge.className = "status-disabled";
        badge.textContent = "Disabled";
        cell.append(badge);
      }
    });
    const actions = document.createElement("div");
    actions.className = "row-actions";
    actions.append(
      createAction(user, "edit", "Edit", "edit"),
      createAction(
        user,
        "toggle",
        user.enabled ? "Disable" : "Enable",
        user.enabled ? "ban" : "check",
      ),
    );
    row.insertCell().append(actions);
    return row;
  }

  function renderPagination(totalPages) {
    const pagination = byId("pagination");
    pagination.replaceChildren();
    const addPageButton = (label, page, disabled, current = false) => {
      const item = document.createElement("li");
      item.className = `page-item${disabled ? " disabled" : ""}${current ? " active" : ""}`;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "page-link";
      button.textContent = label;
      button.dataset.page = page;
      button.disabled = disabled;
      button.setAttribute(
        "aria-label",
        /^\d+$/.test(label) ? `Page ${label}` : `${label} page`,
      );
      if (current) button.setAttribute("aria-current", "page");
      item.append(button);
      pagination.append(item);
    };
    addPageButton("Previous", state.page - 1, state.page === 1);
    // Keep controls bounded even after many additions.
    const firstPage = Math.max(1, Math.min(state.page - 2, totalPages - 4));
    for (
      let page = firstPage;
      page <= Math.min(totalPages, firstPage + 4);
      page++
    ) {
      addPageButton(String(page), page, false, state.page === page);
    }
    addPageButton("Next", state.page + 1, state.page === totalPages);
  }

  function renderUsers() {
    const filtered = getFilteredUsers();
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    // Mutations can remove the last result on a page; clamp before slicing.
    state.page = Math.min(state.page, totalPages);
    const start = (state.page - 1) * PAGE_SIZE;
    const visible = filtered.slice(start, start + PAGE_SIZE);
    const rows = byId("user-rows");
    rows.replaceChildren(...visible.map(createUserRow));
    if (!visible.length) {
      const cell = rows.insertRow().insertCell();
      cell.colSpan = 11;
      cell.className = "empty-state";
      cell.innerHTML =
        "<strong>No users found</strong><span>Try another search or clear your filters.</span>";
    }
    const summary = `Showing ${filtered.length ? start + 1 : 0} to ${Math.min(start + PAGE_SIZE, filtered.length)} of ${filtered.length} entries`;
    byId("results-summary").textContent =
      summary +
      (filtered.length !== users.length
        ? ` (filtered from ${users.length})`
        : "");
    renderPagination(totalPages);
  }

  function notify(message) {
    clearTimeout(notificationTimer);
    byId("notification").textContent = message;
    byId("notification").classList.add("visible");
    notificationTimer = setTimeout(
      () => byId("notification").classList.remove("visible"),
      5500,
    );
  }

  function openUserModal(user = null) {
    userModalReady = false;
    returnFocus = document.activeElement;
    state.editingId = user?.id ?? null;
    form.reset();
    touchedFields.clear();
    byId("validation-summary").hidden = true;
    userFields.forEach((field) => showFieldError(field, ""));
    if (user) {
      for (const key of [
        "firstName",
        "lastName",
        "email",
        "group",
        "userType",
        "division",
        "region",
      ]) {
        form.elements.namedItem(key).value = user[key];
      }
      form.elements.namedItem("status").value = user.enabled
        ? "enabled"
        : "disabled";
    }
    byId("user-modal-title").textContent = user ? "Edit User" : "Add User";
    byId("save-user").textContent = user ? "Save Changes" : "Add User";
    userModal.show();
  }

  function showFieldError(field, message) {
    field.setCustomValidity(message);
    field.classList.toggle("is-invalid", Boolean(message));
    if (message) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
    byId(`${field.id}-error`).textContent = message;
  }

  function getFieldError(field) {
    const value = field.value.trim();
    const label = field.labels[0].textContent.trim();
    if (!value)
      return `${field.tagName === "SELECT" ? "Select" : "Enter"} ${label.toLowerCase()}.`;
    if (field.maxLength > 0 && value.length > field.maxLength) {
      return `Use ${field.maxLength} characters or fewer.`;
    }
    if (["firstName", "lastName"].includes(field.name)) {
      // Support international names, initials, apostrophes and hyphens.
      if (!/\p{L}/u.test(value) || !/^[\p{L}\p{M}\s.'’\-]+$/u.test(value)) {
        return "Use letters, spaces, apostrophes, hyphens or periods.";
      }
    }
    if (field.name === "email") {
      const [local = "", domain = ""] = value.split("@");
      const domainLabels = domain.split(".");
      if (
        field.validity.typeMismatch ||
        local.length > 64 ||
        local.startsWith(".") ||
        local.endsWith(".") ||
        local.includes("..") ||
        domainLabels.length < 2 ||
        domainLabels.some(
          (part) => !/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(part),
        ) ||
        !/^[a-z]{2,63}$/i.test(domainLabels.at(-1))
      ) {
        return "Enter a valid email address, such as name@company.com.";
      }
      if (
        users.some(
          (user) =>
            user.id !== state.editingId &&
            user.email.toLowerCase() === value.toLowerCase(),
        )
      ) {
        return "This email is already used. Enter a different address.";
      }
    }
    return "";
  }

  function validateField(field) {
    const message = getFieldError(field);
    showFieldError(field, message);
    return !message;
  }

  function updateValidationSummary() {
    const count = userFields.filter((field) =>
      field.classList.contains("is-invalid"),
    ).length;
    byId("validation-summary").hidden = count === 0;
    byId("validation-summary").textContent =
      `Please check ${count === 1 ? "the highlighted field" : `the ${count} highlighted fields`} before saving.`;
  }

  function validateForm() {
    userFields.forEach((field) => {
      field.value = field.value.trim();
      touchedFields.add(field);
      validateField(field);
    });
    updateValidationSummary();
    const invalid = userFields.find((field) =>
      field.classList.contains("is-invalid"),
    );
    invalid?.focus();
    return !invalid;
  }

  function saveUser(event) {
    event.preventDefault();
    if (!validateForm()) return;
    const existing = users.find((user) => user.id === state.editingId);
    const values = Object.fromEntries(new FormData(form));
    const enabled = values.status === "enabled";
    delete values.status;
    const user = {
      ...values,
      enabled,
      id:
        existing?.id ??
        String(Math.max(...users.map((item) => Number(item.id))) + 1).padStart(
          4,
          "0",
        ),
      submittedDate: existing?.submittedDate ?? today(),
      enabledDate: enabled ? existing?.enabledDate || today() : "",
    };
    if (existing) Object.assign(existing, user);
    else users.unshift(user);
    const filtered = getFilteredUsers();
    const index = filtered.findIndex((item) => item.id === user.id);
    if (index !== -1) state.page = Math.floor(index / PAGE_SIZE) + 1;
    renderUsers();
    userModal.hide();
    notify(
      `${user.firstName} ${user.lastName} ${existing ? "updated" : "added"}.${index === -1 ? " This user is hidden by your current search or filters." : ""}`,
    );
  }

  function setUserEnabled(user, enabled) {
    user.enabled = enabled;
    user.enabledDate = enabled ? today() : "";
    renderUsers();
    notify(
      `${user.firstName} ${user.lastName} ${enabled ? "enabled" : "disabled"}.`,
    );
  }

  function restoreFocus() {
    if (returnFocus?.isConnected) returnFocus.focus();
    else if (returnFocus?.dataset.id) {
      const replacement = [
        ...byId("user-rows").querySelectorAll("button"),
      ].find(
        (button) =>
          button.dataset.id === returnFocus.dataset.id &&
          button.dataset.action === returnFocus.dataset.action,
      );
      (replacement || byId("add-user")).focus();
    } else byId("add-user").focus();
  }

  controls.search.addEventListener("input", () => {
    state.page = 1;
    renderUsers();
  });
  for (const control of [
    controls.field,
    controls.status,
    controls.division,
    controls.region,
  ]) {
    control.addEventListener("change", () => {
      state.page = 1;
      renderUsers();
    });
  }
  byId("clear-filters").addEventListener("click", () => {
    controls.search.value = "";
    for (const key of ["field", "status", "division", "region"])
      controls[key].value = "all";
    state.page = 1;
    renderUsers();
  });
  byId("pagination").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-page]");
    if (!button || button.disabled) return;
    state.page = Number(button.dataset.page);
    renderUsers();
    byId("pagination").querySelector('[aria-current="page"]').focus();
  });
  byId("add-user").addEventListener("click", () => openUserModal());
  byId("focus-search").addEventListener("click", () => controls.search.focus());
  byId("user-rows").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const user = users.find((item) => item.id === button.dataset.id);
    if (!user) return;
    if (button.dataset.action === "edit") openUserModal(user);
    else if (user.enabled) {
      returnFocus = button;
      state.pendingDisableId = user.id;
      byId("confirm-message").textContent =
        `Disable ${user.firstName} ${user.lastName}? You can enable this user again at any time.`;
      confirmModal.show();
    } else {
      returnFocus = button;
      setUserEnabled(user, true);
      restoreFocus();
    }
  });
  byId("confirm-disable").addEventListener("click", () => {
    const user = users.find((item) => item.id === state.pendingDisableId);
    if (user) setUserEnabled(user, false);
    confirmModal.hide();
  });
  form.addEventListener("submit", saveUser);
  form.addEventListener("focusout", (event) => {
    // Opening/closing a dialog can blur the previous field without user input.
    if (
      !userModalReady ||
      !byId("user-modal").classList.contains("show") ||
      !userFields.includes(event.target)
    )
      return;
    touchedFields.add(event.target);
    validateField(event.target);
  });
  for (const eventName of ["input", "change"]) {
    form.addEventListener(eventName, (event) => {
      if (!touchedFields.has(event.target)) return;
      validateField(event.target);
      if (!byId("validation-summary").hidden) updateValidationSummary();
    });
  }
  byId("user-modal").addEventListener("shown.bs.modal", () => {
    byId("first-name").focus();
    userModalReady = true;
  });
  byId("user-modal").addEventListener("hidden.bs.modal", restoreFocus);
  byId("confirm-modal").addEventListener("hidden.bs.modal", () => {
    state.pendingDisableId = null;
    restoreFocus();
  });
  document.querySelectorAll("[data-module]").forEach((button) =>
    button.addEventListener("click", () => {
      returnFocus = button;
      byId("module-title").textContent = button.dataset.module;
      moduleModal.show();
    }),
  );
  byId("module-modal").addEventListener("hidden.bs.modal", restoreFocus);
  renderUsers();
})();
