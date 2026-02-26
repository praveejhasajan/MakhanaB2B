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

document.addEventListener("DOMContentLoaded", function () {
  makhanaRain();

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
