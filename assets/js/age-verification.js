// Age Verification Script
document.addEventListener("DOMContentLoaded", function () {
  // Check if user has already verified their age
  if (!localStorage.getItem("ageVerified")) {
    showAgeVerification();
  } else {
    // Check if verification has expired
    checkAgeVerificationExpiration();
  }
});

function showAgeVerification() {
  // Create overlay container
  const overlay = document.createElement("div");
  overlay.className = "age-verification-overlay";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
  overlay.style.zIndex = "9999";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.transition = "opacity 0.3s ease";

  // Create verification modal
  const modal = document.createElement("div");
  modal.className = "age-verification-modal";
  modal.style.backgroundColor = "#fff";
  modal.style.borderRadius = "5px";
  modal.style.padding = "30px";
  modal.style.maxWidth = "500px";
  modal.style.width = "90%";
  modal.style.textAlign = "center";
  modal.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.3)";

  // Add content to modal with BDSM image at the top
  modal.innerHTML = `
        <div class="age-verification-content">
            <div style="margin-bottom: 20px;">
                <img src="assets/images/logo/logo-red.png" alt="BDSM logo" />
            </div>
            <h2 style="color: #e71d36; margin-bottom: 20px;">Age Verification</h2>
            <p style="margin-bottom: 15px;">This website contains adult content related to BDSM and alternative lifestyles.</p>
            <p style="margin-bottom: 25px; font-weight: bold;">You must be at least 18 years old to enter.</p>
            <div class="age-verification-buttons" style="margin-bottom: 20px;">
                <button id="age-yes" class="tm-button" style="background-color: #e71d36; color: white; border: none; padding: 10px 20px; margin: 0 10px; cursor: pointer; border-radius: 3px;">I am 18 or older</button>
                <button id="age-no" class="tm-button tm-button-white" style="background-color: #333; color: white; border: none; padding: 10px 20px; margin: 0 10px; cursor: pointer; border-radius: 3px;">I am under 18</button>
            </div>
            <p class="age-verification-disclaimer" style="font-size: 12px; color: #666;">By entering this site, you confirm that you are of legal age in your jurisdiction to view adult content and that such material is legal in your area.</p>
        </div>
    `;

  // Append modal to overlay
  overlay.appendChild(modal);

  // Append overlay to body
  document.body.appendChild(overlay);

  // Prevent scrolling on the body
  document.body.style.overflow = "hidden";

  // Add event listeners to buttons
  document.getElementById("age-yes").addEventListener("click", function () {
    verifyAge(true);
  });

  document.getElementById("age-no").addEventListener("click", function () {
    verifyAge(false);
  });
}

function verifyAge(isAdult) {
  if (isAdult) {
    // Store verification in localStorage
    localStorage.setItem("ageVerified", "true");
    // Also store timestamp for potential expiration
    localStorage.setItem("ageVerifiedTimestamp", Date.now());

    // Remove overlay with a fade-out effect
    const overlay = document.querySelector(".age-verification-overlay");
    if (overlay) {
      overlay.style.opacity = "0";
      setTimeout(() => {
        overlay.remove();
        // Re-enable scrolling
        document.body.style.overflow = "";
      }, 300);
    }
  } else {
    // Redirect to an appropriate page for minors
    window.location.href = "https://www.google.com";
  }
}

// Function to clear verification after a certain period (e.g., 30 days)
function checkAgeVerificationExpiration() {
  const timestamp = localStorage.getItem("ageVerifiedTimestamp");
  if (timestamp) {
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    if (Date.now() - parseInt(timestamp) > thirtyDaysInMs) {
      localStorage.removeItem("ageVerified");
      localStorage.removeItem("ageVerifiedTimestamp");
      showAgeVerification();
    }
  }
}

// For testing purposes - uncomment to reset the verification
// localStorage.removeItem("ageVerified");
// localStorage.removeItem("ageVerifiedTimestamp");
