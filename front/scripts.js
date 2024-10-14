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
window.addEventListener('scroll', function() {
    const contactPopup = document.getElementById('contactPopup');
    if (window.scrollY > window.innerHeight / 2) {
        contactPopup.style.display = 'block';
    }
});

function closePopup() {
    document.getElementById('contactPopup').style.display = 'none';
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
