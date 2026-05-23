/**
   OmniFind — Core Application Coordinator & Orchestrator
   Designed cleanly for learning developers.
========================================================================== */

import { products, state } from "./data.js";
import { createProductCard } from "./components/productCard.js";
import { openQuickViewModal, initDialogHelpers } from "./components/detailModal.js";
import { toggleCartDrawer, renderCartDrawer, initCartPanel } from "./components/cartPanel.js";
import { openCheckoutModal } from "./components/checkoutFlow.js";
import { initDashboardCustomizer, openDashboardModal } from "./components/dashboard.js";

// Make state globally accessible to other components via the window object
window.omnifindState = state;

/**
 * Main Initialization Entrance
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize generic native Dialog controllers (Light dismiss, escape close)
  initDialogHelpers();

  // 2. Initialize sidebar cart controls (backdrop, proceed listeners)
  initCartPanel(state, {
    onStartCheckout: startCheckoutWizard
  });

  // 3. Initialize custom dashboard controls (colors, contrast, buttons)
  initDashboardCustomizer();

  // 4. Set up core DOM event listeners (Search, sorting, navigation)
  initCoreListeners();

  // 5. Initialize light/dark theme preference
  initThemeToggle();

  // 6. Draw product items for the first time
  renderProducts();
  renderCartDrawer(state, getCartCallbacks());
});

/* ==========================================================================
   Core Rendering Coordinator
   ========================================================================== */

/**
 * Filters, sorts, and renders the products list into the grid viewport.
 */
function renderProducts() {
  const grid = document.getElementById("product-grid");
  const emptyState = document.getElementById("no-results-card");
  const filterInfo = document.getElementById("active-filters-info");
  const summaryText = document.getElementById("filter-summary-text");
  
  if (!grid) return;

  // 1. Filter products by search input and active category pill
  let filtered = products.filter(product => {
    const matchesCategory = state.filters.category === "all" || product.category === state.filters.category;
    
    const query = state.filters.searchQuery.toLowerCase().trim();
    const matchesSearch = query === "" || 
      product.title.toLowerCase().includes(query) || 
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);

    const matchesPrice = product.price <= state.filters.maxPrice;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  // 2. Sort the filtered dataset
  if (state.filters.sortBy === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.filters.sortBy === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.filters.sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  } // 'featured' keeps default catalog ordering

  // 3. Update active filter status alerts
  const isFiltering = state.filters.category !== "all" || 
                      state.filters.searchQuery !== "" || 
                      state.filters.maxPrice < 1000;
  
  if (isFiltering && filterInfo && summaryText) {
    filterInfo.style.display = "flex";
    summaryText.textContent = `Found ${filtered.length} curated matches`;
  } else if (filterInfo) {
    filterInfo.style.display = "none";
  }

  // 4. Render product cards or reveal empty-state card
  grid.innerHTML = "";
  
  if (filtered.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";

  // Build callbacks map for card interactions
  const cardCallbacks = {
    onToggleWishlist: toggleWishlistState,
    onOpenQuickView: openQuickView,
    onAddToCart: (product) => addItemToCart(product, 1)
  };

  // Construct and append card elements
  filtered.forEach((product, index) => {
    const cardNode = createProductCard(product, state, cardCallbacks);
    cardNode.style.setProperty("--card-index", index);
    grid.appendChild(cardNode);
  });
}

/* ==========================================================================
   State Mutation Handlers & Callbacks
   ========================================================================== */

/**
 * Returns cart mutation event hooks to pass down to cart UI.
 */
function getCartCallbacks() {
  return {
    onUpdateQuantity: updateCartItemQuantity,
    onRemoveItem: removeCartItem
  };
}

/**
 * Toggles a product in or out of the saved items wishlist.
 */
function toggleWishlistState(productId) {
  if (state.wishlist.has(productId)) {
    state.wishlist.delete(productId);
  } else {
    state.wishlist.add(productId);
  }

  // Sync header badge indicator
  const badge = document.getElementById("wishlist-count");
  if (badge) badge.textContent = state.wishlist.size;
}

/**
 * Triggers detailed presentation sheet using the `<dialog>` element.
 */
function openQuickView(productId) {
  const selectedProduct = products.find(p => p.id === productId);
  if (selectedProduct) {
    openQuickViewModal(selectedProduct, state, {
      onAddToCart: addItemToCart
    });
  }
}

/**
 * Appends a product (or expands quantity of existing product) to the shopping cart.
 */
function addItemToCart(product, quantityToAdd = 1) {
  const existingItem = state.cart.find(item => item.product.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantityToAdd;
  } else {
    state.cart.push({ product, quantity: quantityToAdd });
  }

  // Redraw catalog cards to reflect cart numbers, then update the cart panel drawer
  renderProducts();
  renderCartDrawer(state, getCartCallbacks());
  
  // Show micro-animation toast or open the drawer immediately for fluid response!
  toggleCartDrawer(true);
}

/**
 * Safely increases or decreases quantity of a product in the cart.
 */
function updateCartItemQuantity(productId, delta) {
  const item = state.cart.find(item => item.product.id === productId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    removeCartItem(productId);
  } else {
    renderProducts();
    renderCartDrawer(state, getCartCallbacks());
  }
}

/**
 * Removes a product from the shopping cart.
 */
function removeCartItem(productId) {
  state.cart = state.cart.filter(item => item.product.id !== productId);
  
  renderProducts();
  renderCartDrawer(state, getCartCallbacks());
}

/**
 * Callback launcher that starts the step-by-step checkout dialog box.
 */
function startCheckoutWizard() {
  openCheckoutModal(state, {
    onCheckoutComplete: finalizeTransaction
  });
}

/**
 * Transaction finalization after payment completes: cleans cart and appends purchase history.
 */
function finalizeTransaction(orderDetails) {
  // 1. Add this order record to simulated orders history
  state.orders.push(orderDetails);

  // 2. Clear out shopping cart completely
  state.cart = [];

  // 3. Re-render catalog and cart elements to reflect clean layout
  renderProducts();
  renderCartDrawer(state, getCartCallbacks());
}

/* ==========================================================================
   Core UI Input Event Binding
   ========================================================================== */

/**
 * Initial setups for main user forms, category filters, and search.
 */
function initCoreListeners() {
  // 1. Category Pill buttons
  const categoryPills = document.querySelectorAll(".nav-link-btn");
  categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      state.filters.category = pill.getAttribute("data-category");
      renderProducts();
    });
  });

  // 2. Global live search bar
  const searchInput = document.getElementById("global-search");
  const clearSearchBtn = document.getElementById("clear-search-btn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value;
      state.filters.searchQuery = value;
      
      // Toggle "X" clear button visibility
      if (value.length > 0) {
        clearSearchBtn.classList.add("show");
      } else {
        clearSearchBtn.classList.remove("show");
      }

      renderProducts();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.filters.searchQuery = "";
      clearSearchBtn.classList.remove("show");
      renderProducts();
      searchInput.focus();
    });
  }

  // 3. Sort options dropdown selector
  const sortSelector = document.getElementById("sort-selector");
  if (sortSelector) {
    sortSelector.addEventListener("change", (e) => {
      state.filters.sortBy = e.target.value;
      renderProducts();
    });
  }

  // 4. Price range limit slider
  const priceSlider = document.getElementById("price-slider");
  const priceSliderValue = document.getElementById("price-slider-value");
  
  if (priceSlider && priceSliderValue) {
    priceSlider.addEventListener("input", (e) => {
      const value = parseInt(e.target.value);
      state.filters.maxPrice = value;
      priceSliderValue.textContent = `Tk ${value}`;
      renderProducts();
    });
  }

  // 5. Reset Filter alerts and buttons
  const resetFiltersBtn = document.getElementById("reset-filters-btn");
  const noResultsResetBtn = document.getElementById("no-results-reset-btn");

  const resetAllFilters = () => {
    state.filters.searchQuery = "";
    state.filters.category = "all";
    state.filters.maxPrice = 1000;
    state.filters.sortBy = "featured";

    // Restore inputs visual states
    if (searchInput) {
      searchInput.value = "";
      clearSearchBtn.classList.remove("show");
    }
    if (priceSlider) {
      priceSlider.value = 1000;
      priceSliderValue.textContent = "Tk 1000";
    }
    categoryPills.forEach(p => {
      const cat = p.getAttribute("data-category");
      p.classList.toggle("active", cat === "all");
    });
    if (sortSelector) {
      sortSelector.value = "featured";
    }

    renderProducts();
  };

  if (resetFiltersBtn) resetFiltersBtn.addEventListener("click", resetAllFilters);
  if (noResultsResetBtn) noResultsResetBtn.addEventListener("click", resetAllFilters);

  // 6. Footer Links binds
  const footerLinks = document.querySelectorAll(".footer-links a");
  footerLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetCategory = link.getAttribute("data-footer-category");
      if (!targetCategory) return;
      
      e.preventDefault();
      
      // Sync navigation pill active status
      categoryPills.forEach(pill => {
        const cat = pill.getAttribute("data-category");
        pill.classList.toggle("active", cat === targetCategory);
      });

      // Filter and scroll back to top viewport
      state.filters.category = targetCategory;
      renderProducts();
      
      window.scrollTo({
        top: document.querySelector(".marketplace-container").offsetTop - 120,
        behavior: "smooth"
      });
    });
  });

  // Footer special cart button link
  const footerCartBtn = document.getElementById("footer-cart-btn");
  if (footerCartBtn) {
    footerCartBtn.addEventListener("click", () => toggleCartDrawer(true));
  }
}

/* ==========================================================================
   Theme Accent Setup
   ========================================================================== */

/**
 * Initializes light/dark switches and checks user system preference.
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  // Toggle Action
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("theme-mode", isLight ? "light" : "dark");
  });

  // Load saved local theme preference or default to System scheme settings
  const savedTheme = localStorage.getItem("theme-mode");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  } else if (savedTheme === "dark") {
    document.body.classList.remove("light-theme");
  } else {
    // Default system preference check
    const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    if (systemPrefersLight) {
      document.body.classList.add("light-theme");
    }
  }
}
