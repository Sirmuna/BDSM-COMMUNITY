/**
 * Footer loader for BDSM Community website
 * Loads the footer section from includes/footer.html into all pages
 */

document.addEventListener("DOMContentLoaded", function () {
  // Find the footer placeholder
  const footerPlaceholder = document.querySelector(".footer");

  if (footerPlaceholder) {
    // Create an AJAX request to load the footer
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "includes/footer.html", true);

    xhr.onload = function () {
      if (this.status === 200) {
        // Replace the placeholder with the loaded footer
        footerPlaceholder.outerHTML = this.responseText;

        // Initialize any footer-specific scripts
        initializeFooterFunctionality();
      } else {
        console.error("Failed to load footer");
      }
    };

    xhr.onerror = function () {
      console.error("Error loading footer");
    };

    xhr.send();
  }

  // Footer functionality (newsletter, social media, etc.)
  function initializeFooterFunctionality() {
    // Newsletter subscription
    const newsletterForm = document.querySelector(".footer-newsletter-form");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (email && isValidEmail(email)) {
          // Show success message
          const successMessage = document.createElement("p");
          successMessage.className = "newsletter-success";
          successMessage.textContent = "Thank you for subscribing!";
          successMessage.style.color = "#4caf50";

          // Replace form with success message
          newsletterForm.innerHTML = "";
          newsletterForm.appendChild(successMessage);

          // You would typically send this to a backend API
          console.log("Newsletter subscription: " + email);
        } else {
          // Show error message
          const errorEl = document.querySelector(".newsletter-error");
          if (!errorEl) {
            const errorMessage = document.createElement("p");
            errorMessage.className = "newsletter-error";
            errorMessage.textContent = "Please enter a valid email address";
            errorMessage.style.color = "#e73d3e";
            errorMessage.style.fontSize = "12px";
            errorMessage.style.marginTop = "5px";

            newsletterForm.appendChild(errorMessage);
          }
        }
      });
    }

    // Simple email validation
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    // Footer social media links
    const socialLinks = document.querySelectorAll(".footer-social a");
    if (socialLinks) {
      socialLinks.forEach((link) => {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      });
    }
  }
});
