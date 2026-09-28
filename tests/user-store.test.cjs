const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const context = vm.createContext({ window: {} });
for (const file of ["mock-users.js", "user-store.js"]) {
  vm.runInContext(
    fs.readFileSync(path.join(__dirname, "../js", file), "utf8"),
    context,
  );
}
const { mockUsers, createUserStore } = context.window.UserManagement;
const createStore = () => createUserStore(mockUsers, () => "2026-09-29");
const input = {
  firstName: "  Ana  ",
  lastName: "Reyes",
  email: "ana@example.com",
  group: "Admin",
  division: "NY",
  region: "Corporate",
  userType: "Internal",
  enabled: true,
};

test("reference records retain leading-zero IDs and distinct activation dates", () => {
  const store = createStore();
  assert.equal(store.count(), 24);
  assert.equal(store.get("0513").firstName, "John");
  assert.equal(store.get("1681").enabledDate, "2025-05-05");
  assert.equal(store.get("6512").enabledDate, "2025-05-16");
});

test("add trims input, generates metadata and returns the newest record first", () => {
  const store = createStore();
  const user = store.save({
    ...input,
    id: "0513",
    submittedDate: "1900-01-01",
  });
  assert.equal(user.firstName, "Ana");
  assert.notEqual(user.id, "0513");
  assert.equal(user.submittedDate, "2026-09-29");
  assert.equal(user.enabledDate, "2026-09-29");
  assert.equal(store.list()[0].id, user.id);
  assert.equal(store.count(), 25);
});

test("editing preserves ID and dates while allowing the existing email", () => {
  const store = createStore();
  const original = store.get("1681");
  const updated = store.save(
    { ...original, firstName: "Michael" },
    original.id,
  );
  assert.equal(updated.id, original.id);
  assert.equal(updated.submittedDate, original.submittedDate);
  assert.equal(updated.enabledDate, original.enabledDate);
  assert.equal(store.count(), 24);
});

test("duplicate emails are rejected on add and edit without mutating records", () => {
  const store = createStore();
  assert.throws(
    () => store.save({ ...input, email: "JOHNDOE@EMAIL.COM" }),
    /already used/,
  );
  assert.throws(
    () => store.save({ ...input, email: "JOHNDOE@EMAIL.COM" }, "1681"),
    /already used/,
  );
  assert.equal(store.get("1681").firstName, "Mike");
  assert.equal(store.count(), 24);
});

test("all required values and boolean status are enforced", () => {
  const store = createStore();
  for (const field of [
    "firstName",
    "lastName",
    "email",
    "group",
    "division",
    "region",
    "userType",
  ]) {
    assert.throws(() => store.save({ ...input, [field]: "  " }), /required/);
  }
  assert.throws(() => store.save({ ...input, enabled: "true" }), /status/);
  assert.equal(store.count(), 24);
});

test("missing IDs cannot accidentally create users during edits or status changes", () => {
  const store = createStore();
  assert.equal(store.get("missing"), null);
  assert.throws(() => store.save(input, "missing"), /no longer exists/);
  assert.throws(() => store.setEnabled("missing", false), /no longer exists/);
  assert.equal(store.count(), 24);
});

test("disable clears activation date and enable uses the current date", () => {
  const store = createStore();
  assert.equal(store.setEnabled("0513", false).enabledDate, "");
  const user = store.setEnabled("0513", true);
  assert.equal(user.enabled, true);
  assert.equal(user.enabledDate, "2026-09-29");
  assert.equal(user.submittedDate, "2025-05-01");
});

test("repeating the same status preserves the activation date", () => {
  const store = createStore();
  assert.equal(store.setEnabled("1681", true).enabledDate, "2025-05-05");
  assert.throws(() => store.setEnabled("1681", 1), /status/);
});

test("saved disabled users have no activation date", () => {
  const store = createStore();
  const user = store.save({ ...input, enabled: false });
  assert.equal(user.enabledDate, "");
  assert.equal(
    store.save({ ...user, enabled: true }, user.id).enabledDate,
    "2026-09-29",
  );
});

test("returned records and separate store instances cannot mutate each other", () => {
  const store = createStore();
  store.get("0513").firstName = "Changed";
  store.list()[0].email = "changed@example.com";
  const added = store.save(input);
  added.firstName = "Changed";
  assert.equal(store.get("0513").firstName, "John");
  assert.equal(store.get(added.id).firstName, "Ana");
  assert.equal(createStore().count(), 24);
});

test("multiple new IDs remain unique and an empty store can accept input", () => {
  const store = createUserStore([], () => "2026-09-29");
  const first = store.save(input);
  const second = store.save({ ...input, email: "another@example.com" });
  assert.equal(first.id, "0001");
  assert.equal(second.id, "0002");
});
