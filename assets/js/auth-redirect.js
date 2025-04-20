/**
 * Authentication Redirect Script
 * Handles redirecting first-time or returning users to login page
 */

document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in using localStorage
  const checkUserAuthentication = () => {
    // Get authentication status and timestamp from localStorage
    const isLoggedIn = localStorage.getItem("bdsm_isLoggedIn") === "true";
    const lastLoginTime = localStorage.getItem("bdsm_lastLoginTime");
    const currentTime = new Date().getTime();

    // Session timeout (in milliseconds) - 30 minutes
    const sessionTimeout = 30 * 60 * 1000;

    // Check if user is not logged in or session has expired
    if (
      !isLoggedIn ||
      !lastLoginTime ||
      currentTime - lastLoginTime > sessionTimeout
    ) {
      // Clear any existing auth data
      localStorage.setItem("bdsm_isLoggedIn", "false");

      // Only redirect if we're not already on a login/register page
      const currentPage = window.location.pathname.toLowerCase();
      if (!currentPage.includes("login") && !currentPage.includes("register")) {
        // Redirect to login page
        window.location.href = "/login.html";
      }
    } else {
      // Update last login time for active users
      localStorage.setItem("bdsm_lastLoginTime", currentTime.toString());
    }
  };

  // Run authentication check
  checkUserAuthentication();
});
