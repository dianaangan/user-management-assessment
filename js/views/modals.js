window.UserManagement = window.UserManagement || {};
window.UserManagement.views = window.UserManagement.views || {};
window.UserManagement.views.modals = `
<div class="modal fade" id="user-modal" tabindex="-1" aria-labelledby="user-modal-title" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title fs-5" id="user-modal-title">Add User</h2>
            <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form id="user-form" novalidate="">
            <div class="modal-body">
              <p class="form-note">All fields are required.</p>
              <p id="validation-summary" class="validation-summary" role="alert" hidden=""></p>
              <div class="row g-4">
                <div class="col-sm-6">
                  <label class="form-label" for="first-name">First name</label><input id="first-name" name="firstName" class="form-control" required="" maxlength="50" autocomplete="given-name">
                </div>
                <div class="col-sm-6">
                  <label class="form-label" for="last-name">Last name</label><input id="last-name" name="lastName" class="form-control" required="" maxlength="50" autocomplete="family-name">
                </div>
                <div class="col-12">
                  <label class="form-label" for="email">Username / Email</label><input id="email" name="email" type="email" class="form-control" required="" maxlength="254" autocomplete="email" aria-describedby="email-help">
                  <div id="email-help" class="form-text">
                    The email address is the username. Use a unique address,
                    such as name@company.com.
                  </div>
                </div>
                <div class="col-sm-6">
                  <label class="form-label" for="group">Group</label><select id="group" name="group" class="form-select" required="">
                    <option value="">Select group</option>
                    <option>Admin</option>
                    <option>Licensed</option>
                    <option>Forward</option>
                    <option>Recruiter</option>
                  </select>
                </div>
                <div class="col-sm-6">
                  <label class="form-label" for="user-type">User type</label><select id="user-type" name="userType" class="form-select" required="">
                    <option>Internal</option>
                    <option>External</option>
                  </select>
                </div>
                <div class="col-sm-6">
                  <label class="form-label" for="division">Division</label><select id="division" name="division" class="form-select" required="">
                    <option>NY</option>
                    <option>CA</option>
                    <option>TX</option>
                    <option>IL</option>
                  </select>
                </div>
                <div class="col-sm-6">
                  <label class="form-label" for="region">Region</label><select id="region" name="region" class="form-select" required="">
                    <option>Corporate</option>
                    <option>West</option>
                    <option>South</option>
                    <option>Midwest</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label" for="user-status">Status</label><select id="user-status" name="status" class="form-select" required="">
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                Cancel</button><button type="submit" class="btn btn-primary" id="save-user">
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
<div class="modal fade" id="confirm-modal" tabindex="-1" aria-labelledby="confirm-title" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title fs-5" id="confirm-title">Disable user?</h2>
            <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="confirm-message"></div>
          <div class="modal-footer">
            <button class="btn btn-light" data-bs-dismiss="modal">Cancel</button><button class="btn btn-danger" id="confirm-disable">
              Disable User
            </button>
          </div>
        </div>
      </div>
    </div>
<div class="modal fade" id="module-modal" tabindex="-1" aria-labelledby="module-title" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title fs-5" id="module-title"></h2>
            <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            This module is outside this user-management demo.
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" data-bs-dismiss="modal">
              Back to users
            </button>
          </div>
        </div>
      </div>
    </div>
`;
