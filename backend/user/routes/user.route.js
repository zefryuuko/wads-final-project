const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');

router.get('/', async (req, res) => {
    res.status(400).json({
        "message": "invalid request"
    });
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.find(
            { id: req.params.id },
            { __v: 0 }
        );
        
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
    try {
        req.body._id = mongoose.Types.ObjectId();
        const user = new User (req.body);
        const result = await user.save();

        res.status(200).json({
            "message": "User added successfully."
        });  
    } catch (err) {
        // Handle missing parameters
        if (err.name == 'ValidationError') {
            const missingKey = Object.keys(err.errors)[0];
            res.status(400).json({
                'message': `Missing '${missingKey}' parameter`,
                'details': `${err}`
            });
            return;
        }

        // Handle duplicate key error
        if (err && err.code === 11000) {
            const duplicateKey = Object.keys(err.keyValue)[0];
            res.status(409).json({
                'message': `${err.keyValue[duplicateKey]} already exists`,
            });
            return;
        }

        // Respond with internal server error
        res.status(500).json({
            'message': `${err}`
        });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        // Update group
        const result = await User.updateOne({id: req.params.id}, {$set: req.body});
        if (result.n == 0) {
            res.status(404).json({
                'message': 'User not found'
            });
            return;
        }

        res.json({
            'message': 'User updated successfully'
        });
    } catch (err) {
        // Respond with internal server error
        res.status(500).json({
            'message': `${err}`
        });
    }
});

router.delete('/', async (req, res) => {
    res.status(400).json({
        "message": "invalid request"
    });
});

router.delete('/:id', async (req, res) => {
    try {
        const removedUser = await User.remove({ id: req.params.id });
        
        if (removedUser.deletedCount < 1) {
            res.status(404).json({
                "message": `User with id ${req.params.id} is not found.`
            });
        }
        else {
            res.status(200).json({
                "message": "User deleted successfully."
            });
        }
    } catch (err) {
        res.status(500).json({
            "message": err
        });
    }
});

module.exports = router;