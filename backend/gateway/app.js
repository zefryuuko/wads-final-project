const express = require('express');
const httpProxy = require('express-http-proxy');
const request = require('request-promise-native');
const dotenv = require('dotenv/config');


const app = express();


app.get('/', async (req, res) => {
    res.json({
        "message": "API gateway is working"
    });
});

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`);
});