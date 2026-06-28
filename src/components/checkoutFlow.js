/**
 * Checkout Wizard Dialog Component with custom Confetti Particles
 */

let activeConfettiAnimId = null;

/**
 * Launches the multi-step checkout dialog modal.
 * 
 * @param {Object} state - The global app state
 * @param {Object} callbacks - Checkout callbacks (checkout success details)
 */
export function openCheckoutModal(state, callbacks) {
  const dialog = document.getElementById("checkout-dialog");
  if (!dialog) return;

  const shippingForm = document.getElementById("checkout-shipping-form");
  const paymentForm = document.getElementById("checkout-payment-form");
  const successView = document.getElementById("checkout-success-view");

  const indShipping = document.getElementById("step-ind-shipping");
  const indPayment = document.getElementById("step-ind-payment");
  const indSuccess = document.getElementById("step-ind-success");

  const authAmountLabel = document.getElementById("checkout-auth-amount");
  const shippingTotalLabel = document.getElementById("checkout-shipping-total");
  const shippingAreaInputs = document.querySelectorAll('input[name="shipping-area"]');
  const bkashLastDigitsInput = document.getElementById("bkash-last-digits");

  if (!shippingForm || !paymentForm || !successView || !authAmountLabel || !shippingTotalLabel || !bkashLastDigitsInput) return;

  // Initialize Wizard State (Step 1: Shipping)
  showStep(1);

  // Calculate order totals
  const subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  let shippingChoice = getSelectedShippingChoice();
  let total = subtotal + shippingChoice.cost;

  updateAuthAmount();

  function getSelectedShippingChoice() {
    const selected = document.querySelector('input[name="shipping-area"]:checked');
    const cost = Number(selected?.dataset.cost || 80);
    return {
      area: selected?.value === "outside-dhaka" ? "Outside Dhaka" : "Inside Dhaka",
      cost
    };
  }

  function updateAuthAmount() {
    shippingChoice = getSelectedShippingChoice();
    total = subtotal + shippingChoice.cost;
    authAmountLabel.textContent = `Tk ${total.toFixed(2)}`;
    shippingTotalLabel.textContent = `Tk ${total.toFixed(2)}`;
  }

  // Form Step Navigation Helper
  function showStep(stepNumber) {
    // Reset views
    shippingForm.classList.remove("active");
    paymentForm.classList.remove("active");
    successView.classList.remove("active");

    indShipping.classList.remove("active");
    indPayment.classList.remove("active");
    indSuccess.classList.remove("active");

    if (stepNumber === 1) {
      shippingForm.classList.add("active");
      indShipping.classList.add("active");
    } else if (stepNumber === 2) {
      paymentForm.classList.add("active");
      indPayment.classList.add("active");
    } else if (stepNumber === 3) {
      successView.classList.add("active");
      indSuccess.classList.add("active");
    }
  }

  // Step 1: Submit Shipping -> Go to Step 2
  const shippingSubmitHandler = (e) => {
    e.preventDefault();
    updateAuthAmount();
    showStep(2);
  };
  shippingForm.addEventListener("submit", shippingSubmitHandler);

  shippingAreaInputs.forEach(input => {
    input.addEventListener("change", updateAuthAmount);
  });

  // Step 2: Back button -> Return to Step 1
  const payBackBtn = document.getElementById("payment-back-btn");
  const payBackHandler = () => {
    showStep(1);
  };
  payBackBtn.addEventListener("click", payBackHandler);

  const bkashDigitsHandler = () => {
    bkashLastDigitsInput.value = bkashLastDigitsInput.value.replace(/[^0-9]/g, "").slice(0, 3);
    bkashLastDigitsInput.setCustomValidity("");
  };
  bkashLastDigitsInput.addEventListener("input", bkashDigitsHandler);

  // Step 2: Submit Payment -> Process Simulation -> Go to Step 3
  const paymentSubmitHandler = (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById("payment-submit-btn");
    const bkashLastDigits = bkashLastDigitsInput.value.trim();
    if (!/^\d{3}$/.test(bkashLastDigits)) {
      bkashLastDigitsInput.setCustomValidity("Enter exactly 3 digits");
      bkashLastDigitsInput.reportValidity();
      return;
    }

    bkashLastDigitsInput.setCustomValidity("");
    submitBtn.textContent = "Submitting bKash Details...";
    submitBtn.setAttribute("disabled", "true");

    setTimeout(() => {
      // Restore button text
      submitBtn.textContent = "Submit bKash Payment";
      submitBtn.removeAttribute("disabled");

      // Set Order Reference details in Step 3
      const orderRefId = "OMNI-" + Math.floor(100000 + Math.random() * 900000);
      const customerName = document.getElementById("shipping-name")?.value || "";
      const phoneEntered = document.getElementById("shipping-phone")?.value || "";
      const addressEntered = document.getElementById("shipping-address")?.value || "";
      const emailSubject = `OmniFind bKash payment ${orderRefId}`;
      const emailBody = [
        `Order Reference: ${orderRefId}`,
        `Total: Tk ${total.toFixed(2)}`,
        `Shipping Area: ${shippingChoice.area}`,
        `Shipping Charge: Tk ${shippingChoice.cost.toFixed(2)}`,
        `Customer Name: ${customerName}`,
        `Mobile Number: ${phoneEntered}`,
        `Full Address: ${addressEntered}`,
        `bKash Number Last 3 Digits: ${bkashLastDigits}`,
        `Items: ${state.cart.map(item => `${item.product.title} (x${item.quantity})`).join(", ")}`
      ].join("\n");
      window.location.href = `mailto:ragibulfat@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      document.getElementById("success-contact").textContent = phoneEntered;
      document.getElementById("success-order-id").textContent = `#${orderRefId}`;

      // Show Success View
      showStep(3);

      // Trigger Confetti Celebration!
      startConfettiExplosion();

      // Trigger Checkout complete callback (cleans cart, updates user purchase history)
      callbacks.onCheckoutComplete({
        orderId: orderRefId,
        total: total,
        shippingArea: shippingChoice.area,
        shippingCharge: shippingChoice.cost,
        customerName,
        phone: phoneEntered,
        address: addressEntered,
        bkashLastDigits,
        itemsCount: state.cart.reduce((sum, item) => sum + item.quantity, 0),
        itemsSummary: state.cart.map(item => `${item.product.title} (x${item.quantity})`).join(", "),
        date: new Date().toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      });
    }, 1500); // 1.5s simulated network delay
  };
  paymentForm.addEventListener("submit", paymentSubmitHandler);

  // Step 3: Close Checkout Dialog and finalize
  const finishBtn = document.getElementById("checkout-finish-btn");
  const finishHandler = () => {
    dialog.close();
    stopConfettiExplosion();
  };
  finishBtn.addEventListener("click", finishHandler);

  // Open the dialog
  dialog.showModal();
}

/**
 * Zero-dependency HTML5 Canvas Confetti Animation Loop
 */
function startConfettiExplosion() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;

  canvas.classList.add("active");
  const ctx = canvas.getContext("2d");

  // Resize canvas to cover window
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const colors = [
    "hsl(170, 85%, 50%)", // Teal neon
    "hsl(260, 85%, 55%)", // Violet nebula
    "hsl(14, 85%, 50%)",  // Solar amber
    "hsl(335, 85%, 50%)", // Cyber magenta
    "hsl(210, 85%, 50%)"  // Deep sea
  ];

  const particles = [];
  const particleCount = 120;

  // Generate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height - 20, // Spawn above screen
      r: Math.random() * 6 + 4,
      d: Math.random() * canvas.height,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 5,
      tiltAngleIncremental: Math.random() * 0.07 + 0.02,
      tiltAngle: 0,
      speed: Math.random() * 3 + 2
    });
  }

  // Animation Loop
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let activeParticles = 0;

    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];

      p.tiltAngle += p.tiltAngleIncremental;
      p.y += p.speed;
      p.x += Math.sin(p.tiltAngle) * 0.5;
      p.tilt = Math.sin(p.tiltAngle - i / 3) * 15;

      // Draw customized particles
      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      ctx.stroke();

      // Recirculate particle if it flows offscreen
      if (p.y < canvas.height) {
        activeParticles++;
      } else {
        // Recycle above screen
        p.y = Math.random() * -40 - 10;
        p.x = Math.random() * canvas.width;
        p.speed = Math.random() * 3 + 2;
      }
    }

    activeConfettiAnimId = requestAnimationFrame(draw);
  }

  // Stop previous loops
  if (activeConfettiAnimId) {
    cancelAnimationFrame(activeConfettiAnimId);
  }
  
  draw();
}

/**
 * Stops and tears down the confetti canvas renderer.
 */
function stopConfettiExplosion() {
  const canvas = document.getElementById("confetti-canvas");
  if (canvas) {
    canvas.classList.remove("active");
  }
  if (activeConfettiAnimId) {
    cancelAnimationFrame(activeConfettiAnimId);
    activeConfettiAnimId = null;
  }
}
