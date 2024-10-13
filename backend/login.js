document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const role = document.querySelector('select[name="role"]').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
            role: role
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful') {
            if (data.role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else if (data.role === 'user') {
                window.location.href = 'user-dashboard.html';
            }
        } else {
            document.getElementById('login-message').textContent = 'Invalid login details. Please try again.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});