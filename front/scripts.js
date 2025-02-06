const foxnut = document.getElementById('foxnut');
let x = 0;
let y = 0;
let dx = 3;
let dy = 3;
let maxX = window.innerWidth - 50;
let maxY = window.innerHeight - 50;

function animate() {
    requestAnimationFrame(animate);
    
    // Update position
    x += dx;
    y += dy;
    
    // Wall collision detection
    if (x >= maxX || x <= 0) {
        dx = -dx * 0.95; // Reverse direction and lose some energy
        if (Math.abs(dx) < 0.5) dx = dx < 0 ? -0.5 : 0.5; // Set minimum threshold for dx
        x = x <= 0 ? 0 : maxX;
    }
    
    if (y >= maxY || y <= 0) {
        dy = -dy * 0.95; // Reverse direction and lose some energy
        if (Math.abs(dy) < 0.5) dy = dy < 0 ? -0.5 : 0.5; // Set minimum threshold for dy
        y = y <= 0 ? 0 : maxY;
    }
    
    // Apply gravity
    dy += 0.2;
    // Simulate terminal velocity
    const terminalVelocity = 10;
    if (dy > terminalVelocity) {
        dy = terminalVelocity;
    }
    
    // Update position
    foxnut.style.left = x + 'px';
    foxnut.style.top = y + 'px';
}

// Start animation
animate();



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
    let quantity = document.getElementById("quantity").value;
    let incotermSelect = document.getElementById("incoterm");
    let incotermRate = incotermSelect.value;
    let incotermText = incotermSelect.options[incotermSelect.selectedIndex].text;
    let countrySelect = document.getElementById("country");
    let exchangeRate = countrySelect.options[countrySelect.selectedIndex].getAttribute("data-rate");
   let totalPrice = (quantity * parseFloat(incotermRate)) * parseFloat(exchangeRate);


    
    document.getElementById("totalPrice").innerText = totalPrice.toFixed(2);
    document.getElementById("resultBox").style.display = "block";
    
    let explanation = "";
    switch (incotermText.split(" - ")[0]) {
        case "EXW": explanation = "Ex Works (EXW) means the buyer takes full responsibility for transport and costs after pickup."; break;
        case "FCA": explanation = "Free Carrier (FCA) means the seller delivers to the agreed carrier location, and the buyer covers further transport."; break;
        case "FOB": explanation = "Free On Board (FOB) means the seller handles delivery to the ship, while the buyer covers ocean freight and beyond."; break;
        case "CIF": explanation = "Cost, Insurance & Freight (CIF) includes cost, main transport, and insurance by the seller."; break;
        case "DDP": explanation = "Delivered Duty Paid (DDP) means the seller covers all costs, duties, and delivers directly to the buyer."; break;
        default: explanation = "The selected Incoterm determines which party covers transportation, insurance, and duties."; break;
    }
    document.getElementById("incotermExplanation").innerText = explanation;
}




