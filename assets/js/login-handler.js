/**
 * Login Handler Script
 * Processes login form submission and redirects users appropriately
 */

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      // Get user input
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      
      // In a real application, you would validate credentials against a server
      // This is a simplified example for demonstration
      if (email && password) {
        // Set authentication data
        localStorage.setItem("bdsm_isLoggedIn", "true");
        localStorage.setItem("bdsm_lastLoginTime", new Date().getTime().toString());
        localStorage.setItem("bdsm_userEmail", email);
        
        // Clear any redirect flags
        sessionStorage.removeItem("redirectAttempted");
        
        // Check if there's a return URL in the query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get("returnUrl");
        
        if (returnUrl) {
          // Redirect to the original page the user was trying to access
          window.location.href = decodeURIComponent(returnUrl);
        } else {
          // Default redirect to home page
          window.location.href = "/index.html";
        }
      } else {
        // Show error message
        const errorMessage = document.getElementById("login-error");
        if (errorMessage) {
          errorMessage.textContent = "Please enter both email and password";
          errorMessage.style.display = "block";
        }
      }
    });
  }
  
  // Handle logout button if present
  const logoutButton = document.getElementById("logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      
      // Clear authentication data
      localStorage.removeItem("bdsm_isLoggedIn");
      localStorage.removeItem("bdsm_lastLoginTime");
      localStorage.removeItem("bdsm_userEmail");
      
      // Redirect to login page
      window.location.href = "/login.html";
    });
  }
});