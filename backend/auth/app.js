const express = require('express');
const db = require('./utils/db');
const dotenv = require('dotenv/config');

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
app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`);
});