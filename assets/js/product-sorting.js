// Product Sorting Functionality
document.addEventListener("DOMContentLoaded", function () {
  const sortingSelect = document.querySelector(".shop-toolbar-sorting select");
  const productsContainer = document.querySelector(".shop-page-products .row");
  const productItems = document.querySelectorAll(".tm-product");

  // Store original product order
  const originalOrder = Array.from(
    document.querySelectorAll(".tm-product")
  ).map((product) => {
    const productElement = product.closest(".col-lg-4");
    return {
      element: productElement,
      title: product.querySelector(".tm-product-title a").textContent,
      rating: product.querySelectorAll(".tm-product-rating .active").length,
      // Simulate price and date for sorting
      price: parseFloat(Math.random() * 100 + 20).toFixed(2),
      date: new Date(
        2023,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ),
    };
  });

  // Add price display to products (for demonstration)
  addPricesToProducts();

  // Add event listener to sorting select
  if (sortingSelect) {
    sortingSelect.addEventListener("change", function () {
      const sortValue = this.value;
      sortProducts(sortValue);
    });
  }

  // Sort products based on selected option
  function sortProducts(sortValue) {
    const sortedProducts = [...originalOrder];

    switch (sortValue) {
      case "default":
        // Default sorting (original order)
        break;

      case "price-low":
        // Sort by price: low to high
        sortedProducts.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
        break;

      case "price-high":
        // Sort by price: high to low
        sortedProducts.sort(
          (a, b) => parseFloat(b.price) - parseFloat(a.price)
        );
        break;

      case "newest":
        // Sort by date: newest first
        sortedProducts.sort((a, b) => b.date - a.date);
        break;

      case "popularity":
        // Sort by a simulated popularity metric (could be based on sales, views, etc.)
        sortedProducts.sort((a, b) => Math.random() - 0.5); // Random for demonstration
        break;

      case "rating":
        // Sort by rating: highest first
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;

      case "name-az":
        // Sort alphabetically A-Z
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "name-za":
        // Sort alphabetically Z-A
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    // Reorder products in the DOM
    const fragment = document.createDocumentFragment();
    sortedProducts.forEach((product) => {
      fragment.appendChild(product.element.cloneNode(true));
    });

    // Clear and repopulate the products container
    const productsRow = document.querySelector(".shop-page-products .row");
    // Preserve the first child (shop toolbar)
    const shopToolbar = productsRow.querySelector(".col-12:first-child");
    const shopIntro = productsRow.querySelector(".col-12.mb-50");

    productsRow.innerHTML = "";
    productsRow.appendChild(shopToolbar);
    productsRow.appendChild(shopIntro);
    productsRow.appendChild(fragment);

    // Reattach event listeners to the new elements
    reattachEventListeners();
  }

  // Add prices to products for demonstration
  function addPricesToProducts() {
    originalOrder.forEach((product) => {
      const priceElement = product.element.querySelector(".tm-product-price");
      if (priceElement) {
        priceElement.innerHTML = `$${product.price}`;
      }
    });
  }

  // Reattach event listeners after DOM manipulation
  function reattachEventListeners() {
    // Reattach product action buttons
    document
      .querySelectorAll(".tm-product-actions button, .tm-product-actions a")
      .forEach((button) => {
        button.addEventListener("click", function (e) {
          if (this.dataset.fancybox) {
            // Handle quickview
          } else if (this.href && this.href.includes("cart.html")) {
            // Handle add to cart
            e.preventDefault();
            alert("Product added to cart!");
          } else if (this.href && this.href.includes("favorite")) {
            // Handle add to favorites
            e.preventDefault();
            alert("Product added to favorites!");
          }
        });
      });
  }

  // Update sorting options
  function updateSortingOptions() {
    if (sortingSelect) {
      // Clear existing options
      sortingSelect.innerHTML = "";

      // Add comprehensive sorting options
      const options = [
        { value: "default", text: "Default sorting" },
        { value: "popularity", text: "Sort by popularity" },
        { value: "rating", text: "Sort by average rating" },
        { value: "newest", text: "Sort by newest" },
        { value: "price-low", text: "Sort by price: low to high" },
        { value: "price-high", text: "Sort by price: high to low" },
        { value: "name-az", text: "Sort by name: A to Z" },
        { value: "name-za", text: "Sort by name: Z to A" },
      ];

      options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        sortingSelect.appendChild(optionElement);
      });
    }
  }

  // Initialize with updated sorting options
  updateSortingOptions();
});
