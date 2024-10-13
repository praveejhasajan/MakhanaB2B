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
