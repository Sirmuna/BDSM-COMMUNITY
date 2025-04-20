/**
 * Login Handler
 * Manages user login functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find login form - this will only exist on login.html
    const loginForm = document.querySelector('form#login-form') || document.querySelector('form.login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would normally validate credentials with your backend
            // For this example, we'll just simulate a successful login
            
            // Set authentication data in localStorage
            localStorage.setItem('bdsm_isLoggedIn', 'true');
            localStorage.setItem('bdsm_lastLoginTime', new Date().getTime().toString());
            
            // Redirect to home page after successful login
            window.location.href = '/index.html';
        });
    }
    
    // Add functionality for logout buttons if any exist
    const logoutButtons = document.querySelectorAll('.logout-button, #logout-button');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear authentication data
            localStorage.setItem('bdsm_isLoggedIn', 'false');
            localStorage.removeItem('bdsm_lastLoginTime');
            
            // Redirect to login page
            window.location.href = '/login.html';
        });
    });
    
    // Add a link to registration page if we're on login page
    const registerLinks = document.querySelectorAll('.register-link, #register-link');
    registerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '/register.html';
        });
    });
});