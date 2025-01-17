// JavaScript file to add interactive behavior
console.log("Welcome to SnackPro!");

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




