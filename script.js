// Floating Form Toggle
const formToggle = document.getElementById('form-toggle');
const closeForm = document.getElementById('close-form');
const floatingForm = document.getElementById('floating-form');

formToggle.addEventListener('click', () => {
    floatingForm.style.display = 'block';
});

closeForm.addEventListener('click', () => {
    floatingForm.style.display = 'none';
});

// Handling Floating Form Submission
document.getElementById('floating-contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.querySelector('#floating-contact-form input[name="name"]').value;
    const email = document.querySelector('#floating-contact-form input[name="email"]').value;
    const message = document.querySelector('#floating-contact-form textarea[name="message"]').value;

    // Simulating form submission
    setTimeout(() => {
        document.getElementById('floating-form-message').textContent = 'Thank you, ' + name + '! We will get in touch with you soon.';
        document.getElementById('floating-contact-form').reset();
    }, 500);
});
