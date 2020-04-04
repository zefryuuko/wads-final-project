const express = require('express');
const db = require('./utils/db');

// Express configuration
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import Routes
app.use('/account', require('./routes/account.route'));
app.use('/session', require('./routes/session.route'));

// Root route
app.get('/', (req, res) => {
    res.json({"message": "Auth service is active"});
});

// Listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});