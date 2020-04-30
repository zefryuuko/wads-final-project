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

// Temporarily allow access from localhost
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Import Routes
app.use('/auth', proxy(process.env.AUTH_HOST));
app.use('/courses', proxy(process.env.COURSES_HOST));
app.use('/users', proxy(process.env.USER_HOST));
app.use('/classes', proxy(process.env.CLASS_HOST));

app.get('/', async (req, res) => {
    res.json({
        "message": "API gateway is working"
    });
});

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`);
});