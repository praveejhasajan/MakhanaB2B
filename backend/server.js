const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Simulated user database
const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' }
];

// Login Route
app.post('/login', (req, res) => {
    const { username, password, role } = req.body;

    // Find user by username and password
    const user = users.find(u => u.username === username && u.password === password && u.role === role);

    if (user) {
        res.status(200).send({ message: 'Login successful', role: user.role });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});