(() => {
  "use strict";

  const editableFields = [
    "firstName",
    "lastName",
    "email",
    "group",
    "division",
    "region",
    "userType",
  ];

  function localDate() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function createUserStore(initialUsers, today = localDate) {
    // Keep records private: callers receive snapshots and write through this API.
    const records = initialUsers.map((user) => ({ ...user }));
    let nextId = Math.max(0, ...records.map((user) => Number(user.id))) + 1;

    function findRecord(id) {
      const record = records.find((user) => user.id === id);
      if (!record)
        throw new Error(
          "This user no longer exists. Refresh the list and try again.",
        );
      return record;
    }

    function save(input, id = null) {
      const existing = id === null ? null : findRecord(id);
      const values = {};
      for (const field of editableFields) {
        if (typeof input[field] !== "string" || !input[field].trim()) {
          throw new Error("Complete all required user fields before saving.");
        }
        values[field] = input[field].trim();
      }
      if (typeof input.enabled !== "boolean")
        throw new Error("Select a valid user status.");
      if (
        records.some(
          (user) =>
            user.id !== id &&
            user.email.toLowerCase() === values.email.toLowerCase(),
        )
      ) {
        throw new Error(
          "This email is already used. Enter a different address.",
        );
      }

      const user = {
        ...values,
        id: existing?.id ?? String(nextId++).padStart(4, "0"),
        enabled: input.enabled,
        submittedDate: existing?.submittedDate ?? today(),
        enabledDate: input.enabled ? existing?.enabledDate || today() : "",
      };
      if (existing) Object.assign(existing, user);
      else records.unshift(user);
      return { ...user };
    }

    function setEnabled(id, enabled) {
      if (typeof enabled !== "boolean")
        throw new Error("Select a valid user status.");
      const user = findRecord(id);
      if (user.enabled !== enabled) {
        user.enabled = enabled;
        user.enabledDate = enabled ? today() : "";
      }
      return { ...user };
    }

    return {
      list: () => records.map((user) => ({ ...user })),
      get: (id) => {
        const user = records.find((record) => record.id === id);
        return user ? { ...user } : null;
      },
      count: () => records.length,
      save,
      setEnabled,
    };
  }

  window.UserManagement = window.UserManagement || {};
  window.UserManagement.createUserStore = createUserStore;
})();
