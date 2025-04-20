/**
 * Age Verification Script for BDSM COMMUNITY
 * Shows an age verification modal for first-time visitors
 */

document.addEventListener("DOMContentLoaded", function () {
  // Check if user has already verified age
  if (!localStorage.getItem("age_verified")) {
    // Create age verification modal
    createAgeVerificationModal();

    // Show the modal
    showAgeVerificationModal();

    // Set up event listeners
    setupAgeVerificationListeners();
  }

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
      yesButton.addEventListener("click", function () {
        // Set age verification flag in localStorage
        localStorage.setItem("age_verified", "true");

        // Hide the modal
        hideAgeVerificationModal();
      });
    }

    // "No" button - user is under 18
    const noButton = document.getElementById("age-verification-no");
    if (noButton) {
      noButton.addEventListener("click", function () {
        // Redirect to an appropriate page (e.g., Google)
        window.location.href = "https://www.google.com";
      });
    }
  }

  function hideAgeVerificationModal() {
    const overlay = document.getElementById("age-verification-overlay");
    if (overlay) {
      // Remove the overlay
      overlay.remove();

      // Restore scrolling
      document.body.style.overflow = "";
    }
  }
});
