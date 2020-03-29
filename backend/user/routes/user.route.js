const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', (req, res) => {
    res.json({
        "message": "invalid request"
    });
});

router.post('/', (req, res) => {
    const user = new User ({
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });

    user.save()
        .then(data => {
            res.status(200).json({
                "message": "User added successfully."
            });
        })
        .catch(err => {
            res.status(500).json({
                "message": err
            });
        });
});

module.exports = router;