/**
 * Language Switcher Functionality for both Desktop and Mobile
 * Handles language switching across the site
 */
document.addEventListener("DOMContentLoaded", function () {
  // Desktop language switcher elements
  const languageBtn = document.getElementById("languageBtn");
  const languageDropdown = document.getElementById("languageDropdown");
  const languageOptions = document.querySelectorAll(".language-option");

  // Language definitions
  const languages = {
    'en': { code: 'EN', flag: 'assets/images/flags/en.png', name: 'English' },
    'fr': { code: 'FR', flag: 'assets/images/flags/fr.png', name: 'Français' },
    'es': { code: 'ES', flag: 'assets/images/flags/es.png', name: 'Español' },
    'de': { code: 'DE', flag: 'assets/images/flags/de.png', name: 'Deutsch' }
  };

  // Function to toggle desktop dropdown visibility
  function toggleDesktopDropdown(event) {
    event.preventDefault();
    event.stopPropagation();

    const isVisible = languageDropdown.classList.contains("show");

    if (isVisible) {
      languageDropdown.classList.remove("show");
    } else {
      languageDropdown.classList.add("show");

      // Position the dropdown correctly for mobile
      if (window.innerWidth < 768) {
        languageDropdown.style.width = "100%";
      } else {
        languageDropdown.style.width = "auto";
      }
    }
  }

  // Add click event to desktop language button
  if (languageBtn) {
    languageBtn.addEventListener("click", toggleDesktopDropdown);
  }

  // Handle desktop language selection
  languageOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      changeLanguage(lang);

      // Update button text
      const langText = this.textContent.trim();
      languageBtn.innerHTML = `<i class="fas fa-globe"></i> ${langText} <i class="fas fa-caret-down"></i>`;

      // Hide dropdown
      languageDropdown.classList.remove("show");
    });
  });

  // Close desktop dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".language-switcher")) {
      languageDropdown.classList.remove("show");
    }
  });

  // Mobile language switcher setup
  setupMobileLanguageSwitcher();

  // Function to change language
  function changeLanguage(lang) {
    console.log(`Changing language to: ${lang}`);

    // Store the selected language preference
    localStorage.setItem("selectedLanguage", lang);

    // Update both desktop and mobile displays
    updateLanguageDisplay(lang);

    // Here you would implement the actual language change
    // This could involve loading translation files or redirecting to localized pages
    
    // Example: You could reload the page with a language parameter
    // window.location.href = `?lang=${lang}`;

    // Or if you're using a translation library, you might call it here
    // i18n.changeLanguage(lang);
  }

  // Function to set up mobile language switcher
  function setupMobileLanguageSwitcher() {
    // Check if mobile menu exists
    const mobileNav = document.querySelector('.tm-mobilenav .mean-nav > ul');
    if (!mobileNav) return;

    // Create mobile language switcher
    const mobileSwitcherLi = document.createElement('li');
    mobileSwitcherLi.className = 'mean-language-switcher';
    
    const mobileCloneDiv = document.createElement('div');
    mobileCloneDiv.className = 'language-switcher-mobile-clone';
    
    mobileSwitcherLi.appendChild(mobileCloneDiv);
    mobileNav.appendChild(mobileSwitcherLi);

    // Create mobile language toggle
    const mobileToggle = document.createElement('a');
    mobileToggle.className = 'language-toggle-mobile';
    mobileToggle.href = '#';
    
    // Create mobile dropdown
    const mobileDropdown = document.createElement('div');
    mobileDropdown.className = 'language-dropdown-mobile';

    // Add languages to mobile dropdown
    for (const [langCode, langData] of Object.entries(languages)) {
      const langLink = document.createElement('a');
      langLink.href = '#';
      langLink.setAttribute('data-lang', langCode);
      
      const langImg = document.createElement('img');
      langImg.src = langData.flag;
      langImg.alt = langData.name;
      
      const langSpan = document.createElement('span');
      langSpan.textContent = langData.name;
      
      langLink.appendChild(langImg);
      langLink.appendChild(langSpan);
      mobileDropdown.appendChild(langLink);
    }

    // Add toggle and dropdown to mobile clone
    mobileCloneDiv.appendChild(mobileToggle);
    mobileCloneDiv.appendChild(mobileDropdown);

    // Handle mobile toggle click
    mobileToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      mobileDropdown.classList.toggle('active');
      adjustMeanContainerHeight();
    });

    // Handle mobile language selection
    mobileDropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const lang = this.getAttribute('data-lang');
        changeLanguage(lang);
        
        // Close dropdown
        mobileDropdown.classList.remove('active');
        adjustMeanContainerHeight();
      });
    });

    // Close mobile dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.mean-language-switcher')) {
        mobileDropdown.classList.remove('active');
        adjustMeanContainerHeight();
      }
    });
  }

  // Function to adjust mean container height
  function adjustMeanContainerHeight() {
    const mobileDropdown = document.querySelector('.language-dropdown-mobile');
    const meanContainer = document.querySelector('.mean-container');
    
    if (!mobileDropdown || !meanContainer) return;
    
    if (mobileDropdown.classList.contains('active')) {
      const dropdownHeight = mobileDropdown.offsetHeight;
      const currentHeight = meanContainer.offsetHeight;
      meanContainer.style.height = (currentHeight + dropdownHeight) + 'px';
    } else {
      meanContainer.style.height = 'auto';
    }
  }

  // Function to update language display in both desktop and mobile
  function updateLanguageDisplay(lang) {
    const langData = languages[lang] || languages['en'];
    
    // Update desktop display if it exists
    if (languageBtn) {
      const desktopOption = document.querySelector(`.language-option[data-lang="${lang}"]`);
      if (desktopOption) {
        const langText = desktopOption.textContent.trim();
        languageBtn.innerHTML = `<i class="fas fa-globe"></i> ${langText} <i class="fas fa-caret-down"></i>`;
      }
    }
    
    // Update mobile display if it exists
    const mobileToggle = document.querySelector('.language-toggle-mobile');
    if (mobileToggle) {
      mobileToggle.innerHTML = `
        <img src="${langData.flag}" alt="${langData.code}">
        <span>${langData.code}</span>
        <i class="fas fa-caret-down"></i>
      `;
    }
  }

  // Initialize language from saved preference
  const savedLanguage = localStorage.getItem("selectedLanguage") || 'en';
  updateLanguageDisplay(savedLanguage);
});
