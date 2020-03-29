const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', async (req, res) => {
    res.status(400).json({
        "message": "invalid request"
    });
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.find({ id: req.params.id });
        
        if (user.length < 1) {
            res.status(404).json({
                "message": `User with id ${req.params.id} is not found.`
            });
        }
        else {
            res.status(200).send(user[0]);
        }
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