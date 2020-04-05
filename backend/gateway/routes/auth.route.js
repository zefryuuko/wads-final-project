const express = require('express');
const proxy = require('express-http-proxy');
const router = express.Router();

router.get('/', async (req, res) => {
    
    res.json({
        "message": "Invalid request"
    });
});

module.exports = router;