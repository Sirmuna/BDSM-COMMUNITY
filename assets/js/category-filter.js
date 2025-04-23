// Product Category Filtering
document.addEventListener("DOMContentLoaded", function () {
  const categoryLinks = document.querySelectorAll(".widget-categories ul li a");
  const productItems = document.querySelectorAll(".tm-product");

  // Add data-category attributes to products
  setupProductCategories();

  // Add click event listeners to category links
  categoryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all links
      categoryLinks.forEach((item) => item.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");

      // Get category from the link text
      const category = this.textContent.split("(")[0].trim().toLowerCase();

      // Filter products by category
      filterByCategory(category);

      // Update results count
      updateCategoryResultsCount(category);
    });
  });

  // Add "All Products" option at the top of categories
  addAllProductsOption();

  // Setup product categories based on their titles
  function setupProductCategories() {
    const categoryMap = {
      restraints: "restraints & bondage",
      leather: "restraints & bondage",
      rope: "restraints & bondage",
      cuffs: "restraints & bondage",
      collar: "restraints & bondage",
      paddle: "impact play",
      flogger: "impact play",
      whip: "impact play",
      crop: "impact play",
      blindfold: "sensory play",
      massage: "sensory play",
      feather: "sensory play",
      tickler: "sensory play",
      oil: "sensory play",
      latex: "wearables",
      "leather wear": "wearables",
      mask: "wearables",
      costume: "wearables",
      beginner: "beginners sets",
      starter: "beginners sets",
      kit: "beginners sets",
    };

    productItems.forEach((product) => {
      const title = product
        .querySelector(".tm-product-title a")
        .textContent.toLowerCase();
      let assignedCategory = "accessories"; // Default category

      // Check title against keywords to assign category
      for (const [keyword, category] of Object.entries(categoryMap)) {
        if (title.includes(keyword)) {
          assignedCategory = category;
          break;
        }
      }

      // Set data attribute for filtering
      product.setAttribute("data-category", assignedCategory);
    });
  }

  // Filter products by category
  function filterByCategory(category) {
    if (category === "all products") {
      // Show all products
      productItems.forEach((product) => {
        product.style.display = "";
      });
    } else {
      // Filter by selected category
      productItems.forEach((product) => {
        if (product.getAttribute("data-category").toLowerCase() === category) {
          product.style.display = "";
        } else {
          product.style.display = "none";
        }
      });
    }
  }

  // Update results count when filtering by category
  function updateCategoryResultsCount(category) {
    let visibleCount = 0;

    if (category === "all products") {
      visibleCount = productItems.length;
    } else {
      visibleCount = document.querySelectorAll(
        `.tm-product[data-category="${category}"]`
      ).length;
    }

    const resultsCountElement = document.querySelector(".shop-toolbar-left p");
    if (resultsCountElement) {
      resultsCountElement.textContent = `Showing ${visibleCount} of ${productItems.length} results`;
    }
  }

  // Add "All Products" option at the top of categories
  function addAllProductsOption() {
    const categoriesList = document.querySelector(".widget-categories ul");
    if (categoriesList) {
      const allProductsLi = document.createElement("li");
      allProductsLi.innerHTML = `<a href="#" class="active">All Products <span>(${productItems.length})</span></a>`;
      categoriesList.insertBefore(allProductsLi, categoriesList.firstChild);

      // Add event listener to the new "All Products" link
      allProductsLi.querySelector("a").addEventListener("click", function (e) {
        e.preventDefault();

        // Remove active class from all links
        categoryLinks.forEach((item) => item.classList.remove("active"));

        // Add active class to this link
        this.classList.add("active");

        // Show all products
        filterByCategory("all products");

        // Update results count
        updateCategoryResultsCount("all products");
      });
    }
  }
});
