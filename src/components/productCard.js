/**
 * Product Card Component
 */

/**
 * Creates and returns a product card DOM element with attached event listeners.
 * 
 * @param {Object} product - The product data object
 * @param {Object} state - The global app state
 * @param {Object} callbacks - Callback event functions
 * @returns {HTMLElement} - The interactive product card node
 */
export function createProductCard(product, state, callbacks) {
  const isWishlisted = state.wishlist.has(product.id);
  const cartItem = state.cart.find(item => item.product.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const priceHtml = hasDiscount
    ? `
      <div class="product-price-stack" aria-label="Discounted price Tk ${product.price.toFixed(2)}, regular price Tk ${product.originalPrice.toFixed(2)}">
        <span class="product-price-old">Tk ${product.originalPrice.toFixed(2)}</span>
        <span class="product-price">Tk ${product.price.toFixed(2)}</span>
      </div>
    `
    : `<div class="product-price">Tk ${product.price.toFixed(2)}</div>`;
  
  // Card Container
  const card = document.createElement("div");
  card.className = "product-card";
  card.setAttribute("data-id", product.id);
  card.setAttribute("data-category", product.category);

  // Template HTML
  card.innerHTML = `
    ${product.badge ? `<div class="card-badge">${product.badge}</div>` : ""}
    
    <button class="wishlist-btn-card ${isWishlisted ? 'active' : ''}" title="Save to wishlist" aria-label="Save to wishlist">
      ♥
    </button>

    <div class="card-visuals">
      ${product.image ? `<img src="${product.image}" class="card-img" alt="${product.title}">` : product.svgMarkup}
      <div class="product-overlay-actions">
        <button class="quick-view-trigger" aria-haspopup="dialog">Quick View</button>
      </div>
    </div>

    <div class="card-details">
      <div class="product-info-meta">
        <span class="product-card-category">${product.category}</span>
        <div class="product-rating" title="Rating: ${product.rating} stars">
          <span class="star-icon">★</span>
          <span>${product.rating}</span>
        </div>
      </div>

      <h3 class="product-card-title">${product.title}</h3>
      <p class="product-card-desc">${product.description}</p>

      <div class="product-card-footer">
        ${priceHtml}
        <button class="add-cart-btn" aria-label="Add to cart">
          <span>${inCartQty > 0 ? `In Cart (${inCartQty})` : "Add to Cart"}</span>
          <span>🛒</span>
        </button>
      </div>
    </div>
  `;

  // Attach interactive listeners
  const wishlistBtn = card.querySelector(".wishlist-btn-card");
  wishlistBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    callbacks.onToggleWishlist(product.id);
    // Dynamic toggle style
    const active = state.wishlist.has(product.id);
    wishlistBtn.classList.toggle("active", active);
  });

  const quickViewBtn = card.querySelector(".quick-view-trigger");
  quickViewBtn.addEventListener("click", () => {
    callbacks.onOpenQuickView(product.id);
  });

  const addCartBtn = card.querySelector(".add-cart-btn");
  addCartBtn.addEventListener("click", () => {
    callbacks.onAddToCart(product);
  });

  return card;
}
