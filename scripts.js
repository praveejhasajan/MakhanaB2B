function createMakhana() {
  const foxnut = document.createElement("div");
  foxnut.classList.add("foxnut");

  let startX = Math.random() * (window.innerWidth - 50);
  let speed = Math.random() * 3 + 2;
  let rotation = Math.random() * 360;
  let size = Math.random() * 20 + 30;

  foxnut.style.left = `${startX}px`;
  foxnut.style.width = `${size}px`;
  foxnut.style.height = `${size}px`;
  foxnut.style.transform = `rotate(${rotation}deg)`;
  foxnut.style.position = "absolute";
  foxnut.style.top = "-50px";
  document.body.appendChild(foxnut);

  let yPos = -50;
  function fall() {
    yPos += speed;
    rotation += 2;
    foxnut.style.top = `${yPos}px`;
    foxnut.style.transform = `rotate(${rotation}deg)`;

    const fallAreaHeight =
      window.innerHeight > 500 ? window.innerHeight : window.innerHeight * 0.8;

    if (yPos < fallAreaHeight - 50) {
      requestAnimationFrame(fall);
    } else {
      foxnut.remove();
    }
  }
  fall();
}

function makhanaRain() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.innerWidth < 600) return;

  const interval = setInterval(createMakhana, 250);
  setTimeout(() => clearInterval(interval), 10000);
}

function toggleText() {
  const text = document.getElementById("toggleText");
  if (!text) return;
  text.style.display = text.style.display === "none" ? "block" : "none";
}

function toggleNavbar() {
  const navbarContainer = document.querySelector(".navbar-container");
  if (!navbarContainer) return;
  navbarContainer.classList.toggle("active");
}

function showPopup() {
  const popup = document.getElementById("contactPopup");
  if (!popup) return;
  popup.style.display = "block";
}

let popupClosed = false;
function closePopup() {
  const popup = document.getElementById("contactPopup");
  if (!popup) return;
  popup.style.display = "none";
  popupClosed = true;
  setTimeout(() => {
    popupClosed = false;
  }, 300000);
}

function openPurchaseModal() {
  const modal = document.getElementById("purchaseModal");
  if (modal) modal.style.display = "flex";
}

function closePurchaseModal() {
  const modal = document.getElementById("purchaseModal");
  if (modal) modal.style.display = "none";
}

function openModal() {
  const modal = document.getElementById("myModal");
  if (modal) modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("myModal");
  if (modal) modal.style.display = "none";
}

function updateCurrency() {
  const countrySelect = document.getElementById("country");
  const currencyEl = document.getElementById("currency");
  if (!countrySelect || !currencyEl) return;
  currencyEl.innerText = countrySelect.options[countrySelect.selectedIndex].value;
}

function validateForm() {
  const phoneEl = document.getElementById("customerPhone");
  const pinEl = document.getElementById("customerPincode");
  const emailEl = document.getElementById("customerEmail");

  if (!phoneEl || !pinEl || !emailEl) return true;

  const phonePattern = /^\d{10}$/;
  if (!phonePattern.test(phoneEl.value)) {
    alert("Please enter a valid 10-digit mobile number.");
    return false;
  }

  const pincodePattern = /^\d{6}$/;
  if (!pincodePattern.test(pinEl.value)) {
    alert("Please enter a valid 6-digit pincode.");
    return false;
  }

  if (!emailEl.value) {
    alert("Please enter a valid email address.");
    return false;
  }

  return true;
}

async function calculateDeliveryCharge(pincode, weight) {
  const out = document.getElementById("deliveryCharge");
  if (!out) return;
  try {
    const response = await fetch(`/calculate-delivery?pincode=${pincode}&weight=${weight}`);
    const data = await response.json();
    out.textContent = data.deliveryCharge ?? "-";
  } catch (err) {
    console.error("Delivery charge fetch failed:", err);
  }
}

function calculatePrice() {
  const country = document.getElementById("country");
  const incotermElement = document.getElementById("incoterm");
  const quality = document.getElementById("quality");
  const loader = document.getElementById("loader");
  const resultBox = document.getElementById("resultBox");
  const totalPrice = document.getElementById("totalPrice");
  const incotermExplanation = document.getElementById("incotermExplanation");
  const sellerDuties = document.getElementById("sellerDuties");
  const buyerDuties = document.getElementById("buyerDuties");
  const responsibilityBox = document.getElementById("responsibilityBox");

  if (
    !country ||
    !incotermElement ||
    !quality ||
    !loader ||
    !resultBox ||
    !totalPrice ||
    !incotermExplanation ||
    !sellerDuties ||
    !buyerDuties ||
    !responsibilityBox
  ) {
    return;
  }

  const selectedCurrency = country.options[country.selectedIndex].value;
  const rate = parseFloat(country.options[country.selectedIndex].getAttribute("data-rate"));
  const incoterm = parseFloat(incotermElement.value);
  const incotermKey = incoterm === 1 ? "FOB" : "CIF";
  const basePrice = parseFloat(quality.options[quality.selectedIndex].getAttribute("data-price"));

  const gst = 0.05 * basePrice;
  const chaCharges = 50;
  const loadingCharges = 100;
  const quantity = 1000;

  const costPerKg = basePrice + gst + chaCharges + loadingCharges;
  const totalINR = costPerKg * quantity * incoterm;
  const finalPrice = totalINR / rate;

  loader.style.display = "block";
  setTimeout(() => {
    loader.style.display = "none";
    resultBox.style.display = "block";
    totalPrice.innerText = `${finalPrice.toFixed(2)} ${selectedCurrency}`;
    const incotermText = incotermElement.selectedOptions[0].text;
    incotermExplanation.innerText =
      `Price includes: Quality Cost + 5% GST + CHA Rs ${chaCharges} + Loading Rs ${loadingCharges} x ${quantity}kg. Based on ${incotermText}.`;

    const responsibilities = {
      FOB: {
        seller: [
          "Product packaging",
          "Inland transport to port",
          "Customs clearance at origin",
          "Loading goods on vessel"
        ],
        buyer: [
          "Ocean freight",
          "Insurance",
          "Customs clearance at destination",
          "Inland delivery to final location"
        ]
      },
      CIF: {
        seller: [
          "Product packaging",
          "Inland transport to port",
          "Customs clearance at origin",
          "Loading goods on vessel",
          "Ocean freight",
          "Insurance"
        ],
        buyer: [
          "Customs clearance at destination",
          "Inland delivery to final location"
        ]
      }
    };

    sellerDuties.innerHTML = responsibilities[incotermKey].seller
      .map((item) => `<li>${item}</li>`)
      .join("");
    buyerDuties.innerHTML = responsibilities[incotermKey].buyer
      .map((item) => `<li>${item}</li>`)
      .join("");

    responsibilityBox.style.display = "block";
  }, 800);
}

function initNavDropdowns() {
  const items = document.querySelectorAll(".nav-item.has-submenu");
  if (!items.length) return;

  items.forEach((item) => {
    const btn = item.querySelector(".nav-link");
    if (!btn) return;
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = item.classList.contains("open");
      items.forEach((other) => other.classList.remove("open"));
      if (!isOpen) {
        item.classList.add("open");
      }
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".nav-item")) return;
    items.forEach((item) => {
      item.classList.remove("open");
      const btn = item.querySelector(".nav-link");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  });
}
async function submitLeadForm(form, sourceOverride) {
  const status = form.querySelector(".cro-form-status");
  if (status) {
    status.textContent = "Submitting...";
    status.dataset.state = "loading";
  }

  const data = new FormData(form);
  const requirement = data.get("requirement") || form.dataset.requirement || "";
  const payload = {
    name: data.get("name") || "",
    phone: data.get("phone") || "",
    requirement,
    quantity: data.get("quantity") || "",
    location: data.get("location") || "",
    purpose: data.get("purpose") || "",
    intent: inferIntent(requirement),
    source: sourceOverride || form.dataset.source || "CRO"
  };

  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("Lead submit failed");

    if (status) {
      status.textContent = "Thanks! Our team will message you shortly.";
      status.dataset.state = "success";
    }
    form.reset();

    if (form.dataset.successWhatsapp === "true") {
      const message = encodeURIComponent(
        "Hi Makhanabazar, I want the export price list PDF. My requirement: " +
          (payload.requirement || "Makhana") +
          ". Quantity: " +
          (payload.quantity || "Not specified") +
          "."
      );
      window.open(`https://wa.me/919591533598?text=${message}`, "_blank");
    }
    return true;
  } catch (error) {
    console.error("Lead submit error:", error);
    if (status) {
      status.textContent = "Could not submit now. Please try again.";
      status.dataset.state = "error";
    }
    return false;
  }
}

function initExitIntentPopup() {
  if (document.getElementById("croExitPopup")) return;
  if (location.pathname.includes("chatbot")) return;

  const popup = document.createElement("div");
  popup.id = "croExitPopup";
  popup.className = "cro-exit-popup";
  popup.setAttribute("aria-hidden", "true");
  popup.innerHTML = `
    <div class="cro-exit-card" role="dialog" aria-modal="true" aria-labelledby="croExitTitle">
      <button class="cro-exit-close" type="button" aria-label="Close popup">×</button>
      <span class="cro-exit-badge">Export Pricing PDF</span>
      <h2 id="croExitTitle">Get Makhana Export Price List PDF</h2>
      <p>Share your requirement to get the PDF + best quote in minutes.</p>
      <form class="cro-lead-form" data-source="exit-popup" data-success-whatsapp="true">
        <div class="cro-form-grid">
          <label>
            <span>Name</span>
            <input name="name" type="text" placeholder="Your name" autocomplete="name">
          </label>
          <label>
            <span>Phone *</span>
            <input name="phone" type="tel" placeholder="10-digit mobile" required inputmode="numeric" pattern="\\d{10}">
          </label>
          <label>
            <span>Requirement</span>
            <select name="requirement">
              <option value="Export Inquiry">Export Inquiry</option>
              <option value="Bulk Order">Bulk Order</option>
              <option value="Retail Purchase">Retail Purchase</option>
              <option value="Price Inquiry">Price Inquiry</option>
            </select>
          </label>
          <label>
            <span>Quantity</span>
            <input name="quantity" type="text" placeholder="Ex: 25kg / 100kg">
          </label>
        </div>
        <label>
          <span>Location</span>
          <input name="location" type="text" placeholder="City / Country">
        </label>
        <button type="submit" class="cro-primary-btn">Get PDF on WhatsApp</button>
        <p class="cro-form-note">Stock fast moving hai. Direct farmer sourcing from Bihar.</p>
        <div class="cro-form-status" role="status" aria-live="polite"></div>
      </form>
    </div>
  `;
  document.body.appendChild(popup);

  const closeBtn = popup.querySelector(".cro-exit-close");
  closeBtn.addEventListener("click", () => closeExitPopup());
  popup.addEventListener("click", (event) => {
    if (event.target === popup) closeExitPopup();
  });

  function closeExitPopup() {
    popup.classList.remove("active");
    popup.setAttribute("aria-hidden", "true");
    localStorage.setItem("mbz_exit_popup_seen", String(Date.now()));
  }

  function openExitPopup() {
    if (popup.classList.contains("active")) return;
    popup.classList.add("active");
    popup.setAttribute("aria-hidden", "false");
  }

  const seen = Number(localStorage.getItem("mbz_exit_popup_seen") || 0);
  const dayMs = 24 * 60 * 60 * 1000;
  const shouldShow = Date.now() - seen > dayMs;

  if (shouldShow) {
    document.addEventListener("mouseleave", (event) => {
      if (event.clientY <= 0) openExitPopup();
    });
    setTimeout(() => {
      if (window.innerWidth < 900) openExitPopup();
    }, 32000);
  }
}

function initInlineBlogForms() {
  const targets = document.querySelectorAll(".blog-content, .article-content, .article-body, .blog-container");
  if (!targets.length) return;

  targets.forEach((target) => {
    if (target.querySelector(".cro-inline-capture")) return;
    const inline = document.createElement("div");
    inline.className = "cro-inline-capture";
    inline.innerHTML = `
      <div class="cro-inline-header">
        <span class="cro-inline-badge">Fast Quote</span>
        <h3>Get bulk price for your requirement</h3>
        <p>Share quantity + destination. We reply with best price & MOQ.</p>
      </div>
      <form class="cro-lead-form" data-source="blog-inline">
        <div class="cro-form-grid">
          <label>
            <span>Name</span>
            <input name="name" type="text" placeholder="Your name">
          </label>
          <label>
            <span>Phone *</span>
            <input name="phone" type="tel" placeholder="10-digit mobile" required inputmode="numeric" pattern="\\d{10}">
          </label>
          <label>
            <span>Requirement</span>
            <select name="requirement">
              <option value="Bulk Order">Bulk Order</option>
              <option value="Export Inquiry">Export Inquiry</option>
              <option value="Retail Purchase">Retail Purchase</option>
            </select>
          </label>
          <label>
            <span>Quantity</span>
            <input name="quantity" type="text" placeholder="Ex: 25kg / 1 ton">
          </label>
        </div>
        <button type="submit" class="cro-primary-btn">Get Best Quote</button>
        <div class="cro-form-status" role="status" aria-live="polite"></div>
      </form>
    `;

    const firstPara = target.querySelector("p");
    if (firstPara) {
      firstPara.insertAdjacentElement("afterend", inline);
    } else {
      target.appendChild(inline);
    }
  });
}

function initCtaStrip() {
  if (document.querySelector(".cro-cta-strip")) return;
  if (location.pathname.includes("chatbot")) return;

  const strip = document.createElement("section");
  strip.className = "cro-cta-strip";
  strip.innerHTML = `
    <div class="cro-cta-copy">
      <h3>Ready to source premium Makhana?</h3>
      <p>Get fast export pricing, MOQ details, and shipment support.</p>
    </div>
    <div class="cro-cta-actions">
      <button class="cro-secondary-btn" type="button" data-open-exit>Get Price List</button>
      <a class="cro-primary-btn" href="https://wa.me/919591533598?text=I%20want%20bulk%20makhana%20pricing%20and%20MOQ.">WhatsApp Now</a>
      <a class="cro-secondary-btn" href="/import-makhana-query">Submit Inquiry</a>
    </div>
  `;
  document.body.appendChild(strip);

  strip.querySelectorAll("[data-open-exit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const popup = document.getElementById("croExitPopup");
      if (popup) {
        popup.classList.add("active");
        popup.setAttribute("aria-hidden", "false");
      }
    });
  });
}

function initStickyWhatsapp() {
  if (document.querySelector(".sticky-whatsapp") || document.querySelector(".whatsapp-float-button") || document.querySelector(".whatsapp-button")) return;
  const link = document.createElement("a");
  link.className = "sticky-whatsapp";
  link.href = "https://wa.me/919591533598?text=Hi%20Makhanabazar%20team,%20I%20want%20makhana%20pricing.";
  link.target = "_blank";
  link.rel = "noopener";
  link.setAttribute("aria-label", "Chat on WhatsApp");
  link.innerHTML = `
    <span class="sticky-whatsapp-icon" aria-hidden="true">WA</span>
    <span class="sticky-whatsapp-text">Chat on WhatsApp</span>
  `;
  document.body.appendChild(link);
}

document.addEventListener("DOMContentLoaded", function () {
  ensureCroStyles();
  initNavDropdowns();
  makhanaRain();

  document.addEventListener("submit", function (event) {
    const form = event.target;
    if (!form.classList || !form.classList.contains("cro-lead-form")) return;
    event.preventDefault();
    submitLeadForm(form);
  });

  initExitIntentPopup();
  initInlineBlogForms();
  initCtaStrip();
  initStickyWhatsapp();


  const ctaButtons = document.querySelectorAll(".cta");
  ctaButtons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      button.style.transform = "scale(1.1)";
      button.style.transition = "transform 0.2s ease-in-out";
    });
    button.addEventListener("mouseout", () => {
      button.style.transform = "scale(1)";
    });
  });

  const popupForm = document.getElementById("popupContactForm");
  if (popupForm) {
    popupForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      const formData = {
        name: document.getElementById("popupName")?.value || "",
        email: document.getElementById("popupEmail")?.value || "",
        query: document.getElementById("popupQuery")?.value || ""
      };

      try {
        const response = await fetch("/contact/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error("Submission failed");
        alert("Contact request submitted successfully.");
        closePopup();
      } catch (error) {
        console.error("Error:", error);
        alert("Could not submit right now. Please try again.");
      }
    });
  }

  const customerPincode = document.getElementById("customerPincode");
  if (customerPincode) {
    customerPincode.addEventListener("input", (e) => {
      calculateDeliveryCharge(e.target.value, 1);
    });
  }

  const purchaseForm = document.getElementById("purchaseForm");
  if (purchaseForm) {
    purchaseForm.addEventListener("submit", function (event) {
      event.preventDefault();
      closePurchaseModal();
    });
  }

  const description = document.querySelector(".product-right p");
  if (description) {
    description.addEventListener("click", function () {
      description.classList.toggle("expanded");
    });
  }

  window.addEventListener("scroll", function () {
    const contactPopup = document.getElementById("contactPopup");
    if (contactPopup && window.scrollY > window.innerHeight / 2 && !popupClosed) {
      contactPopup.style.display = "block";
    }

    const infoBox = document.querySelector(".reach-right .info-box");
    if (infoBox) {
      const rect = infoBox.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        infoBox.style.animation = "fadeInUp 1.2s ease both";
      }
    }
  });
});







