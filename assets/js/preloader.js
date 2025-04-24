/**
 * Enhanced Preloader Script
 * This script ensures the website loads fully before the preloader exits
 */

(function() {
    // Variables to track loading status
    let imagesLoaded = false;
    let domLoaded = false;
    let minTimeElapsed = false;
    
    // Function to check if all conditions are met to hide preloader
    function checkAllLoaded() {
        if (imagesLoaded && domLoaded && minTimeElapsed) {
            hidePreloader();
        }
    }
    
    // Function to hide preloader
    function hidePreloader() {
        const preloader = document.querySelector('.tm-preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }
    
    // Set a minimum loading time (2.5 seconds)
    setTimeout(function() {
        minTimeElapsed = true;
        checkAllLoaded();
    }, 2500);
    
    // Function to track image loading
    function trackImageLoading() {
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        
        if (images.length === 0) {
            imagesLoaded = true;
            checkAllLoaded();
            return;
        }
        
        images.forEach(img => {
            // If image is already loaded
            if (img.complete) {
                imageLoaded();
            } else {
                // Add event listeners for loading and error
                img.addEventListener('load', imageLoaded);
                img.addEventListener('error', imageLoaded);
            }
        });
        
        function imageLoaded() {
            loadedImages++;
            if (loadedImages >= images.length) {
                imagesLoaded = true;
                checkAllLoaded();
            }
        }
    }
    
    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Mark DOM as loaded
        domLoaded = true;
        
        // Track image loading
        trackImageLoading();
        
        // Check all loaded
        checkAllLoaded();
    });
    
    // Fallback - if something goes wrong, don't keep users waiting forever
    window.addEventListener('load', function() {
        setTimeout(function() {
            const preloader = document.querySelector('.tm-preloader');
            if (preloader && preloader.style.display !== 'none') {
                console.log('Fallback: forcing preloader to hide after full page load');
                hidePreloader();
            }
        }, 5000);
    });
})();
