document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const role = document.querySelector('select[name="role"]').value;

    const credentials = {
        username: username,
        password: password,
        role: role
    };

    // Simulating login and user validation (This would be handled by the back-end)
    if (credentials.username === 'admin' && credentials.password === 'admin123' && credentials.role === 'admin') {
        window.location.href = 'admin-dashboard.html';
    } else if (credentials.username === 'user' && credentials.password === 'user123' && credentials.role === 'user') {
        window.location.href = 'user-dashboard.html';
    } else {
        document.getElementById('login-message').textContent = 'Invalid login details. Please try again.';
    }
});
