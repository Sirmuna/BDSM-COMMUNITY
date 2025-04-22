/**
 * Shop page functionality for BDSM Community website
 * Handles product search, filtering, sorting, and view mode
 */

(function ($) {
  "use strict";

  // Load products
  $(document).ready(function () {
    // Load products from shop-products.html
    $("#product-container").load("shop-products.html", function () {
      initializeShopFunctionality();
    });

    // Load pagination from shop-pagination.html
    $("#shop-pagination").load("shop-pagination.html", function () {
      initializePagination();
    });

    // Language switcher functionality
    initializeLanguageSwitcher();
  });

  function initializeShopFunctionality() {
    // Cache elements
    const productItems = $(".product-item");
    const noProductsMessage = $(".no-products-found");

    // Search functionality
    $("#product-search-form").on("submit", function (e) {
      e.preventDefault();
      filterProducts();
    });

    // Real-time search as user types
    $("#product-search-input").on("keyup", function () {
      filterProducts();
    });

    // Category filtering
    $(".widget-categories ul li a").on("click", function (e) {
      e.preventDefault();
      $(".widget-categories ul li a").removeClass("active");
      $(this).addClass("active");
      filterProducts();
    });

    // Sorting functionality
    $("#product-sorting").on("change", function () {
      const sortingValue = $(this).val();
      const productContainer = $(".product-container");
      const items = productContainer.find(".product-item").get();

      items.sort(function (a, b) {
        switch (sortingValue) {
          case "newest":
            return $(b).data("date").localeCompare($(a).data("date"));
          case "popularity":
            return $(b).data("popularity") - $(a).data("popularity");
          case "rating":
            return $(b).data("rating") - $(a).data("rating");
          default: // default sorting - alphabetically by title
            return $(a)
              .find(".tm-product-title a")
              .text()
              .localeCompare($(b).find(".tm-product-title a").text());
        }
      });

      // Remove existing items and append sorted ones
      productContainer.empty();
      $.each(items, function (i, item) {
        productContainer.append(item);
      });

      // Re-apply any active filters
      filterProducts();
    });

    // View mode switching (grid/list)
    $(".shop-toolbar-viewmode button").on("click", function () {
      const viewMode = $(this).data("view");

      // Remove active class from all view mode buttons
      $(".shop-toolbar-viewmode button").removeClass("active");
      // Add active class to clicked button
      $(this).addClass("active");

      if (viewMode === "grid") {
        $(".product-container").removeClass("list-view").addClass("grid-view");
        productItems
          .removeClass("col-12")
          .addClass("col-lg-4 col-md-6 col-sm-6");
      } else {
        $(".product-container").removeClass("grid-view").addClass("list-view");
        productItems
          .removeClass("col-lg-4 col-md-6 col-sm-6")
          .addClass("col-12");
      }
    });

    // Reset filters
    $("#reset-filters").on("click", function () {
      $("#product-search-input").val("");
      $(".widget-categories ul li a").removeClass("active");
      $(".widget-categories ul li a[data-category='all']").addClass("active");
      $("#product-sorting").val("default");

      productItems.removeClass("hidden").show();
      noProductsMessage.hide();
      updateResultsCount();
    });

    // Main filter function
    function filterProducts() {
      const searchQuery = $("#product-search-input").val().toLowerCase().trim();
      const selectedCategory = $(".widget-categories ul li a.active").data(
        "category"
      );

      let visibleProducts = 0;

      productItems.each(function () {
        const $item = $(this);
        const productTitle = $item
          .find(".tm-product-title a")
          .text()
          .toLowerCase();
        const productCategory = $item.data("category");

        const matchesSearch =
          searchQuery === "" || productTitle.includes(searchQuery);
        const matchesCategory =
          selectedCategory === "all" || productCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
          $item.removeClass("hidden").show();
          visibleProducts++;
        } else {
          $item.addClass("hidden").hide();
        }
      });

      // Show/hide no products message
      if (visibleProducts === 0) {
        if (noProductsMessage.length) {
          noProductsMessage.show();
        } else {
          $(".product-container").append(
            '<div class="no-products-found col-12 text-center py-5"><h4>No products found matching your criteria</h4></div>'
          );
        }
      } else {
        $(".no-products-found").hide();
      }

      updateResultsCount(visibleProducts);
    }

    // Update results count in the toolbar
    function updateResultsCount(visibleCount) {
      const totalProducts = productItems.length;
      const visibleProducts =
        visibleCount !== undefined
          ? visibleCount
          : productItems.filter(":visible").length;
      $(".shop-toolbar-left p").text(
        `Showing 1–${visibleProducts} of ${totalProducts} results`
      );
    }

    // Initialize product quickview
    initializeQuickView();
  }

  // Pagination functionality
  function initializePagination() {
    const itemsPerPage = 12;
    const $pagination = $(".tm-pagination ul");
    const $productItems = $(".product-item");

    if ($productItems.length <= itemsPerPage) {
      $pagination.hide();
      return;
    }

    const totalPages = Math.ceil($productItems.length / itemsPerPage);

    // Show only the first page of items initially
    $productItems.hide();
    $productItems.slice(0, itemsPerPage).show();

    // Handle pagination click
    $pagination.on("click", "a", function (e) {
      e.preventDefault();

      const $this = $(this);
      const pageNum = parseInt($this.text());

      // Handle next/prev buttons
      if ($this.find("i.zmdi-chevron-left").length) {
        const currentPage = $pagination.find("li.active");
        const prevPage = currentPage.prev().find("a");
        if (prevPage.length && !prevPage.find("i").length) {
          prevPage.trigger("click");
        }
        return;
      }

      if ($this.find("i.zmdi-chevron-right").length) {
        const currentPage = $pagination.find("li.active");
        const nextPage = currentPage.next().find("a");
        if (nextPage.length && !nextPage.find("i").length) {
          nextPage.trigger("click");
        }
        return;
      }

      // Set active page
      $pagination.find("li").removeClass("active");
      $this.parent().addClass("active");

      // Show the appropriate items
      const startItem = (pageNum - 1) * itemsPerPage;
      const endItem = startItem + itemsPerPage;

      $productItems.hide();
      $productItems.slice(startItem, endItem).show();

      // Scroll to top of products
      $("html, body").animate(
        {
          scrollTop: $("#product-container").offset().top - 100,
        },
        500
      );
    });
  }

  // Product quickview functionality
  function initializeQuickView() {
    // Handle quickview button click
    $(document).on("click", "[data-fancybox]", function () {
      const $button = $(this);
      const $product = $button.closest(".tm-product");
      const productTitle = $product.find(".tm-product-title a").text();
      const productImage = $product.find(".tm-product-image img").attr("src");

      // Update quickview modal content
      $("#tm-product-quickview .tm-prodetails-title").text(productTitle);
      $("#tm-product-quickview .tm-prodetails-largeimage img").attr(
        "src",
        productImage
      );
    });
  }

  // Language switcher functionality
  function initializeLanguageSwitcher() {
    // Desktop language switcher
    $("#language-toggle-desktop").on("click", function () {
      $("#language-dropdown-desktop").toggleClass("show");
    });

    // Mobile language switcher
    $("#language-toggle-mobile").on("click", function () {
      $("#language-dropdown-mobile").toggleClass("show");
    });

    // Language selection
    $(".language-option").on("click", function () {
      const lang = $(this).data("lang");
      const langText = $(this).find("span").text().slice(0, 2);
      const langImg = $(this).find("img").attr("src");

      // Update toggle button
      $("#language-toggle-desktop img, #language-toggle-mobile img").attr(
        "src",
        langImg
      );
      $("#language-toggle-desktop span, #language-toggle-mobile span").text(
        langText
      );

      // Hide dropdown
      $("#language-dropdown-desktop, #language-dropdown-mobile").removeClass(
        "show"
      );

      // Here you would implement the actual language change
      // changeLanguage(lang);
    });

    // Close dropdown when clicking outside
    $(document).on("click", function (e) {
      if (
        !$(e.target).closest(".language-switcher, .language-switcher-mobile")
          .length
      ) {
        $("#language-dropdown-desktop, #language-dropdown-mobile").removeClass(
          "show"
        );
      }
    });
  }

  // Add to cart functionality
  $(document).on(
    "click",
    ".tm-product-actions a[href='cart.html'], .tm-button-dark",
    function (e) {
      e.preventDefault();
      const $product = $(this).closest(".tm-product");
      const productName = $product.find(".tm-product-title a").text();

      // Display confirmation message
      const $message = $(
        "<div class='cart-message' style='position:fixed; top:20px; right:20px; background:#e73d3e; color:white; padding:15px; border-radius:5px; z-index:9999;'>"
      ).text(`"${productName}" added to cart`);
      $("body").append($message);

      setTimeout(function () {
        $message.fadeOut(function () {
          $(this).remove();
        });
      }, 3000);

      // You would typically send an AJAX request to add the item to cart
      // addToCart(productId, quantity);
    }
  );
})(jQuery);
