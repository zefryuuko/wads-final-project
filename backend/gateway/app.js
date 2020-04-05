const express = require('express');
const proxy = require('express-http-proxy');
const request = require('request-promise-native');
const dotenv = require('dotenv/config');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import Routes
app.use('/auth', proxy(process.env.AUTH_HOST));

app.get('/', async (req, res) => {
    res.json({
        "message": "API gateway is working",
        "version": "0.1"
    });
});

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`);
});