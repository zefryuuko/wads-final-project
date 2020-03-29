const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        "message": "invalid request"
    });
});

module.exports = router;