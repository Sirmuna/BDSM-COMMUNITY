/**
 * Authentication JavaScript
 * Handles form validation, submission, password visibility, and logout functionality
 * Uses cookies for better security and performance
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize password visibility toggles
  initPasswordToggles();

  // Initialize user menu if on dashboard
  initUserMenu();

  // Setup logout functionality
  setupLogout();

  // Registration form handling
  const registrationForm = document.getElementById("registration-form");
  if (registrationForm) {
    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const termsChecked = document.getElementById("terms").checked;
      const ageConfirmed = document.getElementById("age-confirmation").checked;

      // Reset previous error messages
      clearErrors();

      // Validate form
      let isValid = true;

      // Username validation (4-20 characters)
      if (username.length < 4 || username.length > 20) {
        showError("username", "Username must be between 4 and 20 characters");
        isValid = false;
      }

      // Email validation
      if (!isValidEmail(email)) {
        showError("email", "Please enter a valid email address");
        isValid = false;
      }

      // Password validation (at least 8 characters with letters and numbers)
      if (!isValidPassword(password)) {
        showError(
          "password",
          "Password must be at least 8 characters with letters and numbers"
        );
        isValid = false;
      }

      // Confirm password validation
      if (password !== confirmPassword) {
        showError("confirm-password", "Passwords do not match");
        isValid = false;
      }

      // Terms and age confirmation
      if (!termsChecked) {
        showError(
          "terms",
          "You must agree to the Terms of Service and Privacy Policy"
        );
        isValid = false;
      }

      if (!ageConfirmed) {
        showError(
          "age-confirmation",
          "You must confirm that you are at least 18 years old"
        );
        isValid = false;
      }

      // If form is valid, submit it
      if (isValid) {
        // Here you would normally send the data to your server
        // For demonstration, we'll just show a success message and redirect

        // Simulate server request
        showLoadingState();

        setTimeout(() => {
          // Simulate successful registration - store in cookies instead of localStorage
          setCookie("registeredEmail", email, 30); // Store for 30 days
          setCookie("registeredUsername", username, 30);

          // Show success message
          showSuccessMessage(
            "Registration successful! Redirecting to login page..."
          );

          // Redirect to login page after a delay
          setTimeout(() => {
            window.location.href = "login.html";
          }, 2000);
        }, 1500);
      }
    });
  }

  // Login form handling
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;
      const rememberMe = document.getElementById("remember-me").checked;

      // Reset previous error messages
      clearErrors();

      // Validate form
      let isValid = true;

      // Email validation
      if (!isValidEmail(email)) {
        showError("login-email", "Please enter a valid email address");
        isValid = false;
      }

      // Password validation (not empty)
      if (password.length === 0) {
        showError("login-password", "Please enter your password");
        isValid = false;
      }

      // If form is valid, submit it
      if (isValid) {
        // Here you would normally send the data to your server for authentication
        // For demonstration, we'll just check if the email matches a registered one

        // Simulate server request
        showLoadingState();

        setTimeout(() => {
          const registeredEmail = getCookie("registeredEmail");
          const registeredUsername = getCookie("registeredUsername") || "User";

          if (registeredEmail && registeredEmail === email) {
            // Simulate successful login
            if (rememberMe) {
              setCookie("rememberedEmail", email, 30); // Store for 30 days
            } else {
              // If remember me is not checked, set a session cookie (expires when browser closes)
              document.cookie = `rememberedEmail=${email}; path=/; SameSite=Strict`;
            }

            // Set user as logged in - with secure cookies
            setCookie("isLoggedIn", "true", rememberMe ? 30 : null); // If remember me, store for 30 days, otherwise session cookie
            setCookie("currentUser", registeredUsername, rememberMe ? 30 : null);
            
            // Set auth token (in a real app, this would be a JWT or other secure token)
            const authToken = generateAuthToken();
            setCookie("authToken", authToken, rememberMe ? 30 : null, true); // Set as secure cookie

            // Show success message
            showSuccessMessage("Login successful! Redirecting to dashboard...");

            // Redirect to dashboard after a delay
            setTimeout(() => {
              window.location.href = "index.html";
            }, 2000);
          } else {
            // Show error message
            showLoginError("Invalid email or password");
          }
        }, 1500);
      }
    });

    // Auto-fill remembered email if available
    const rememberedEmail = getCookie("rememberedEmail");
    if (rememberedEmail) {
      document.getElementById("login-email").value = rememberedEmail;
      document.getElementById("remember-me").checked = true;
    }
  }

  // Helper functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    // At least 8 characters with at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add("is-invalid");

    // Create error message element
    const errorDiv = document.createElement("div");
    errorDiv.className = "invalid-feedback";
    errorDiv.textContent = message;

    // Insert error message after the field
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
  }

  function clearErrors() {
    // Remove all error messages and invalid classes
    const invalidFields = document.querySelectorAll(".is-invalid");
    invalidFields.forEach((field) => field.classList.remove("is-invalid"));

    const errorMessages = document.querySelectorAll(".invalid-feedback");
    errorMessages.forEach((error) => error.remove());
  }

  function showLoadingState() {
    // Disable submit button and show loading indicator
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
  }

  function showSuccessMessage(message) {
    // Create success alert
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-success mt-3";
    alertDiv.textContent = message;

    // Insert alert before the form
    const form = document.querySelector(".auth-form");
    form.parentNode.insertBefore(alertDiv, form);

    // Reset submit button
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = false;
    submitButton.textContent =
      submitButton.getAttribute("data-original-text") || "Submit";
  }

  function showLoginError(message) {
    // Create error alert
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-danger mt-3";
    alertDiv.textContent = message;

    // Insert alert before the form
    const form = document.querySelector(".auth-form");
    form.parentNode.insertBefore(alertDiv, form);

    // Reset submit button
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = false;
    submitButton.textContent = "Login";
  }

  // Store original button text for later restoration
  const submitButtons = document.querySelectorAll('button[type="submit"]');
  submitButtons.forEach((button) => {
    button.setAttribute("data-original-text", button.textContent);
  });

  // Check if user is logged in and update UI accordingly
  checkLoginStatus();

  // Password visibility toggle functionality
  function initPasswordToggles() {
    const passwordFields = document.querySelectorAll(".password-field");

    passwordFields.forEach((field) => {
      const input = field.querySelector('input[type="password"]');
      if (!input) return;

      // Check if toggle button already exists
      let toggleBtn = field.querySelector(".password-toggle");

      // If toggle doesn't exist, create it
      if (!toggleBtn) {
        toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.className = "password-toggle";
        toggleBtn.innerHTML = '<i class="fa fa-eye-slash"></i>';
        toggleBtn.setAttribute("aria-label", "Toggle password visibility");
        field.appendChild(toggleBtn);
      }

      // Add event listener to toggle button
      toggleBtn.addEventListener("click", function () {
        const icon = this.querySelector("i");

        if (input.type === "password") {
          input.type = "text";
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        } else {
          input.type = "password";
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        }
      });
    });
  }

  // Check login status and update UI
  function checkLoginStatus() {
    const isLoggedIn = getCookie("isLoggedIn") === "true";
    const currentUser = getCookie("currentUser");
    const authToken = getCookie("authToken");

    // Verify if user is properly authenticated
    if (isLoggedIn && currentUser && authToken) {
      // Find header elements to update
      const headerTopButtons = document.querySelectorAll(".header-topbutton");

      if (headerTopButtons.length > 0) {
        // Create user menu HTML
        const userMenuHTML = `
          <div class="user-menu">
            <div class="user-menu-toggle">
              <div class="user-avatar">
                <img src="assets/images/user-avatar.png" alt="User Avatar">
              </div>
              <span class="user-name">${currentUser}</span>
              <i class="fa fa-chevron-down"></i>
            </div>
            <div class="user-menu-dropdown">
              <a href="dashboard.html" class="user-menu-item">
                <i class="fa fa-tachometer-alt"></i> Dashboard
              </a>
              <a href="profile.html" class="user-menu-item">
                <i class="fa fa-user"></i> My Profile
              </a>
              <a href="settings.html" class="user-menu-item">
                <i class="fa fa-cog"></i> Settings
              </a>
              <div class="user-menu-divider"></div>
              <a href="#" class="user-menu-item logout-link">
                <i class="fa fa-sign-out-alt"></i> Logout
              </a>
            </div>
          </div>
          <a href="#" class="logout-button"><i class="fa fa-sign-out-alt"></i> Logout</a>
        `;

        // Replace contact us button with user menu
        headerTopButtons.forEach((button) => {
          button.innerHTML = userMenuHTML;
        });
      }
    }
  }

  // Check login status and update UI
  function checkLoginStatus() {
    const isLoggedIn = getCookie("isLoggedIn") === "true";
    const currentUser = getCookie("currentUser");
    const authToken = getCookie("authToken");

    // Verify if user is properly authenticated
    if (isLoggedIn && currentUser && authToken) {
      // Find header elements to update
      const headerTopButtons = document.querySelectorAll(".header-topbutton");

      if (headerTopButtons.length > 0) {
        // Create user menu HTML
        const userMenuHTML = `
          <div class="user-menu">
            <div class="user-menu-toggle">
              <div class="user-avatar">
                <img src="assets/images/user-avatar.png" alt="User Avatar">
              </div>
              <span class="user-name">${currentUser}</span>
              <i class="fa fa-chevron-down"></i>
            </div>
            <div class="user-menu-dropdown">
              <a href="dashboard.html" class="user-menu-item">
                <i class="fa fa-tachometer-alt"></i> Dashboard
              </a>
              <a href="profile.html" class="user-menu-item">
                <i class="fa fa-user"></i> My Profile
              </a>
              <a href="settings.html" class="user-menu-item">
                <i class="fa fa-cog"></i> Settings
              </a>
              <div class="user-menu-divider"></div>
              <a href="#" class="user-menu-item logout-link">
                <i class="fa fa-sign-out-alt"></i> Logout
              </a>
            </div>
          </div>
          <a href="#" class="logout-button"><i class="fa fa-sign-out-alt"></i> Logout</a>
        `;

        // Replace contact us button with user menu
        headerTopButtons.forEach((button) => {
          button.innerHTML = userMenuHTML;
        });
      }
    }
  }

  // Initialize user menu dropdown
  function initUserMenu() {
    document.addEventListener("click", function (e) {
      const userMenuToggle = e.target.closest(".user-menu-toggle");

      if (userMenuToggle) {
        const dropdown = userMenuToggle.nextElementSibling;
        dropdown.classList.toggle("show");
        e.stopPropagation();
      } else if (!e.target.closest(".user-menu-dropdown")) {
        // Close all dropdowns when clicking outside
        const dropdowns = document.querySelectorAll(".user-menu-dropdown");
        dropdowns.forEach((dropdown) => dropdown.classList.remove("show"));
      }
    });
  }

  // Setup logout functionality
  function setupLogout() {
    // Add event listeners to all logout buttons/links
    document.addEventListener("click", function (e) {
      if (
        e.target.closest(".logout-button") ||
        e.target.closest(".logout-link")
      ) {
        e.preventDefault();

        // Clear all auth cookies
        deleteCookie("isLoggedIn");
        deleteCookie("currentUser");
        deleteCookie("authToken");

        // Redirect to login page
        window.location.href = "login.html";
      }
    });
  }

  // Cookie management functions
  function setCookie(name, value, days, secure = false) {
    let expires = "";
    
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    
    // Set secure flag if requested and if using HTTPS
    const secureFlag = secure && location.protocol === 'https:' ? '; Secure' : '';
    
    document.cookie = 
      name + "=" + encodeURIComponent(value) + 
      expires + 
      "; path=/" + 
      secureFlag + 
      "; SameSite=Strict";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }
    
    return null;
  }

  function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict";
  }

  // Generate a simple auth token (in a real app, this would be from the server)
  function generateAuthToken() {
    // Simple random token generator - in a real app, this would be a JWT from the server
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    
    for (let i = 0; i < 32; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return token;
  }
});
