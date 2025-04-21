/**
 * Login Handler
 * Secondary authentication handler that supports the main auth.js system
 * Acts as a compatibility layer and ensures login validation works correctly
 */

document.addEventListener("DOMContentLoaded", function () {
  console.log("Login handler initialized");

  // Initialize password visibility toggles
  initPasswordToggles();

  // Find login form - this will only exist on login.html
  const loginForm =
    document.querySelector("form#login-form") ||
    document.querySelector("form.login-form");

  if (loginForm) {
    // Remove any existing event listeners to avoid conflicts with auth.js
    const newForm = loginForm.cloneNode(true);
    if (loginForm.parentNode) {
      loginForm.parentNode.replaceChild(newForm, loginForm);
    }

    // Add our event listener
    newForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;
      const rememberMe =
        document.getElementById("remember-me")?.checked || false;

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

      // If form is valid, check if user exists before login
      if (isValid) {
        // Show loading state
        showLoadingState();

        // Check if user exists in cookies
        const registeredEmail = getCookie("registeredEmail");
        const registeredUsername = getCookie("registeredUsername") || "User";
        const registeredPasswordHash = getCookie("registeredPasswordHash");

        if (!registeredEmail || registeredEmail !== email) {
          // User is not registered
          setTimeout(() => {
            showLoginError("Account not found. Please register first.");
            resetLoadingState();
          }, 1000);
          return;
        }

        // Validate password if we have a stored hash
        if (
          registeredPasswordHash &&
          hashPassword(password) !== registeredPasswordHash
        ) {
          setTimeout(() => {
            showLoginError("Invalid password. Please try again.");
            resetLoadingState();
          }, 1000);
          return;
        }

        // If we got here, login is valid
        setTimeout(() => {
          // Set cookie auth
          setCookie("isLoggedIn", "true", rememberMe ? 30 : null);
          setCookie("currentUser", registeredUsername, rememberMe ? 30 : null);

          // Set auth token
          const authToken = generateAuthToken();
          setCookie("authToken", authToken, rememberMe ? 30 : null, true);

          // For compatibility with older code, also set localStorage
          localStorage.setItem("bdsm_isLoggedIn", "true");
          localStorage.setItem(
            "bdsm_lastLoginTime",
            new Date().getTime().toString()
          );

          // Show success message
          showSuccessMessage("Login successful! Redirecting to dashboard...");

          // Redirect to home page after successful login
          setTimeout(() => {
            window.location.href = "index.html";
          }, 1500);
        }, 1500);
      }
    });
  }

  // Add functionality for logout buttons if any exist
  const logoutButtons = document.querySelectorAll(
    ".logout-button, #logout-button"
  );
  logoutButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Clear all auth cookies
      deleteCookie("isLoggedIn");
      deleteCookie("currentUser");
      deleteCookie("authToken");

      // Also clear localStorage for compatibility
      localStorage.setItem("bdsm_isLoggedIn", "false");
      localStorage.removeItem("bdsm_lastLoginTime");

      // Redirect to login page
      window.location.href = "login.html";
    });
  });

  // Add a link to registration page if we're on login page
  const registerLinks = document.querySelectorAll(
    ".register-link, #register-link"
  );
  registerLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "register.html";
    });
  });

  // Initialize password visibility toggle functionality
  function initPasswordToggles() {
    console.log("Initializing password toggles");
    
    const passwordFields = document.querySelectorAll(".password-field");
    
    if (passwordFields.length === 0) {
      // If no password fields with the class are found, try to add password toggle to any password inputs
      const passwordInputs = document.querySelectorAll('input[type="password"]');
      
      passwordInputs.forEach(input => {
        // Create wrapper if needed
        const parent = input.parentNode;
        if (!parent.classList.contains('input-group')) {
          // Wrap the input in a div with input-group class
          const wrapper = document.createElement('div');
          wrapper.className = 'input-group password-field';
          parent.insertBefore(wrapper, input);
          wrapper.appendChild(input);
          
          // Add the toggle button
          const toggleBtn = document.createElement('div');
          toggleBtn.className = 'input-group-append';
          toggleBtn.innerHTML = `
            <button class="btn btn-outline-secondary password-toggle" type="button">
              <i class="fa fa-eye-slash"></i>
            </button>
          `;
          wrapper.appendChild(toggleBtn);
        }
      });
    }
    
    // Now find all password toggle buttons and add event listeners
    const toggleButtons = document.querySelectorAll(".password-toggle");
    
    toggleButtons.forEach(toggleBtn => {
      toggleBtn.addEventListener("click", function() {
        const icon = this.querySelector("i");
        const inputGroup = this.closest(".input-group");
        if (!inputGroup) return;
        
        const input = inputGroup.querySelector('input[type="password"]') || 
                     inputGroup.querySelector('input[type="text"]');
        
        if (!input) return;
        
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

  // Helper functions
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    // At least 8 characters with at least one letter, one number, and one special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.classList.add("is-invalid");

    // Create error message element
    const errorDiv = document.createElement("div");
    errorDiv.className = "invalid-feedback";
    errorDiv.textContent = message;

    // Insert error message after the field
    const parent = field.parentNode;
    // If field is in an input group, add error to the parent
    if (parent.classList.contains("input-group")) {
      parent.classList.add("is-invalid");
      parent.parentNode.appendChild(errorDiv);
    } else {
      field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
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
    if (!submitButton) return;

    submitButton.disabled = true;
    submitButton.setAttribute(
      "data-original-text",
      submitButton.textContent || "Login"
    );
    submitButton.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
  }

  function resetLoadingState() {
    const submitButton = document.querySelector('button[type="submit"]');
    if (!submitButton) return;

    submitButton.disabled = false;
    submitButton.innerHTML =
      submitButton.getAttribute("data-original-text") || "Login";
  }

  function showSuccessMessage(message) {
    // Create success alert
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-success mt-3";
    alertDiv.textContent = message;
    alertDiv.setAttribute("role", "alert");

    // Remove any existing alerts
    const existingAlerts = document.querySelectorAll(".alert");
    existingAlerts.forEach(alert => alert.remove());

    // Insert alert before the form
    const form = document.querySelector(".auth-form");
    if (form && form.parentNode) {
      form.parentNode.insertBefore(alertDiv, form);
    }
  }

  function showLoginError(message) {
    // Create error alert
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-danger mt-3";
    alertDiv.textContent = message;
    alertDiv.setAttribute("role", "alert");

    // Remove any existing alerts
    const existingAlerts = document.querySelectorAll(".alert-danger");
    existingAlerts.forEach(alert => alert.remove());

    // Insert alert before the form
    const form = document.querySelector(".auth-form");
    if (form && form.parentNode) {
      form.parentNode.insertBefore(alertDiv, form);
    }
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
    const secureFlag =
      secure && location.protocol === "https:" ? "; Secure" : "";

    document.cookie =
      name +
      "=" +
      encodeURIComponent(value) +
      expires +
      "; path=/" +
      secureFlag +
      "; SameSite=Strict";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
    }

    return null;
  }

  function deleteCookie(name) {
    document.cookie =
      name +
      "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict";
  }

  // Generate a simple auth token (in a real app, this would be from the server)
  function generateAuthToken() {
    // Simple random token generator - in a real app, this would be a JWT from the server
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";

    for (let i = 0; i < 32; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return token;
  }

  // Simple password hashing function (not secure for production, just for demo)
  function hashPassword(password) {
    // A very simple hash function - in a real app, use bcrypt or a similar library
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    // Convert to string and add salt
    return hash.toString() + "bdsmSalt";
  }
});
