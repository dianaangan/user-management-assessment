# Developer handoff

## Run and verify

Open `index.html` in a modern browser. No installation, server, or build step is needed. For development, a static server such as VS Code Live Server is also suitable.

If Node.js 18 or newer is installed, run the dependency-free data tests from the project root:

```sh
node --test tests/user-store.test.cjs
```

These tests verify data behavior, not rendered browser layout. Complete the browser checklist below before a release.

## Responsibilities and change locations

- `index.html`: the entry point only: page metadata, assets, deferred scripts, and the app container. Load order is Bootstrap, view templates, layout renderer, mock users, user store, app.
- `js/views/header.js`: top navigation and profile dropdown.
- `js/views/sidebar.js`: management menu and its mobile toggle.
- `js/views/users.js`: user-management heading, search, filters, table skeleton and pagination container.
- `js/views/modals.js`: reusable Add/Edit form, disable confirmation, and out-of-scope module dialog.
- `js/views/icons.js`: shared SVG symbols.
- `js/render-layout.js`: assembles the static views in the app container before behavior initializes. Do not insert user data in these template strings; keep dynamic values in the safe DOM rendering in `app.js`.
- `css/styles.css`: appearance, focus/error styling, modal spacing and responsive breakpoints.
- `js/mock-users.js`: the 24 starting records. Tuple order is defined by the mapping at the end of the file. The optional last date is the enabled date; otherwise it defaults to the submitted date.
- `js/user-store.js`: owns the private in-memory record array. It creates IDs, preserves submission dates, handles activation dates, rejects duplicate emails and missing edit targets, and exposes record operations.
- `js/app.js`: search/filter/page state, safe DOM rendering, submit-triggered validation, modal setup, focus restoration, notifications, and UI event handlers.
- `tests/user-store.test.cjs`: repeatable data regression tests using Node's built-in test runner.
- `assets/screenshots/`: user-supplied desktop output images embedded in the README.

Classic deferred scripts intentionally support direct `file://` opening. View files register static template strings in `window.UserManagement.views`; they do not fetch HTML fragments or require a server. `window.UserManagement` is the shared namespace; UI state remains inside the app's closure. There are no framework or bundler dependencies. Keep view files free of event handlers; behavior belongs in `app.js`.

## Record operations

`createUserStore(initialUsers, today?)` creates an independent store. The optional date function returns a local `YYYY-MM-DD` string and enables deterministic tests.

- `list()` returns snapshots of all records, newest additions first.
- `get(id)` returns one snapshot or `null`.
- `count()` returns the total number of records.
- `save(input)` adds a record and returns the saved snapshot.
- `save(input, id)` updates that exact record or throws if it no longer exists.
- `setEnabled(id, enabled)` updates status and returns a snapshot. Repeating the same status does not change the activation date.

Editable input fields are `firstName`, `lastName`, `email`, `group`, `division`, `region`, `userType`, and boolean `enabled`. The store owns `id`, `submittedDate`, and `enabledDate`; input cannot overwrite them. IDs are strings so leading zeroes survive. Dates are date-only strings to avoid timezone shifts. The email also acts as the username.

Returned values are copies. Do not mutate a returned user and expect it to persist; call `save` or `setEnabled`. There is one authoritative collection inside the store, with no competing UI cache.

## Existing workflows

1. Search and filters derive results from `userStore.list()`. Changing a control resets pagination; rendering clamps pages after updates.
2. Add and Edit use the same form. Edit tracks a stable ID, independent of visible row order.
3. The first submit validates all fields and focuses the first invalid field. Before submit, typing and blur do not display errors. After submit, corrections update field messages and the summary.
4. Saving calls the store before closing the modal. Store errors keep the form open and show a message. A matching saved record is revealed on its page; a filtered-out record produces explanatory feedback.
5. Disable requires confirmation. Enable acts immediately. Status changes use the store and then refresh the result set.
6. Cancel/reopen resets form errors. Dialog close restores keyboard focus to the originating action or Add User when a row is no longer visible.

## Common extensions

**Add a field:** update its input/label in `js/views/modals.js`, mock record mapping, `editableFields` in the store, form population in `openUserModal`, validation in `getFieldError`, and table/search rendering if appropriate. Table headers live in `js/views/users.js`. Add a regression case. Keep user values in `textContent` rather than HTML strings.

**Change options:** filter options live in `js/views/users.js`; form options live in `js/views/modals.js`. Align both sets, seed data, and any business validation with the new choices. If multiple screens eventually share these choices, extract a shared configuration then.

**Change page size:** update `PAGE_SIZE` in `app.js` and verify filtered pagination and the last page.

**Add another module:** navigation buttons currently open an explicit scope message. Implement and test the actual screen before replacing that handler. User management is the implemented feature; workgroups and other company modules are not implemented.

## Connecting a backend

The current store is synchronous and in memory. It is a clear replacement point, not an already implemented remote API. A backend integration requires these deliberate changes:

1. Define server endpoints and response/error formats for list, create, update, and status changes. Preserve the record shape or map responses at the boundary.
2. Replace store operations with an asynchronous client, then update app initialization and mutation handlers to await results. Choose one owner for any cached records.
3. Add loading, retry, and error states. Disable repeated submissions while requests are pending and retain entered values when saving fails. Close the modal only after successful persistence.
4. Generate IDs and audit dates on the server. Enforce validation, unique emails, authentication, and authorization there; client validation only improves usability. Protect updates against stale records using the server's chosen concurrency mechanism.
5. Decide whether filtering and pagination remain client-side or move to the server. If they move, request matching counts and pages together.
6. Add integration tests for failures, conflicts, access rules, and persistence before using real accounts.

No network client, authentication, database, or local storage is shipped. Refresh resets mock data. Do not treat this front-end demo as a production account-access system.

## Browser acceptance checklist

- At desktop, tablet, and phone widths: navigation toggles work, controls do not overlap, and overflow stays within the table.
- Add a user with valid data; confirm that it appears and can be searched.
- Before submitting, tab through empty/invalid inputs; no error messages appear. Submit, correct the errors, and save.
- Try empty names, digits in names, a malformed email, and a duplicate email with different capitalization. Check international names and plus-addressed emails.
- Edit a user on a later page and with active filters. Verify the correct record changes and hidden records receive feedback.
- Cancel a disable, then confirm it. Filter by Disabled and re-enable the record.
- Search for no matches, clear filters, and check first/last page controls.
- Close and reopen Add/Edit. Confirm validation resets and focus returns appropriately.
- Use keyboard-only navigation, submit with Enter, and dismiss with Escape. Check the modal remains usable at 200% zoom.
- Refresh and verify that mock data resets. Check browser developer tools for runtime or missing-asset errors.

The supplied screenshots document the desktop output. They do not replace browser checks at other sizes.
