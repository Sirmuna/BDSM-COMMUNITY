/**
 * Language Switcher Functionality
 * Handles language selection and UI updates for the language dropdown
 */
(function ($) {
  "use strict";

  // Store the current language
  let currentLanguage = localStorage.getItem("selectedLanguage") || "en";

  // Update UI to show current language on page load
  function initLanguageSwitcher() {
    // Set initial language display
    updateLanguageDisplay(currentLanguage);

    // Desktop dropdown toggle
    $("#language-toggle-desktop").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $("#language-dropdown-desktop").toggleClass("show");
    });

    // Mobile dropdown toggle
    $("#language-toggle-mobile").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $("#language-dropdown-mobile").toggleClass("active");
    });

    // Language selection (desktop)
    $("#language-dropdown-desktop .language-option").on("click", function (e) {
      e.preventDefault();
      const lang = $(this).data("lang");
      selectLanguage(lang);
      $("#language-dropdown-desktop").removeClass("show");
    });

    // Language selection (mobile)
    $("#language-dropdown-mobile .language-option").on("click", function (e) {
      e.preventDefault();
      const lang = $(this).data("lang");
      selectLanguage(lang);
      $("#language-dropdown-mobile").removeClass("active");
    });

    // Close dropdown when clicking outside
    $(document).on("click", function (e) {
      if (!$(e.target).closest(".language-switcher").length) {
        $("#language-dropdown-desktop").removeClass("show");
      }
      if (!$(e.target).closest(".language-switcher-mobile").length) {
        $("#language-dropdown-mobile").removeClass("active");
      }
    });
  }

  // Update the language display in both desktop and mobile views
  function updateLanguageDisplay(lang) {
    // Get language details
    const langDetails = getLanguageDetails(lang);

    // Update desktop toggle
    $("#language-toggle-desktop img").attr("src", langDetails.flag);
    $("#language-toggle-desktop span").text(langDetails.code);

    // Update mobile toggle
    $("#language-toggle-mobile img").attr("src", langDetails.flag);
    $("#language-toggle-mobile span").text(langDetails.code);

    // Store selected language
    localStorage.setItem("selectedLanguage", lang);
    currentLanguage = lang;

    // Update HTML lang attribute
    $("html").attr("lang", lang);
  }

  // Select a language and perform necessary actions
  function selectLanguage(lang) {
    if (lang === currentLanguage) return;

    updateLanguageDisplay(lang);

    // Here you would typically load translated content
    // This is a placeholder for actual translation implementation
    // loadTranslatedContent(lang);

    // For demonstration, we'll just reload the page
    // In a real implementation, you might use AJAX to update content
    // window.location.reload();
  }

  // Get language details based on language code
  function getLanguageDetails(lang) {
    const languages = {
      en: { code: "EN", flag: "assets/images/flags/en.png", name: "English" },
      fr: { code: "FR", flag: "assets/images/flags/fr.png", name: "Français" },
      es: { code: "ES", flag: "assets/images/flags/es.png", name: "Español" },
      de: { code: "DE", flag: "assets/images/flags/de.png", name: "Deutsch" },
    };

    return languages[lang] || languages["en"];
  }

  // Initialize when document is ready
  $(document).ready(function () {
    initLanguageSwitcher();
  });
})(jQuery);
