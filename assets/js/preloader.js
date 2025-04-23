// Preloader functionality
$(window).on("load", function () {
  // Hide preloader when page is fully loaded
  $(".tm-preloader").fadeOut(500);
});

// Fallback in case window load event doesn't fire properly
$(document).ready(function () {
  // Set a timeout to ensure preloader disappears even if some resources are slow to load
  setTimeout(function () {
    $(".tm-preloader").fadeOut(500);
  }, 2500);
});
