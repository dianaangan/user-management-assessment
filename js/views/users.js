window.UserManagement = window.UserManagement || {};
window.UserManagement.views = window.UserManagement.views || {};
window.UserManagement.views.users = `
<main id="main-content" class="content-panel" tabindex="-1">
          <h1>User Management - Edit Users</h1>
          <div class="toolbar">
            <div class="search-controls">
              <div class="search-box">
                <label for="search" class="visually-hidden">Search users</label><input class="form-control form-control-sm" id="search" type="search" placeholder="Search" autocomplete="off"><svg class="icon"><use href="#search-icon"></use></svg>
              </div>
              <label for="search-field" class="visually-hidden">Search by field</label><select id="search-field" class="form-select form-select-sm">
                <option value="all">Search by field…</option>
                <option value="id">ID</option>
                <option value="firstName">First name</option>
                <option value="lastName">Last name</option>
                <option value="email">Username / Email</option>
                <option value="group">Group</option>
                <option value="userType">User type</option>
              </select>
            </div>
            <button class="btn btn-add" id="add-user">
              <svg class="icon"><use href="#plus"></use></svg>Add User
            </button>
          </div>
          <div class="filter-toolbar">
            <button class="btn filter-toggle" data-bs-toggle="collapse" data-bs-target="#filter-controls" aria-expanded="true" aria-controls="filter-controls">
              <svg class="icon"><use href="#filter-icon"></use></svg>Filters</button><button class="btn clear-filters" id="clear-filters">
              Clear Filters
            </button>
          </div>
          <div class="collapse show" id="filter-controls">
            <div class="filter-grid">
              <label for="status-filter">Status</label><select id="status-filter" class="form-select form-select-sm">
                <option value="all">All</option>
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option></select><label for="region-filter">Region</label><select id="region-filter" class="form-select form-select-sm">
                <option value="all">All</option>
                <option>Corporate</option>
                <option>West</option>
                <option>South</option>
                <option>Midwest</option></select><label for="division-filter">Division</label><select id="division-filter" class="form-select form-select-sm">
                <option value="all">All</option>
                <option>NY</option>
                <option>CA</option>
                <option>TX</option>
                <option>IL</option>
              </select>
            </div>
          </div>
          <div class="table-responsive" role="region" aria-label="Users table, scroll horizontally to see all columns" tabindex="0">
            <table class="table users-table">
              <caption class="visually-hidden">
                Company users and account actions
              </caption>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Username/Email</th>
                  <th scope="col">Group</th>
                  <th scope="col">Division</th>
                  <th scope="col">Region</th>
                  <th scope="col">User Type</th>
                  <th scope="col">Submitted Date</th>
                  <th scope="col">Enabled Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody id="user-rows"></tbody>
            </table>
          </div>
          <footer class="table-footer">
            <p id="results-summary" role="status" aria-live="polite"></p>
            <nav aria-label="User pages">
              <ul class="pagination pagination-sm" id="pagination"></ul>
            </nav>
          </footer>
        </main>
`;
