/**
 * Authentication JavaScript
 * Handles form validation and submission for login and registration
 */

document.addEventListener("DOMContentLoaded", function () {
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
          // Simulate successful registration
          localStorage.setItem("registeredEmail", email);

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
          const registeredEmail = localStorage.getItem("registeredEmail");

          if (registeredEmail && registeredEmail === email) {
            // Simulate successful login
            if (rememberMe) {
              localStorage.setItem("rememberedEmail", email);
            }

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
    const rememberedEmail = localStorage.getItem("rememberedEmail");
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
});
