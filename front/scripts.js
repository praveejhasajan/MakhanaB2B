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
    foxnut.style.top = "-50px"; // start from top
    document.body.appendChild(foxnut);

    let yPos = -50;
    function fall() {
        yPos += speed;
        rotation += 2;
        foxnut.style.top = `${yPos}px`;
        foxnut.style.transform = `rotate(${rotation}deg)`;

        const fallAreaHeight = window.innerHeight > 500 ? window.innerHeight : window.innerHeight * 0.8;

        if (yPos < fallAreaHeight - 50) {
            requestAnimationFrame(fall);
        } else {
            foxnut.remove();
        }
    }
    fall();
}

function makhanaRain() {
    let interval;
    const screenIsWide = window.innerWidth > 500;

    interval = setInterval(() => {
        createMakhana();
    }, screenIsWide ? 200 : 400);

    // Stop after 20 seconds
    setTimeout(() => {
        clearInterval(interval);
        console.log("🌰 Makhana rain stopped after 20 seconds");
    }, 20000);
}

// Start the animation
makhanaRain();




function toggleText() {
    const text = document.getElementById("toggleText");
    if (text.style.display === "none") {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

const ctaButtons = document.querySelectorAll('.cta');
ctaButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
        button.style.transition = 'transform 0.2s ease-in-out';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});

let popupClosed = false;
window.addEventListener('scroll', function() {
    const contactPopup = document.getElementById('contactPopup');
    if (window.scrollY > window.innerHeight / 2 && !popupClosed) {
        contactPopup.style.display = 'block';
    }
});

function closePopup() {
    document.getElementById('contactPopup').style.display = 'none';
    popupClosed = true;
    setTimeout(() => {
        popupClosed = false;
    }, 300000); // Reappear after 5 minutes (300000 milliseconds)
}

document.getElementById('popupContactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = {
        name: document.getElementById('popupName').value,
        email: document.getElementById('popupEmail').value,
        query: document.getElementById('popupQuery').value
    };

    fetch('http://localhost:5000/contact/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Contact added!');
        closePopup();
    })
    .catch(error => console.error('Error:', error));
});
// navbar
function toggleNavbar() {
    const navbarContainer = document.querySelector('.navbar-container');
    navbarContainer.classList.toggle('active');
}


    function showPopup() {
        var popup = document.getElementById("contactPopup");
        popup.style.display = "block";
    }

    function closePopup() {
        var popup = document.getElementById("contactPopup");
        popup.style.display = "none";
    }
    // product
    
document.addEventListener("DOMContentLoaded", function() {
    const description = document.querySelector(".product-right p");
    description.addEventListener("click", function() {
        description.classList.toggle("expanded");
    });
});
async function calculateDeliveryCharge(pincode, weight) {
    const response = await fetch(`/calculate-delivery?pincode=${pincode}&weight=${weight}`);
    const { deliveryCharge } = await response.json();
    document.getElementById('deliveryCharge').textContent = deliveryCharge;
}

// Trigger when pincode or weight changes
document.getElementById('customerPincode').addEventListener('input', (e) => {
    const weight = 1; // Example weight (1kg); replace with actual product weight
    calculateDeliveryCharge(e.target.value, weight);
});
// Mock delivery charges based on regions and weights
const deliveryRates = [
    { zone: 'local', pincodeStart: 110000, pincodeEnd: 119999, ratePerKg: 50 },
    { zone: 'state', pincodeStart: 120000, pincodeEnd: 129999, ratePerKg: 100 },
    { zone: 'interstate', pincodeStart: 130000, pincodeEnd: 199999, ratePerKg: 150 },
];

// Function to calculate delivery charge
function getDeliveryCharge(pincode, weight) {
    const rate = deliveryRates.find(
        (zone) => pincode >= zone.pincodeStart && pincode <= zone.pincodeEnd
    );
    return rate ? rate.ratePerKg * weight : 200; // Default charge if no match
}

// API endpoint
app.get('/calculate-delivery', (req, res) => {
    const { pincode, weight } = req.query;
    const deliveryCharge = getDeliveryCharge(parseInt(pincode), parseFloat(weight));
    res.json({ deliveryCharge });
});

 // Open Purchase Modal
function openPurchaseModal() {
    document.getElementById('purchaseModal').style.display = 'flex';
}

// Close Purchase Modal
function closePurchaseModal() {
    document.getElementById('purchaseModal').style.display = 'none';
}

// Open Another Modal (example)
function openModal() {
    document.getElementById('myModal').style.display = 'flex';
}

// Close Example Modal
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// Handle Purchase Form Submission
document.getElementById('purchaseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const customerPincode = document.getElementById('customerPincode').value;

    // Here you would send the data to the server or process it
    console.log('Purchase Details:', {
        productName,
        productPrice,
        customerName,
        customerPhone,
        customerAddress,
        customerPincode
    });

    // Close the modal after purchase submission
    closePurchaseModal();
});
function validateForm() {
    // Validate Mobile Number (10 digits)
    const phone = document.getElementById('customerPhone').value;
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit mobile number.");
        return false;
    }

    // Validate Pin Code (6 digits)
    const pincode = document.getElementById('customerPincode').value;
    const pincodePattern = /^\d{6}$/;
    if (!pincodePattern.test(pincode)) {
        alert("Please enter a valid 6-digit pincode.");
        return false;
    }

    // Validate Email
    const email = document.getElementById('customerEmail').value;
    if (!email) {
        alert("Please enter a valid email address.");
        return false;
    }

    return true;
}


function updateCurrency() {
    let countrySelect = document.getElementById("country");
    let currency = countrySelect.options[countrySelect.selectedIndex].value;
    document.getElementById("currency").innerText = currency;
}

 

function calculatePrice() {
  console.log("Calculating price...");
  const country = document.getElementById("country");
  const selectedCurrency = country.options[country.selectedIndex].value;
  const rate = parseFloat(
    country.options[country.selectedIndex].getAttribute("data-rate")
  );
  const incotermElement = document.getElementById("incoterm");
  const incoterm = parseFloat(incotermElement.value);
  const incotermKey = incoterm === 1 ? "FOB" : "CIF";
  const quality = document.getElementById("quality");
  const basePrice = parseFloat(
    quality.options[quality.selectedIndex].getAttribute("data-price")
  );

  const gst = 0.05 * basePrice;
  const chaCharges = 50;
  const loadingCharges = 100;
  const quantity = 1000;

  const costPerKg = basePrice + gst + chaCharges + loadingCharges;
  const totalINR = costPerKg * quantity * incoterm;
  const finalPrice = totalINR / rate;

  document.getElementById("loader").style.display = "block";
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("resultBox").style.display = "block";
    document.getElementById("totalPrice").innerText = `${finalPrice.toFixed(
      2
    )} ${selectedCurrency}`;
    const incotermText = incotermElement.selectedOptions[0].text;
    document.getElementById("incotermExplanation").innerText =
      `Price includes: Quality Cost + 5% GST + CHA ₹${chaCharges} + Loading ₹${loadingCharges} × ${quantity}kg. Based on ${incotermText}.`;

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

    const sellerDuties = document.getElementById("sellerDuties");
    const buyerDuties = document.getElementById("buyerDuties");
    sellerDuties.innerHTML = "";
    buyerDuties.innerHTML = "";

    responsibilities[incotermKey].seller.forEach(item => {
      sellerDuties.innerHTML += `<li>${item}</li>`;
    });

    responsibilities[incotermKey].buyer.forEach(item => {
      buyerDuties.innerHTML += `<li>${item}</li>`;
    });

    document.getElementById("responsibilityBox").style.display = "block";
  }, 800);
}


  window.addEventListener("scroll", function () {
    const infoBox = document.querySelector(".reach-right .info-box");
    const rect = infoBox.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      infoBox.style.animation = "fadeInUp 1.2s ease both";
    }

  });




