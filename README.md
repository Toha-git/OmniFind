# ❖ OmniFind — Premium Smart Tech & Lifestyle Marketplace

Welcome to **OmniFind**! This is a state-of-the-art, visually stunning e-commerce Single Page Application (SPA) designed to showcase modern web technologies in an approachable, beginner-friendly manner.

OmniFind runs entirely client-side using **Vite**, **Semantic HTML5**, **Modern CSS**, and **Vanilla ES6+ JavaScript** modules. It has **zero heavy framework dependencies** (no React, Vue, or Angular to learn yet), making it a perfect playground for studying clean coding patterns, responsive styling, and dynamic browser interactions.

---

## 🌟 Premium Features

OmniFind is built with high-end, premium design elements that feel state-of-the-art:

1. **Vibrant Dark/Light Themes**: Beautiful, rich backgrounds built using HSL colors that shift dynamically based on system settings or the click of a button.
2. **Interactive UI Accent Customizer**: Launch the **User Dashboard** (profile icon in the header) to pick new accent colors in real-time. This instantly changes the color theme of buttons, glows, borders, and gradients across the entire website!
3. **Live Search & Filter Matrix**: Instant catalog updates as you type, select categories, adjust price sliders, or choose sorting filters.
4. **Native `<dialog>` Modals**: Uses native HTML5 `<dialog>` tags for overlays (Quick View, Checkout, Profile). This ensures professional accessibility features (keyboard focus-trapping, escape key closing) automatically.
5. **Interactive Colorway Swapper**: Open a product's Quick View to select different color variants. Watch the custom SVG graphic recolor itself dynamically!
6. **Multi-Step Checkout Wizard**: Sleek form validation checkout flow leading to a simulated authorization payment processing step.
7. **60 FPS Canvas Confetti**: Complete a purchase and celebrate with a gorgeous, high-performance confetti particle system animated directly onto an HTML5 Canvas context.
8. **Real-Time Session Statistics**: The User Dashboard keeps track of how many items are in your cart, saved to your wishlist, or purchased during this browsing session.

---

## 📂 Project Architecture

Here is how the project files are laid out:

```
/Users/toha/Product/
├── index.html            # Main HTML entry point (semantic structure)
├── package.json          # Node package list and starting scripts
├── vite.config.js        # Local development server port settings
├── README.md             # This educational instruction guide
└── src/
    ├── main.js           # Core JS Coordinator (orchestrates filters, searches, and cart states)
    ├── data.js           # The Product catalog dataset (with inline SVG illustrations)
    ├── index.css         # Complete CSS Design System (variables, responsive grids, transitions)
    └── components/       # Self-contained UI modular logic files
        ├── productCard.js   # Builds individual catalog product cards
        ├── detailModal.js   # Handles Quick View dialogue details and swatches
        ├── cartPanel.js     # Manages slide-out drawer cart lists and subtotals
        ├── checkoutFlow.js  # Orchestrates checkout step-forms & Canvas Confetti
        └── dashboard.js     # Updates accent variables, accessibility settings, and order history
```

---

## 🚀 How to Run Locally

Since this project utilizes modern **Vite** tooling, starting your development environment is simple:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Instructions
1. Open your terminal in the `/Users/toha/Product` folder.
2. Install the necessary development dependencies:
   ```bash
   npm install
   ```
3. Boot up the local hot-reloading development server:
   ```bash
   npm run dev
   ```
4. Vite will automatically launch your default browser to **`http://localhost:3000`** (or print the local port link in the terminal).

*Any changes you make to the code files will instantly refresh in the browser without resetting your current cart selection!*

---

## 🎓 Educational Insights for Beginners

### 1. How the Accent Customizer works (CSS Variables)
In `src/index.css`, we define variables using standard **HSL (Hue, Saturation, Lightness)** formats:
```css
:root {
  --accent-hue: 170; /* Default: Teal Neon */
  --primary-accent: hsl(var(--accent-hue), 85%, 50%);
}
```
When you click a color swatch in the **User Dashboard**, the code in `src/components/dashboard.js` runs a single line of JavaScript:
```javascript
document.documentElement.style.setProperty("--accent-hue", selectedHue);
```
Because the entire stylesheet is tied to this `--accent-hue` variable, the browser immediately repaints all active elements with the new color palette in a split second!

### 2. Native accessibility with `<dialog>`
Instead of building complex modal overlays from scratch, we use the standard `<dialog>` tag:
```html
<dialog id="quick-view-dialog" class="custom-dialog"> ... </dialog>
```
To open it, we simply call `dialog.showModal()` in JS. The browser handles:
- Rendering a customizable backdrop (`dialog::backdrop` in CSS).
- Trapping keyboard navigation (`Tab` and `Shift+Tab`) inside the overlay.
- Automatically closing the popup when the user presses `Esc`.

---

## 🛠️ Verification Checklist

- [x] Run `npm run dev` to verify hot-reloading local server bootup.
- [x] Select the **Smart Tech** category tab to verify dynamic catalog filtering.
- [x] Search for "Keyboard" in the search box to check instant character-matching.
- [x] Click **Quick View** on smart glasses, toggle color variants, and edit quantities.
- [x] Click **Add to Cart** and check the sliding cart panel totals.
- [x] Click **Proceed to Checkout**, fill out delivery forms, authorize payment, and watch the Confetti burst!
- [x] Check the **User Dashboard** to verify color themes change instantly.
