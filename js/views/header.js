window.UserManagement = window.UserManagement || {};
window.UserManagement.views = window.UserManagement.views || {};
window.UserManagement.views.header = `
<header class="topbar navbar navbar-expand-xl">
      <a class="company-brand" href="index.html" aria-label="Company home"><span class="brand-mark"><i></i><i></i><i></i><i></i></span>Company</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#top-navigation" aria-controls="top-navigation" aria-expanded="false" aria-label="Toggle company navigation">
        <svg class="icon"><use href="#menu"></use></svg>
      </button>
      <nav class="collapse navbar-collapse" id="top-navigation" aria-label="Company navigation">
        <ul class="navbar-nav main-navigation">
          <li><a class="nav-link home-link" href="index.html">Home</a></li>
          <li>
            <button class="nav-link" data-module="Leads onDemand">
              Leads onDemand
            </button>
          </li>
          <li>
            <button class="nav-link" data-module="Sales onDemand">
              Sales onDemand
            </button>
          </li>
          <li>
            <button class="nav-link" data-module="Opportunities">
              Opportunities
            </button>
          </li>
          <li>
            <button class="nav-link" data-module="Content onDemand">
              Content onDemand
            </button>
          </li>
          <li>
            <button class="nav-link" data-module="Support onDemand">
              Support onDemand
            </button>
          </li>
          <li>
            <button class="nav-link" data-module="Reports onDemand">
              Reports onDemand
            </button>
          </li>
          <li>
            <button class="nav-link" data-module="Module 8">Module 8</button>
          </li>
          <li>
            <button class="nav-link" data-module="Module 9">Module 9</button>
          </li>
        </ul>
        <div class="header-tools">
          <button id="focus-search" class="header-search" aria-label="Search users">
            <svg class="icon"><use href="#search-icon"></use></svg>
          </button>
          <div class="dropdown">
            <button class="profile-button dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <span class="profile-dot">MG</span> M. Greevos
            </button>
            <div class="dropdown-menu dropdown-menu-end profile-menu">
              <strong>M. Greevos</strong><span>Company administrator</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
`;
