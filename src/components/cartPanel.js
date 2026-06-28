/**
 * Shopping Cart Drawer UI Panel Component
 */

/**
 * Toggles the sidebar cart drawer open or closed.
 * 
 * @param {Boolean} isOpen - True to open, false to close
 */
export function toggleCartDrawer(isOpen) {
  const drawer = document.getElementById("cart-drawer");
  if (!drawer) return;
  
  if (isOpen) {
    drawer.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background page scrolling
  } else {
    drawer.classList.remove("active");
    document.body.style.overflow = ""; // Restore page scrolling
  }
}

/**
 * Recalculates cart financials and redraws items inside the slide-out drawer panel.
 * 
 * @param {Object} state - The global app state
 * @param {Object} callbacks - Callback actions (quantity changes, checkout launcher)
 */
export function renderCartDrawer(state, callbacks) {
  const itemsContainer = document.getElementById("cart-items-container");
  const countHeaderBadge = document.getElementById("cart-count");
  const priceHeaderBadge = document.getElementById("cart-header-total");
  const countDrawerBadge = document.getElementById("cart-drawer-count");
  
  const subtotalVal = document.getElementById("cart-subtotal");
  const shippingVal = document.getElementById("cart-shipping");
  const totalVal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-start-btn");

  if (!itemsContainer) return;

  // Calculate totals
  const totalItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // Update Header and Drawer Badge counts
  countHeaderBadge.textContent = totalItemCount;
  priceHeaderBadge.textContent = `Tk ${subtotal.toFixed(2)}`;
  countDrawerBadge.textContent = totalItemCount;

  // Update Financial labels
  subtotalVal.textContent = `Tk ${subtotal.toFixed(2)}`;
  shippingVal.textContent = subtotal === 0 ? "Tk 0.00" : "Choose at checkout";
  totalVal.textContent = `Tk ${subtotal.toFixed(2)}`;

  // Checkout button unlock
  if (state.cart.length > 0) {
    checkoutBtn.removeAttribute("disabled");
  } else {
    checkoutBtn.setAttribute("disabled", "true");
  }

  // Draw Items list
  if (state.cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="empty-cart-view">
        <span>🛒</span>
        <p>Your discovery container is empty</p>
        <button class="action-btn" style="margin-top: 16px; padding: 8px 18px; font-size: 0.8rem;" id="cart-back-to-shop">Keep Exploring</button>
      </div>
    `;
    
    const backToShopBtn = itemsContainer.querySelector("#cart-back-to-shop");
    if (backToShopBtn) {
      backToShopBtn.addEventListener("click", () => toggleCartDrawer(false));
    }
    return;
  }

  itemsContainer.innerHTML = state.cart.map(item => `
    <div class="cart-item" data-id="${item.product.id}">
      <div class="cart-item-img-wrapper">
        ${item.product.image ? `<img src="${item.product.image}" class="cart-item-img" alt="${item.product.title}">` : item.product.svgMarkup}
      </div>
      
      <div class="cart-item-details">
        <div class="cart-item-header">
          <h4 class="cart-item-title">${item.product.title}</h4>
          <button class="cart-item-remove" aria-label="Remove item">×</button>
        </div>
        
        <div class="cart-item-footer">
          <div class="quantity-editor">
            <button class="qty-btn item-qty-minus" aria-label="Decrease quantity">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn item-qty-plus" aria-label="Increase quantity">+</button>
          </div>
          <span class="cart-item-price">Tk ${(item.product.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    </div>
  `).join("");

  // Attach individual cart item actions
  const itemCards = itemsContainer.querySelectorAll(".cart-item");
  itemCards.forEach(card => {
    const id = card.getAttribute("data-id");
    const product = state.cart.find(item => item.product.id === id).product;

    card.querySelector(".item-qty-minus").addEventListener("click", () => {
      callbacks.onUpdateQuantity(id, -1);
    });

    card.querySelector(".item-qty-plus").addEventListener("click", () => {
      callbacks.onUpdateQuantity(id, 1);
    });

    card.querySelector(".cart-item-remove").addEventListener("click", () => {
      callbacks.onRemoveItem(id);
    });
  });
}

/**
 * Initializes listeners for the Cart Panel Drawer setup
 * 
 * @param {Object} state - The global app state
 * @param {Object} callbacks - Main callback routes
 */
export function initCartPanel(state, callbacks) {
  const toggleBtn = document.getElementById("cart-toggle-btn");
  const closeBtn = document.getElementById("cart-close-btn");
  const backdrop = document.getElementById("cart-drawer-backdrop");
  const checkoutBtn = document.getElementById("checkout-start-btn");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => toggleCartDrawer(true));
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => toggleCartDrawer(false));
  }

  if (backdrop) {
    backdrop.addEventListener("click", () => toggleCartDrawer(false));
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      toggleCartDrawer(false); // Close cart drawer
      callbacks.onStartCheckout(); // Invoke checkout dialog wizard
    });
  }
}
