/**
 * Auth Redirect Script - Modified Version
 * This script has been modified to remove automatic redirects to the login page.
 * It now only handles age verification checks.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if age verification has been completed
    const ageVerified = localStorage.getItem('ageVerified') === 'true';
    
    // If age is not verified, redirect to age verification page
    if (!ageVerified) {
        // Only redirect if we're not already on the age verification page
        if (!window.location.pathname.includes('register.html')) {
            window.location.href = 'register.html';
        }
    }
    
    // We still track login status but don't force redirects
    const isLoggedIn = localStorage.getItem("bdsm_isLoggedIn") === "true";
    const lastLoginTime = localStorage.getItem("bdsm_lastLoginTime");
    const currentTime = new Date().getTime();
    
    // Update last login time for active users who are logged in
    if (isLoggedIn && lastLoginTime) {
        localStorage.setItem("bdsm_lastLoginTime", currentTime.toString());
    }
    
    // Optional: You could add code here to show different UI elements
    // based on whether the user is logged in or not
});
