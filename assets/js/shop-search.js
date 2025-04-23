// Shop Search Functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.querySelector(".widget-search-form");
  const searchInput = searchForm.querySelector('input[type="text"]');
  const productItems = document.querySelectorAll(".tm-product");

  // Store original products for reset
  const originalProducts = Array.from(productItems).map((item) => {
    return {
      element: item,
      title: item
        .querySelector(".tm-product-title a")
        .textContent.toLowerCase(),
    };
  });

  // Handle search form submission
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === "") {
      // If search is empty, show all products
      resetProducts();
      return;
    }

    // Filter products based on search term
    filterProducts(searchTerm);

    // Update results count
    updateResultsCount();
  });

  // Filter products based on search term
  function filterProducts(searchTerm) {
    let matchCount = 0;

    originalProducts.forEach((product) => {
      if (product.title.includes(searchTerm)) {
        product.element.style.display = "";
        matchCount++;
      } else {
        product.element.style.display = "none";
      }
    });

    // Show message if no results found
    const noResultsMsg = document.querySelector(".no-results-message");
    if (matchCount === 0) {
      if (!noResultsMsg) {
        const message = document.createElement("div");
        message.className = "no-results-message col-12 mt-4";
        message.innerHTML = `<p>No products found matching "${searchTerm}". <a href="#" class="reset-search">View all products</a></p>`;
        document.querySelector(".shop-page-products .row").appendChild(message);

        // Add event listener to reset link
        document
          .querySelector(".reset-search")
          .addEventListener("click", function (e) {
            e.preventDefault();
            searchInput.value = "";
            resetProducts();
          });
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }

  // Reset products to show all
  function resetProducts() {
    originalProducts.forEach((product) => {
      product.element.style.display = "";
    });

    const noResultsMsg = document.querySelector(".no-results-message");
    if (noResultsMsg) {
      noResultsMsg.remove();
    }

    updateResultsCount();
  }

  // Update the results count in the toolbar
  function updateResultsCount() {
    const visibleProducts = document.querySelectorAll(
      '.tm-product[style="display: none;"]'
    );
    const totalProducts = originalProducts.length;
    const visibleCount = totalProducts - visibleProducts.length;

    const resultsCountElement = document.querySelector(".shop-toolbar-left p");
    if (resultsCountElement) {
      resultsCountElement.textContent = `Showing ${visibleCount} of ${totalProducts} results`;
    }
  }

  // Also handle the header search form
  const headerSearchForm = document.querySelector(".header-searchform");
  if (headerSearchForm) {
    headerSearchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const headerSearchTerm = headerSearchForm
        .querySelector('input[type="text"]')
        .value.toLowerCase()
        .trim();

      // Set the sidebar search input to the same value
      searchInput.value = headerSearchTerm;

      // Trigger the search
      if (headerSearchTerm === "") {
        resetProducts();
      } else {
        filterProducts(headerSearchTerm);
      }

      // Update results count
      updateResultsCount();

      // Close the header search box if it has a close button
      const closeButton = document.querySelector(".search-close");
      if (closeButton) {
        closeButton.click();
      }
    });
  }
});
