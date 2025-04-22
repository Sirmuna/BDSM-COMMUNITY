// Language options
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' }
];

// Initialize the language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const languageToggle = document.querySelector('.language-toggle');
  
  if (languageToggle) {
    // Create dropdown element
    const dropdown = document.createElement('div');
    dropdown.className = 'language-dropdown';
    dropdown.style.display = 'none';
    
    // Add language options to dropdown
    languages.forEach(lang => {
      const option = document.createElement('div');
      option.className = 'language-option';
      option.innerHTML = `<i class="fas fa-globe"></i> ${lang.name}`;
      option.setAttribute('data-lang', lang.code);
      
      option.addEventListener('click', function() {
        changeLanguage(lang.code);
        dropdown.style.display = 'none';
        
        // Update the toggle button text
        languageToggle.innerHTML = `<i class="fas fa-globe"></i> ${lang.name}`;
      });
      
      dropdown.appendChild(option);
    });
    
    // Append dropdown to the document
    document.body.appendChild(dropdown);
    
    // Toggle dropdown visibility when language button is clicked
    languageToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isVisible = dropdown.style.display === 'block';
      dropdown.style.display = isVisible ? 'none' : 'block';
      
      // Position the dropdown below the toggle button
      const rect = languageToggle.getBoundingClientRect();
      dropdown.style.top = `${rect.bottom}px`;
      dropdown.style.left = `${rect.left}px`;
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
      dropdown.style.display = 'none';
    });
  }
});

// Function to change the language
function changeLanguage(langCode) {
  // Here you would implement the actual language change logic
  // This could involve loading new translation files, updating the UI, etc.
  console.log(`Language changed to: ${langCode}`);
  
  // Example: You might set a cookie or localStorage item
  localStorage.setItem('preferredLanguage', langCode);
  
  // If you're using a translation library, you might call it here
  // i18n.changeLanguage(langCode);
}