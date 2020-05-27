const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/', async (req, res) => {
    res.json({
        message: "Schedule service is active"
    })
});