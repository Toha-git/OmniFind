/**
 * User Dashboard & Personalization Workshop Component
 */

/**
 * Launches the settings and simulated history dashboard.
 * 
 * @param {Object} state - The global app state
 * @param {Object} callbacks - Callback actions
 */
export function openDashboardModal(state, callbacks) {
  const dialog = document.getElementById("dashboard-dialog");
  if (!dialog) return;

  // Initialize and recalculate live session stats
  const statWish = document.getElementById("stat-wishlist");
  const statCart = document.getElementById("stat-cart");
  const statPurchased = document.getElementById("stat-purchased");

  if (statWish) statWish.textContent = state.wishlist.size;
  if (statCart) statCart.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (statPurchased) statPurchased.textContent = state.orders.length;

  // Draw simulated purchase records
  renderOrdersHistory(state);

  // Tab swapping controller
  const tabButtons = dialog.querySelectorAll(".menu-btn");
  const tabContainers = dialog.querySelectorAll(".dashboard-tab");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContainers.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      const targetTab = btn.getAttribute("data-tab");
      const targetContainer = dialog.querySelector(`#db-tab-${targetTab}`);
      if (targetContainer) {
        targetContainer.classList.add("active");
      }
    });
  });

  // Open dialog modal
  dialog.showModal();
}

/**
 * Populates the mock transaction history card container.
 * 
 * @param {Object} state - The global app state
 */
export function renderOrdersHistory(state) {
  const ordersContainer = document.getElementById("db-orders-list");
  if (!ordersContainer) return;

  if (state.orders.length === 0) {
    ordersContainer.innerHTML = `
      <div class="empty-orders-view">
        <span>📦</span>
        <p>Your delivery timeline is empty.</p>
        <p style="font-size: 0.75rem; margin-top: 4px;">Purchase curated accessories in the catalog to simulate orders!</p>
      </div>
    `;
    return;
  }

  ordersContainer.innerHTML = state.orders.map(order => `
    <div class="order-history-card">
      <div class="order-history-header">
        <span>Order Reference: <strong>#${order.orderId}</strong></span>
        <span class="order-history-date">${order.date}</span>
      </div>
      <div class="order-history-items">
        ${order.itemsSummary}
      </div>
      <div class="order-history-footer">
        <span>Total: <strong class="order-history-total">Tk ${order.total.toFixed(2)}</strong></span>
        <span class="order-status-badge">Delivered (Simulated)</span>
      </div>
    </div>
  `).join("");
}

/**
 * Set up real-time site-wide UI customizer elements.
 */
export function initDashboardCustomizer() {
  const root = document.documentElement;

  // 1. Accent Color Switcher
  const colorPickers = document.querySelectorAll(".color-picker-btn");
  colorPickers.forEach(picker => {
    picker.addEventListener("click", () => {
      colorPickers.forEach(p => p.classList.remove("active"));
      picker.classList.add("active");

      const selectedHue = picker.getAttribute("data-hue");
      
      // Instantly transition the root CSS custom variable --accent-hue
      root.style.setProperty("--accent-hue", selectedHue);
    });
  });

  // 2. High Contrast Accessibility Switcher
  const contrastToggle = document.getElementById("high-contrast-toggle");
  if (contrastToggle) {
    contrastToggle.addEventListener("change", () => {
      if (contrastToggle.checked) {
        document.body.classList.add("high-contrast");
      } else {
        document.body.classList.remove("high-contrast");
      }
    });
  }

  // 3. Simple Header User Buttons hook
  const dbBtn = document.getElementById("dashboard-btn");
  const footerDbBtn = document.getElementById("footer-dashboard-btn");

  const launchDashboard = () => {
    // Get state from main global container
    if (window.omnifindState) {
      openDashboardModal(window.omnifindState, {});
    }
  };

  if (dbBtn) dbBtn.addEventListener("click", launchDashboard);
  if (footerDbBtn) footerDbBtn.addEventListener("click", launchDashboard);
}
