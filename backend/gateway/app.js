const express = require('express');
const proxy = require('express-http-proxy');
const request = require('request-promise-native');
const dotenv = require('dotenv/config');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Request logging
app.use(function (req, res, next) {
    console.log(`${req.method} | ${req.path}`);
    next()
});

// Import Routes
app.use('/auth', proxy(process.env.AUTH_HOST));
app.use('/courses', proxy(process.env.COURSES_HOST));
app.use('/users', proxy(process.env.USER_HOST));

app.get('/', async (req, res) => {
    res.json({
        "message": "API gateway is working"
    });
});

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`);
});