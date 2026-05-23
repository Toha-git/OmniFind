/**
 * Product Quick View Detail Dialog Component
 */

/**
 * Populates and opens the native `<dialog>` modal for a selected product.
 * 
 * @param {Object} product - The selected product object
 * @param {Object} state - The global app state
 * @param {Object} callbacks - Callback actions (e.g., adding quantity to cart)
 */
export function openQuickViewModal(product, state, callbacks) {
  const dialog = document.getElementById("quick-view-dialog");
  const contentContainer = document.getElementById("quick-view-content");
  
  if (!dialog || !contentContainer) return;

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const priceHtml = hasDiscount
    ? `
      <div class="detail-price-stack" aria-label="Discounted price Tk ${product.price.toFixed(2)}, regular price Tk ${product.originalPrice.toFixed(2)}">
        <span class="detail-price-old">Tk ${product.originalPrice.toFixed(2)}</span>
        <span class="detail-price">Tk ${product.price.toFixed(2)}</span>
      </div>
    `
    : `<div class="detail-price">Tk ${product.price.toFixed(2)}</div>`;

  const specsRows = Object.entries(product.specs)
    .map(([label, value]) => `
      <div class="spec-line">
        <span class="spec-label">${label}</span>
        <span class="spec-val">${value}</span>
      </div>
    `).join("");

  // Populate dynamic structure
  contentContainer.innerHTML = `
    <!-- Product Graphics Side -->
    <div class="detail-photo-side">
      <div class="detail-main-img-wrapper" id="detail-active-img-box">
        ${product.image ? `<img src="${product.image}" class="detail-main-img" alt="${product.title}">` : product.svgMarkup}
      </div>
      
      <!-- Interactive Custom Swatches (Simulating Colorways!) -->
      ${!product.image ? `
      <div>
        <h4 style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">Accent Variant</h4>
        <div class="detail-thumbs">
          <button class="thumb-btn active" data-swatch="accent" title="Primary Accent">
            <div style="background: var(--primary-accent); width: 100%; height: 100%; border-radius: 4px;"></div>
          </button>
          <button class="thumb-btn" data-swatch="violet" title="Nebula Violet">
            <div style="background: hsl(260, 85%, 55%); width: 100%; height: 100%; border-radius: 4px;"></div>
          </button>
          <button class="thumb-btn" data-swatch="solar" title="Solar Amber">
            <div style="background: hsl(14, 85%, 50%); width: 100%; height: 100%; border-radius: 4px;"></div>
          </button>
        </div>
      </div>
      ` : ""}
    </div>

    <!-- Product Info Details Side -->
    <div class="detail-info-side">
      <span class="detail-category">${product.category}</span>
      <h2 class="detail-title">${product.title}</h2>
      
      <div class="detail-rating-row">
        <span class="detail-rating" style="color: #fbbf24;">★ ${product.rating}</span>
        <span class="detail-stock">✓ Ready to ship</span>
      </div>

      ${priceHtml}
      
      <p class="detail-desc">${product.description}</p>
      
      <div class="detail-specs-table">
        <h4>Specifications Checklist</h4>
        ${specsRows}
      </div>

      <!-- Add to Cart Bar -->
      <div class="detail-purchase-bar">
        <div class="quantity-editor detail-qty">
          <button class="qty-btn" id="modal-qty-minus" aria-label="Decrease quantity">−</button>
          <span class="qty-value" id="modal-qty-val">1</span>
          <button class="qty-btn" id="modal-qty-plus" aria-label="Increase quantity">+</button>
        </div>
        <button class="detail-add-btn" id="modal-add-to-cart">
          <span>Add Selection to Cart</span>
          <span>🛒</span>
        </button>
      </div>
    </div>
  `;

  // Set up local quantity editor state
  let modalQty = 1;
  const qtyMinus = contentContainer.querySelector("#modal-qty-minus");
  const qtyPlus = contentContainer.querySelector("#modal-qty-plus");
  const qtyVal = contentContainer.querySelector("#modal-qty-val");

  qtyMinus.addEventListener("click", () => {
    if (modalQty > 1) {
      modalQty--;
      qtyVal.textContent = modalQty;
    }
  });

  qtyPlus.addEventListener("click", () => {
    modalQty++;
    qtyVal.textContent = modalQty;
  });

  // Colorway Swatch Swapping Simulation
  const swatchButtons = contentContainer.querySelectorAll(".thumb-btn");
  swatchButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      swatchButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const swatch = btn.getAttribute("data-swatch");
      const activeImgBox = contentContainer.querySelector("#detail-active-img-box");
      
      // Dynamic inline SVG tinting
      const svg = activeImgBox.querySelector("svg");
      if (svg) {
        if (swatch === "accent") {
          svg.style.setProperty("--primary-accent", "var(--primary-accent)");
        } else if (swatch === "violet") {
          svg.style.setProperty("--primary-accent", "hsl(260, 85%, 55%)");
        } else if (swatch === "solar") {
          svg.style.setProperty("--primary-accent", "hsl(14, 85%, 50%)");
        }
      }
    });
  });

  // Add to Cart handler
  const addToCartBtn = contentContainer.querySelector("#modal-add-to-cart");
  addToCartBtn.addEventListener("click", () => {
    callbacks.onAddToCart(product, modalQty);
    dialog.close();
  });

  // Open native `<dialog>` as a modal
  dialog.showModal();
}

/**
 * Initializes generic close listeners for all Dialog elements
 */
export function initDialogHelpers() {
  const dialogs = document.querySelectorAll("dialog");
  
  dialogs.forEach(dialog => {
    // Escape-key close (Native default browser behavior, but we double check it)
    dialog.addEventListener("close", () => {
      document.body.style.overflow = ""; // restore body scrolling
    });

    // Close buttons inside dialogs
    const closeBtns = dialog.querySelectorAll("[data-close-dialog]");
    closeBtns.forEach(btn => {
      btn.addEventListener("click", () => dialog.close());
    });

    // Light-Dismiss: Clicking on the dialog backdrop closes it
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const clickInDialog = (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      );
      if (!clickInDialog) {
        dialog.close();
      }
    });
  });
}
