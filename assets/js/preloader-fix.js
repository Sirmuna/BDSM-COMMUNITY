// // Immediately hide preloader
// document.addEventListener("DOMContentLoaded", function () {
//   // Force hide preloader with inline style
//   var preloader = document.querySelector(".tm-preloader");
//   if (preloader) {
//     preloader.style.display = "none";
//     preloader.style.opacity = "0";
//     preloader.style.visibility = "hidden";
//   }
// });

// // Backup approach using jQuery when it loads
// window.addEventListener("load", function () {
//   if (typeof jQuery !== "undefined") {
//     jQuery(".tm-preloader").hide();
//   }
// });

// // Final fallback with timeout
// setTimeout(function () {
//   var preloader = document.querySelector(".tm-preloader");
//   if (preloader) {
//     preloader.style.display = "none";
//     preloader.style.opacity = "0";
//     preloader.style.visibility = "hidden";

//     // Try to remove it completely from DOM as last resort
//     if (preloader.parentNode) {
//       preloader.parentNode.removeChild(preloader);
//     }
//   }
// }, 1000);
