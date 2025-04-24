/**
 * Age Verification Script for BDSM COMMUNITY
 * Shows an age verification modal for first-time visitors
 * Enhanced to work on all devices including iOS
 */

(function() {
  // Function to check if user has already verified age
  function checkAgeVerification() {
    return localStorage.getItem("age_verified") === "true";
  }
  
  // Function to set age verification status with expiration
  function setAgeVerified() {
    localStorage.setItem("age_verified", "true");
    
    // Set an expiration date (30 days)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    localStorage.setItem("age_verified_expiration", expirationDate.toString());
  }
  
  // Function to check if verification has expired
  function isAgeVerificationExpired() {
    const expirationDate = localStorage.getItem("age_verified_expiration");
    if (!expirationDate) return false;
    
    return new Date() > new Date(expirationDate);
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Check if age is already verified and not expired
    if (checkAgeVerification() && !isAgeVerificationExpired()) {
      // User has already verified age and it hasn't expired
      return;
    }
    
    // Create age verification modal
    createAgeVerificationModal();

    // Show the modal
    showAgeVerificationModal();

    // Set up event listeners
    setupAgeVerificationListeners();
  });

  function createAgeVerificationModal() {
    // Create modal HTML
    const modalHTML = `
        <div id="age-verification-overlay" class="age-verification-overlay">
            <div class="age-verification-container">
                <div class="age-verification-content">
                    <img src="assets/images/logo/logo-red.png" alt="BDSM COMMUNITY logo" class="age-verification-logo">
                    <h2>Age Verification</h2>
                    <p>This website contains adult content and is only suitable for those who are at least 18 years old.</p>
                    <p>By entering this site, you confirm that you are at least 18 years old and agree to our Terms of Service and Privacy Policy.</p>
                    <div class="age-verification-buttons">
                        <button id="age-verification-yes" class="tm-button">I am 18 or older</button>
                        <button id="age-verification-no" class="tm-button tm-button-transparent">I am under 18</button>
                    </div>
                </div>
            </div>
        </div>
        `;

    // Add modal to body
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Add modal styles if not already in CSS
    if (!document.getElementById("age-verification-styles")) {
      const styleElement = document.createElement("style");
      styleElement.id = "age-verification-styles";
      styleElement.textContent = `
                .age-verification-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.9);
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    opacity: 1;
                    transition: opacity 0.3s ease;
                    -webkit-overflow-scrolling: touch; /* Better iOS scrolling */
                }
                
                .age-verification-container {
                    width: 90%;
                    max-width: 500px;
                    background-color: #fff;
                    border-radius: 10px;
                    padding: 30px;
                    text-align: center;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
                }
                
                .age-verification-logo {
                    max-width: 150px;
                    margin-bottom: 20px;
                }
                
                .age-verification-content h2 {
                    font-size: 24px;
                    margin-bottom: 15px;
                    color: #333;
                }
                
                .age-verification-content p {
                    font-size: 16px;
                    margin-bottom: 15px;
                    color: #555;
                }
                
                .age-verification-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-top: 20px;
                }
                
                .tm-button-transparent {
                    background-color: transparent;
                    color: #e73c3e;
                    border: 1px solid #e73c3e;
                }
                
                /* Ensure buttons are easily tappable on mobile */
                .tm-button {
                    min-height: 44px; /* iOS minimum recommended touch target size */
                    cursor: pointer;
                    -webkit-tap-highlight-color: rgba(0,0,0,0); /* Remove tap highlight on iOS */
                }
                
                @media (min-width: 576px) {
                    .age-verification-buttons {
                        flex-direction: row;
                        justify-content: center;
                        gap: 15px;
                    }
                }
            `;
      document.head.appendChild(styleElement);
    }
  }

  function showAgeVerificationModal() {
    const overlay = document.getElementById("age-verification-overlay");
    if (overlay) {
      // Prevent scrolling on the body
      document.body.style.overflow = "hidden";

      // Show the overlay
      overlay.style.display = "flex";
    }
  }

  function setupAgeVerificationListeners() {
    // "Yes" button - user is 18 or older
    const yesButton = document.getElementById("age-verification-yes");
    if (yesButton) {
      // Add both click and touchend events for better iOS compatibility
      yesButton.addEventListener("click", handleYesClick);
      yesButton.addEventListener("touchend", function(e) {
        e.preventDefault(); // Prevent double-firing
        handleYesClick(e);
      });
    }

    // "No" button - user is under 18
    const noButton = document.getElementById("age-verification-no");
    if (noButton) {
      // Add both click and touchend events for better iOS compatibility
      noButton.addEventListener("click", handleNoClick);
      noButton.addEventListener("touchend", function(e) {
        e.preventDefault(); // Prevent double-firing
        handleNoClick(e);
      });
    }
  }
  
  // Function to handle "Yes" button click
  function handleYesClick(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Set age verification flag in localStorage with expiration
    setAgeVerified();

    // Hide the modal
    hideAgeVerificationModal();
  }
  
  // Function to handle "No" button click
  function handleNoClick(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Redirect to an appropriate page (e.g., Google)
    window.location.href = "https://www.google.com";
  }

  function hideAgeVerificationModal() {
    const overlay = document.getElementById("age-verification-overlay");
    if (overlay) {
      // Add a fade-out effect
      overlay.style.opacity = "0";
      
      // Remove the overlay after transition
      setTimeout(function() {
        overlay.remove();
        // Restore scrolling
        document.body.style.overflow = "";
      }, 300);
    }
  }
})();
