// Shop functionality
(function ($) {
  "use strict";

  // Product data (sample data - would typically come from a database)
  const products = [
    {
      id: 1,
      name: "Premium Leather Restraints",
      category: "restraints",
      material: "leather",
      images: [
        "assets/images/product/bondage-set.jpeg",
        "assets/images/product/bondage-set-2.jpeg",
      ],
      rating: 5,
      description:
        "High-quality leather restraints designed for comfort and durability. Perfect for beginners and experienced users alike.",
    },
    {
      id: 2,
      name: "Luxury Blindfold",
      category: "sensory",
      material: "fabric",
      images: [
        "assets/images/product/cat-mask.jpeg",
        "assets/images/product/cat-mask-2.jpeg",
      ],
      rating: 4,
      description:
        "Soft, comfortable blindfold that blocks out all light for enhanced sensory play experiences.",
    },
    {
      id: 3,
      name: "Silk Rope Set",
      category: "restraints",
      material: "rope",
      images: [
        "assets/images/product/latex-wear.jpeg",
        "assets/images/product/latex-wear-2.jpeg",
      ],
      rating: 5,
      description:
        "Soft silk rope that is gentle on the skin while providing secure restraint. Includes 2 x 10m lengths.",
    },
    {
      id: 4,
      name: "Leather Paddle",
      category: "impact",
      material: "leather",
      images: [
        "assets/images/product/paddle.jpeg",
        "assets/images/product/paddle-2.jpeg",
      ],
      rating: 4,
      description:
        "Handcrafted leather paddle with a comfortable grip handle. Perfect for impact play.",
    },
    {
      id: 5,
      name: "Collar with Leash",
      category: "wearables",
      material: "leather",
      images: [
        "assets/images/product/collar.jpeg",
        "assets/images/product/collar-2.jpeg",
      ],
      rating: 5,
      description:
        "Adjustable leather collar with detachable leash. Comfortable for extended wear.",
    },
    {
      id: 6,
      name: "Feather Tickler",
      category: "sensory",
      material: "fabric",
      images: [
        "assets/images/product/feather.jpeg",
        "assets/images/product/feather-2.jpeg",
      ],
      rating: 3,
      description:
        "Soft feather tickler for gentle sensory play. Creates delightful sensations across the skin.",
    },
    {
      id: 7,
      name: "Beginners BDSM Kit",
      category: "beginners",
      material: "mixed",
      images: [
        "assets/images/product/beginner-kit.jpeg",
        "assets/images/product/beginner-kit-2.jpeg",
      ],
      rating: 5,
      description:
        "Complete kit for beginners including restraints, blindfold, and feather tickler. Perfect starter set.",
    },
    {
      id: 8,
      name: "Leather Flogger",
      category: "impact",
      material: "leather",
      images: [
        "assets/images/product/flogger.jpeg",
        "assets/images/product/flogger-2.jpeg",
      ],
      rating: 4,
      description:
        "Medium weight leather flogger with comfortable handle. Provides a range of sensations from gentle to intense.",
    },
    {
      id: 9,
      name: "Silicone Ball Gag",
      category: "accessories",
      material: "silicone",
      images: [
        "assets/images/product/gag.jpeg",
        "assets/images/product/gag-2.jpeg",
      ],
      rating: 4,
      description:
        "Comfortable silicone ball gag with adjustable leather strap. Breathable design for safety.",
    },
    {
      id: 10,
      name: "Leather Wrist Cuffs",
      category: "restraints",
      material: "leather",
      images: [
        "assets/images/product/wrist-cuffs.jpeg",
        "assets/images/product/wrist-cuffs-2.jpeg",
      ],
      rating: 5,
      description:
        "Padded leather wrist cuffs with secure buckle closure. Comfortable for extended wear.",
    },
    {
      id: 11,
      name: "Wartenberg Wheel",
      category: "sensory",
      material: "metal",
      images: [
        "assets/images/product/wheel.jpeg",
        "assets/images/product/wheel-2.jpeg",
      ],
      rating: 4,
      description:
        "Stainless steel pinwheel for intense sensory play. Creates unique sensations across the skin.",
    },
    {
      id: 12,
      name: "Leather Mask",
      category: "wearables",
      material: "leather",
      images: [
        "assets/images/product/mask.jpeg",
        "assets/images/product/mask-2.jpeg",
      ],
      rating: 5,
      description:
        "Handcrafted leather mask that covers the upper face. Adjustable strap for secure fit.",
    },
  ];

  // Variables
  let filteredProducts = [...products];
  let currentPage = 1;
  const productsPerPage = 9;
  const whatsappNumber = "+447497431388"; // Replace with your actual WhatsApp number

  // Initialize shop functionality
  function initShop() {
    // Load products on page load
    loadProducts();

    // Initialize event handlers
    initEventHandlers();

    // Update product count
    updateProductCount();
  }

  // Load products based on current filters and pagination
  function loadProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Clear product container
    $("#product-container").empty();

    // Show/hide no products message
    if (paginatedProducts.length === 0) {
      $(".no-products-message").show();
    } else {
      $(".no-products-message").hide();
    }

    // Generate product HTML
    paginatedProducts.forEach((product) => {
      const productHtml = generateProductHtml(product);
      $("#product-container").append(productHtml);
    });

    // Update pagination
    updatePagination();

    // Update product count
    updateProductCount();

    // Initialize tooltips for newly added elements
    $('[data-toggle="tooltip"]').tooltip();
  }

  // Generate HTML for a single product
  function generateProductHtml(product) {
    return `
            <div class="col-lg-4 col-md-6 col-12">
                <div class="tm-product">
                    <div class="tm-product-image">
                        <a href="#" class="quick-view" data-product-id="${
                          product.id
                        }">
                            <img src="${product.images[0]}" alt="${
      product.name
    }">
                        </a>
                        <div class="tm-product-actions">
                            <a href="#" class="tm-product-action-btn order-via-whatsapp" data-product-id="${
                              product.id
                            }" data-toggle="tooltip" data-placement="top" title="Order via WhatsApp">
                                <i class="fa fa-whatsapp"></i>
                            </a>
                            <a href="#" class="tm-product-action-btn quick-view" data-product-id="${
                              product.id
                            }" data-toggle="tooltip" data-placement="top" title="Quick view">
                                <i class="fa fa-search-plus"></i>
                            </a>
                        </div>
                    </div>
                    <div class="tm-product-content">
                        <h5 class="tm-product-title"><a href="#" class="quick-view" data-product-id="${
                          product.id
                        }">${product.name}</a></h5>
                        <div class="tm-product-rating">
                            ${generateRatingHtml(product.rating)}
                        </div>
                        <p class="nationwide-delivery-text"><i class="fa fa-truck"></i> Nationwide Delivery</p>
                    </div>
                </div>
            </div>
        `;
  }

  // Generate HTML for product rating
  function generateRatingHtml(rating) {
    let ratingHtml = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        ratingHtml += '<span class="active"><i class="fa fa-star"></i></span>';
      } else {
        ratingHtml += '<span><i class="fa fa-star"></i></span>';
      }
    }
    return ratingHtml;
  }

  // Update product count text
  function updateProductCount() {
    const startIndex = (currentPage - 1) * productsPerPage + 1;
    const endIndex = Math.min(
      startIndex + productsPerPage - 1,
      filteredProducts.length
    );

    if (filteredProducts.length === 0) {
      $("#product-count").text("No products found");
    } else {
      $("#product-count").text(
        `Showing ${startIndex}–${endIndex} of ${filteredProducts.length} results`
      );
    }
  }

  // Update pagination based on filtered products
  function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginationHtml = generatePaginationHtml(totalPages);

    $(".tm-pagination ul").html(paginationHtml);

    // Add active class to current page
    $(`.tm-pagination ul li a[data-page="${currentPage}"]`)
      .parent()
      .addClass("active");
  }

  // Generate pagination HTML
  function generatePaginationHtml(totalPages) {
    let paginationHtml = "";

    // Previous button
    paginationHtml += `<li><a href="#" class="prev-page"><i class="fa fa-chevron-left"></i></a></li>`;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      paginationHtml += `<li><a href="#" data-page="${i}">${i}</a></li>`;
    }

    // Next button
    paginationHtml += `<li><a href="#" class="next-page"><i class="fa fa-chevron-right"></i></a></li>`;

    return paginationHtml;
  }

  // Handle product detail view
  function handleProductDetail() {
    // Quick view click
    $(document).on("click", ".quick-view", function (e) {
      e.preventDefault();

      const productId = parseInt($(this).data("product-id"));
      const product = products.find((p) => p.id === productId);

      if (product) {
        // Populate quick view modal
        populateQuickViewModal(product);

        // Show modal
        $("#quickViewModal").modal("show");
      }
    });

    // Order via WhatsApp click
    $(document).on("click", ".order-via-whatsapp", function (e) {
      e.preventDefault();

      const productId = parseInt($(this).data("product-id"));
      const product = products.find((p) => p.id === productId);

      if (product) {
        // Create WhatsApp message
        const message = `Hello, I'm interested in ordering the ${product.name} from your BDSM Community Shop.`;
        const encodedMessage = encodeURIComponent(message);

        // Open WhatsApp with pre-filled message
        window.open(
          `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
          "_blank"
        );
      }
    });
  }

  // Populate quick view modal with product data
  function populateQuickViewModal(product) {
    // Clear previous content
    $(".tm-product-quickview-content").empty();
    $(".tm-product-quickview-thumbnails").empty();
    $(".tm-product-quickview-image").empty();

    // Add main image
    $(".tm-product-quickview-image").html(
      `<img src="${product.images[0]}" alt="${product.name}">`
    );

    // Add thumbnails
    product.images.forEach((image, index) => {
      const activeClass = index === 0 ? "active" : "";
      $(".tm-product-quickview-thumbnails").append(`
                <div class="tm-product-quickview-thumbnail ${activeClass}" data-image="${image}">
                    <img src="${image}" alt="${product.name} thumbnail ${
        index + 1
      }">
                </div>
            `);
    });

    // Add product details
    $(".tm-product-quickview-content").html(`
            <h5 class="tm-product-quickview-title">${product.name}</h5>
            <div class="tm-rating mb-10">
                ${generateRatingHtml(product.rating)}
            </div>
            <p class="nationwide-delivery-text mb-15"><i class="fa fa-truck"></i> Nationwide Delivery</p>
            <p class="tm-product-quickview-description">${
              product.description
            }</p>
            <div class="tm-product-quickview-meta">
                <div class="tm-product-quickview-meta-item">
                    <b>Category:</b> ${
                      product.category.charAt(0).toUpperCase() +
                      product.category.slice(1)
                    }
                </div>
                <div class="tm-product-quickview-meta-item">
                    <b>Material:</b> ${
                      product.material.charAt(0).toUpperCase() +
                      product.material.slice(1)
                    }
                </div>
            </div>
            <div class="tm-product-quickview-actions">
                <a href="#" class="tm-button order-via-whatsapp" data-product-id="${
                  product.id
                }">
                    <i class="fa fa-whatsapp"></i> Order via WhatsApp
                </a>
            </div>
        `);
  }

  // Initialize event handlers
  function initEventHandlers() {
    // Category filter click
    $(document).on("click", ".category-filter", function (e) {
      e.preventDefault();

      // Remove active class from all category filters
      $(".category-filter").removeClass("active");

      // Add active class to clicked filter
      $(this).addClass("active");

      const category = $(this).data("category");

      // Filter products by category
      if (category === "all") {
        filteredProducts = [...products];
      } else {
        filteredProducts = products.filter(
          (product) => product.category === category
        );
      }

      // Apply material filters if any are selected
      const selectedMaterials = [];
      $(".material-filter:checked").each(function () {
        selectedMaterials.push($(this).val());
      });

      if (selectedMaterials.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedMaterials.includes(product.material)
        );
      }

      // Reset to first page
      currentPage = 1;

      // Sort products
      sortProducts();

      // Load filtered products
      loadProducts();
    });

    // Material filter change
    $(document).on("change", ".material-filter", function () {
      const selectedMaterials = [];
      $(".material-filter:checked").each(function () {
        selectedMaterials.push($(this).val());
      });

      // Get selected category
      const selectedCategory = $(".category-filter.active").data("category");

      // Filter products by category first
      if (selectedCategory === "all") {
        filteredProducts = [...products];
      } else {
        filteredProducts = products.filter(
          (product) => product.category === selectedCategory
        );
      }

      // Then apply material filter if any materials are selected
      if (selectedMaterials.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedMaterials.includes(product.material)
        );
      }

      // Reset to first page
      currentPage = 1;

      // Sort products
      sortProducts();

      // Load filtered products
      loadProducts();
    });

    // Product sorting change
    $(document).on("change", "#product-sorting", function () {
      // Sort products
      sortProducts();

      // Load sorted products
      loadProducts();
    });

    // Search form submit (header)
    $(document).on("submit", "#header-search-form", function (e) {
      e.preventDefault();

      const searchTerm = $("#header-search-input").val().toLowerCase().trim();

      if (searchTerm) {
        // Filter products by search term
        filteredProducts = products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.material.toLowerCase().includes(searchTerm)
        );
      } else {
        // Reset to all products
        filteredProducts = [...products];
      }

      // Reset to first page
      currentPage = 1;

      // Sort products
      sortProducts();

      // Load filtered products
      loadProducts();

      // Close search box
      $(".header-searchbox").removeClass("is-visible");
    });

    // Search form submit (sidebar)
    $(document).on("submit", "#sidebar-search-form", function (e) {
      e.preventDefault();

      const searchTerm = $("#sidebar-search-input").val().toLowerCase().trim();

      if (searchTerm) {
        // Filter products by search term
        filteredProducts = products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.material.toLowerCase().includes(searchTerm)
        );
      } else {
        // Reset to all products
        filteredProducts = [...products];
      }

      // Reset to first page
      currentPage = 1;

      // Sort products
      sortProducts();

      // Load filtered products
      loadProducts();
    });

    // Pagination click
    $(document).on("click", ".tm-pagination ul li a", function (e) {
      e.preventDefault();

      // Handle previous page button
      if ($(this).hasClass("prev-page")) {
        if (currentPage > 1) {
          currentPage--;
          loadProducts();
        }
        return;
      }

      // Handle next page button
      if ($(this).hasClass("next-page")) {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage < totalPages) {
          currentPage++;
          loadProducts();
        }
        return;
      }

      // Handle page number click
      const page = parseInt($(this).data("page"));
      if (page !== currentPage) {
        currentPage = page;
        loadProducts();
      }
    });

    // Reset filters button click
    $(document).on("click", "#reset-filters", function (e) {
      e.preventDefault();

      // Reset all filters
      resetFilters();
    });

    // Quick view thumbnail click
    $(document).on("click", ".tm-product-quickview-thumbnail", function () {
      const image = $(this).data("image");

      // Update main image
      $(".tm-product-quickview-image img").attr("src", image);

      // Update active thumbnail
      $(".tm-product-quickview-thumbnail").removeClass("active");
      $(this).addClass("active");
    });

    // Newsletter form submit
    $(document).on("submit", ".widget-newsletter-form", function (e) {
      e.preventDefault();

      const email = $(this).find('input[type="email"]').val().trim();

      if (email) {
        // Show success message
        const successMessage = $(
          '<div class="alert alert-success mt-3">Thank you for subscribing to our newsletter!</div>'
        );
        $(this).append(successMessage);

        // Clear form
        $(this).find('input[type="email"]').val("");

        // Remove success message after 3 seconds
        setTimeout(() => {
          successMessage.fadeOut(function () {
            $(this).remove();
          });
        }, 3000);
      }
    });
  }

  // Sort products based on selected sorting option
  function sortProducts() {
    const sortingOption = $("#product-sorting").val();

    switch (sortingOption) {
      case "newest":
        // Sort by ID (assuming newer products have higher IDs)
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
      case "rating":
        // Sort by rating (highest first)
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        // Sort by name (A-Z)
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        // Sort by name (Z-A)
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (by ID)
        filteredProducts.sort((a, b) => a.id - b.id);
        break;
    }
  }

  // Reset all filters
  function resetFilters() {
    // Reset category filter
    $(".category-filter").removeClass("active");
    $('.category-filter[data-category="all"]').addClass("active");

    // Reset material filters
    $(".material-filter").prop("checked", false);

    // Reset search inputs
    $("#header-search-input, #sidebar-search-input").val("");

    // Reset products to original list
    filteredProducts = [...products];
    currentPage = 1;

    // Sort products
    sortProducts();

    // Load all products
    loadProducts();
  }

  // Initialize on document ready
  $(document).ready(function () {
    initShop();
    handleProductDetail();

    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Add custom CSS for WhatsApp button
    $("<style>")
      .prop("type", "text/css")
      .html(
        `
        .order-via-whatsapp {
          background-color: #25D366 !important;
          color: white !important;
        }
        .order-via-whatsapp:hover {
          background-color: #128C7E !important;
        }
        .tm-product-actions {
          display: flex;
          flex-direction: row;
        }
        .tm-product-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `
      )
      .appendTo("head");

    console.log("Document ready, shop functionality initialized");
  });
})(jQuery);
