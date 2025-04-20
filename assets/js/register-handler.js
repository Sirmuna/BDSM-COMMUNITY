/**
 * Register Handler
 * Manages user registration functionality
 */

document.addEventListener("DOMContentLoaded", function () {
  // Find register form - this will only exist on register.html
  const registerForm =
    document.querySelector("form#register-form") ||
    document.querySelector("form.register-form");

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Here you would normally send registration data to your backend
      // For this example, we'll just simulate a successful registration

      // Set authentication data in localStorage
      localStorage.setItem("bdsm_isLoggedIn", "true");
      localStorage.setItem(
        "bdsm_lastLoginTime",
        new Date().getTime().toString()
      );

      // Redirect to home page after successful registration
      window.location.href = "/index.html";
    });
  }

  // Add a link to login page if we're on register page
  const loginLinks = document.querySelectorAll(".login-link, #login-link");
  loginLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "/login.html";
    });
  });
});
