const express = require('express');
const proxy = require('express-http-proxy');
const request = require('request-promise-native');
const dotenv = require('dotenv/config');
const axios = require('axios');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Request logging
app.use(function (req, res, next) {
    console.log(`${req.method} | ${req.path}`);
    next()
});

// Allow CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Authentication Middleware
function authenticate(req, res, next) {
    if (req.method == 'OPTIONS') { res.status(200); return; }
    if (!req.headers.authorization) { res.status(403).json({ "message": "Unauthorized" }); return; }
    if (req.headers.authorization.split(" ").length !== 2) { res.status(403).json({ "message": "Invalid auth header" }); return; }
    
    const authData = req.headers.authorization.split(" ");
    sessionId = authData[0];
    universalId = authData[1]
    axios.get(`http://${process.env.AUTH_HOST}/session?sessionId=${sessionId}&universalId=${universalId}`).then(res => {
        next();
    }).catch(err => {
        console.log(err)
        res.status(403).json({ "message": "Unauthorized" });
    });
}

// Import Routes
app.use('/auth', proxy(process.env.AUTH_HOST));
app.use('/courses', authenticate, proxy(process.env.COURSES_HOST));
app.use('/users', authenticate, proxy(process.env.USER_HOST));
app.use('/classes', authenticate, proxy(process.env.CLASS_HOST));

app.get('/', async (req, res) => {
    res.json({
        "message": "API gateway is working"
    });
});

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`);
});