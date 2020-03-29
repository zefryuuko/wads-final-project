const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', async (req, res) => {
    res.json({
        "message": "invalid request"
    });
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.find({ id: req.params.id });
        res.status(200).send(user);
    } catch (err) {
        res.status(500).json({
            "message": err
        });
    }
});

router.post('/', async (req, res) => {
    const user = new User ({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });

    try {
        const savedUser = await user.save();
        res.status(200).json({
            "message": "User added successfully."
        });  
    } catch (err) {
        res.status(500).json({
            "message": err
        });
    }
});

module.exports = router;