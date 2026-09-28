window.UserManagement = window.UserManagement || {};
window.UserManagement.views = window.UserManagement.views || {};
window.UserManagement.views.sidebar = `
<button class="btn sidebar-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-expanded="false" aria-controls="sidebar">
          <svg class="icon"><use href="#menu"></use></svg> Management menu
        </button>
<aside class="sidebar collapse" id="sidebar" aria-label="Management navigation">
          <div class="sidebar-heading">
            <svg class="sidebar-icon"><use href="#users"></use></svg><span>User management</span>
          </div>
          <nav aria-label="User management">
            <a href="#main-content" class="sidebar-sub active" aria-current="page"><span class="branch"></span><svg class="icon"><use href="#users"></use></svg>Edit Users</a><button class="sidebar-sub" data-module="Edit Workgroups">
              <span class="branch"></span><svg class="icon"><use href="#users"></use></svg>Edit Workgroups
            </button>
          </nav>
          <button class="sidebar-item" data-module="File management">
            <svg class="sidebar-icon"><use href="#file"></use></svg>File management
          </button>
          <button class="sidebar-item" data-module="Site management">
            <svg class="sidebar-icon"><use href="#tree"></use></svg>Site management
          </button>
          <button class="sidebar-item" data-module="Marketing management">
            <svg class="sidebar-icon"><use href="#megaphone"></use></svg>Marketing
            management
          </button>
          <button class="sidebar-item" data-module="CRM management">
            <svg class="sidebar-icon"><use href="#users"></use></svg>CRM management
          </button>
          <button class="sidebar-item" data-module="Critical Metrics">
            <svg class="sidebar-icon"><use href="#chart"></use></svg>Critical
            Metrics
          </button>
        </aside>
`;
