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
      // AND we're not on a translated page (language subdirectory)
      const currentPath = window.location.pathname.toLowerCase();
      
      // Skip auth redirects for these cases:
      const isLoginPage = currentPath.includes("login");
      const isRegisterPage = currentPath.includes("register");
      const isLanguagePage = /\/[a-z]{2}\//.test(currentPath); // Matches /fr/, /de/, etc.
      
      // Set a flag so we don't constantly redirect back and forth
      const redirectAttempted = sessionStorage.getItem("redirectAttempted") === "true";
      
      if (!isLoginPage && !isRegisterPage && !isLanguagePage && !redirectAttempted) {
        // Mark that we've attempted a redirect to prevent loops
        sessionStorage.setItem("redirectAttempted", "true");
        
        // Redirect to login page with return URL
        const returnUrl = encodeURIComponent(window.location.pathname);
        window.location.href = `/login.html?returnUrl=${returnUrl}`;
      }
    } else {
      // Update last login time for active users
      localStorage.setItem("bdsm_lastLoginTime", currentTime.toString());
      
      // Clear the redirect attempt flag since user is authenticated
      sessionStorage.removeItem("redirectAttempted");
    }
  };

  // Run authentication check
  checkUserAuthentication();
});