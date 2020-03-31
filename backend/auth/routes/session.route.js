const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    res.json({
        "message": "Invalid request"
    });
});

router.post('/', (req, res) => {
    res.json({
        "message": "Received POST on /session",
        "postData": req.body
    });
});

module.exports = router;