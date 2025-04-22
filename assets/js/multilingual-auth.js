/**
 * Multilingual Authentication Helper
 * Bridges the authentication system with multilingual pages
 */

document.addEventListener("DOMContentLoaded", function () {
  // Get current page language from URL or HTML lang attribute
  const getCurrentLanguage = () => {
    // First try to detect from URL path (/fr/, /de/, etc.)
    const pathMatch = window.location.pathname.match(/\/([a-z]{2})\//);
    if (pathMatch && pathMatch[1]) {
      return pathMatch[1];
    }

    // Fall back to HTML lang attribute
    const htmlLang = document.documentElement.lang;
    if (htmlLang && htmlLang.length === 2) {
      return htmlLang;
    }

    // Default to English
    return "en";
  };

  // Get login/register URLs with appropriate language path
  const getAuthUrl = (page) => {
    const lang = getCurrentLanguage();

    if (lang === "en") {
      return `/${page}.html`;
    } else {
      return `/${lang}/${page}.html`;
    }
  };

  // Update login/register links in the page to maintain language context
  const updateAuthLinks = () => {
    // Find all links to login or register pages
    const authLinks = document.querySelectorAll(
      'a[href*="login.html"], a[href*="register.html"]'
    );

    authLinks.forEach((link) => {
      const isLoginLink = link.getAttribute("href").includes("login.html");
      const newUrl = getAuthUrl(isLoginLink ? "login" : "register");

      // Update the href to the correct language version
      link.setAttribute("href", newUrl);
    });
  };

  // Expose some useful methods to global scope
  window.multilingualAuth = {
    getCurrentLanguage,
    getAuthUrl,
    updateAuthLinks,
  };

  // Run initializations
  updateAuthLinks();

  // If this is a language-specific page, set a flag to prevent unnecessary redirects
  const isLanguagePage = /\/[a-z]{2}\//.test(window.location.pathname);
  if (isLanguagePage) {
    sessionStorage.setItem("languagePage", "true");
  }
});
