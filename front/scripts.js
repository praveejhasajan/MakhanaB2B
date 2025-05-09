const foxnut = document.getElementById('foxnut');
let x = 0, y = 0;
let dx = 3, dy = 3;
let angle = 0;
let maxX = window.innerWidth - 50;
let maxY = window.innerHeight - 50;

function animate() {
    requestAnimationFrame(animate);
    
    // Update position
    x += dx;
    y += dy;
    angle += 5; // Rotate element
    
    // Wall collision detection
    if (x >= maxX || x <= 0) {
        dx = -dx * (0.9 + Math.random() * 0.1); // Reverse direction with random energy loss
        x = x <= 0 ? 0 : maxX;
        bounceEffect();
    }
    
    if (y >= maxY || y <= 0) {
        dy = -dy * (0.9 + Math.random() * 0.1); // Reverse direction with random energy loss
        y = y <= 0 ? 0 : maxY;
        bounceEffect();
    }
    
    // Apply gravity
    dy += 0.2;
    const terminalVelocity = 10;
    if (dy > terminalVelocity) dy = terminalVelocity;

    // Apply transformation
    foxnut.style.left = x + 'px';
    foxnut.style.top = y + 'px';
    foxnut.style.transform = `rotate(${angle}deg) scale(1.1)`;
    
    // Apply shadow effect
    let shadowX = dx * 2;
    let shadowY = dy * 2;
    foxnut.style.boxShadow = `${shadowX}px ${shadowY}px 10px rgba(0, 0, 0, 0.5)`;
}

// Bounce squish effect
function bounceEffect() {
    foxnut.style.transform = 'scale(1.2)';
    setTimeout(() => {
        foxnut.style.transform = 'scale(1)';
    }, 100);
}

// Start animation
animate();

function createMakhana() {
    const foxnut = document.createElement("div");
    foxnut.classList.add("foxnut");

    let startX = Math.random() * (window.innerWidth - 50); // Ensure it starts within screen width
    let speed = Math.random() * 3 + 2; // Random falling speed
    let rotation = Math.random() * 360; // Initial rotation
    let size = Math.random() * 20 + 30; // Random size between 30-50px

    foxnut.style.left = `${startX}px`;
    foxnut.style.width = `${size}px`;
    foxnut.style.height = `${size}px`;
    foxnut.style.transform = `rotate(${rotation}deg)`;

    document.body.appendChild(foxnut);

    let yPos = -50;
    function fall() {
        yPos += speed;
        rotation += 2; // Rotate while falling
        foxnut.style.top = `${yPos}px`;
        foxnut.style.transform = `rotate(${rotation}deg)`;

        // Adjust boundary for smaller screens
        const fallAreaHeight = window.innerHeight > 500 ? window.innerHeight : window.innerHeight * 0.8;

        if (yPos < fallAreaHeight - 50) { // Ensure it stays within adjusted screen height
            requestAnimationFrame(fall);
        } else {
            foxnut.remove(); // Remove after reaching the bottom
        } 
    }
    fall();
}

function makhanaRain() {
    if (window.innerWidth > 500) { // Only create makhana if screen width is greater than 500px
        setInterval(() => {
            createMakhana();
        }, 200); // Generate new makhana every 200ms
    } else {
        setInterval(() => {
            createMakhana();
        }, 400); // Generate new makhana every 400ms for smaller screens
    }
}

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
    let quantity = parseFloat(document.getElementById("quantity").value);
    let incotermSelect = document.getElementById("incoterm");
    let incotermRate = parseFloat(incotermSelect.value);
    let countrySelect = document.getElementById("country");
    let exchangeRate = parseFloat(countrySelect.options[countrySelect.selectedIndex].getAttribute("data-rate"));

    // Base price per kg in INR
    let basePricePerKg = 1500;

    // Ensure valid inputs
    if (isNaN(quantity) || isNaN(incotermRate) || isNaN(exchangeRate)) {
        alert("Please select valid inputs.");
        return;
    }

    // Calculate total price in INR
    let totalPriceINR = (quantity * basePricePerKg) + (basePricePerKg*incotermRate);

    // Convert to selected country's currency
    let totalPriceForeign = totalPriceINR * exchangeRate;

    // Get the selected country currency symbol
    let currencySymbol = countrySelect.value;

    // Display the result
    document.getElementById("totalPrice").innerText = totalPriceForeign.toFixed(2) + " " + currencySymbol;
    document.getElementById("resultBox").style.display = "block";

    // Explanation for the Incoterm
    let incotermText = incotermSelect.options[incotermSelect.selectedIndex].text.split(" - ")[0];
    let explanation = "";
    switch (incotermText) {
        case "EXW": explanation = "Ex Works (EXW) means the buyer takes full responsibility for transport and costs after pickup."; break;
        case "FCA": explanation = "Free Carrier (FCA) means the seller delivers to the agreed carrier location, and the buyer covers further transport."; break;
        case "FOB": explanation = "Free On Board (FOB) means the seller handles delivery to the ship, while the buyer covers ocean freight and beyond."; break;
        case "CIF": explanation = "Cost, Insurance & Freight (CIF) includes cost, main transport, and insurance by the seller."; break;
        case "DDP": explanation = "Delivered Duty Paid (DDP) means the seller covers all costs, duties, and delivers directly to the buyer."; break;
        default: explanation = "The selected Incoterm determines which party covers transportation, insurance, and duties."; break;
    }
    document.getElementById("incotermExplanation").innerText = explanation;
}




