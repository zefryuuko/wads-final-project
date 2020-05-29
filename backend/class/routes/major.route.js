const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Major = require('../models/major.model');

router.get('/', async (req, res) => {
    const itemsLimit = 10;
    const itemsToSkip = req.query.page ? req.query.page - 1 : 0;
    try {
        const major = await Major.find(
            {  },
            { __v: 0, linkedSemesters: 0 },
            { skip: itemsToSkip, limit: itemsLimit }
        );
        res.status(200).json(major);
    } catch (err) {
        res.status(500).json({
            "message": err
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const major = await Major.find(
            { _id: req.params.id },
            { __v: 0 }
        );
        
        if (major.length < 1) {
            res.status(404).json({
                "message": `Major with id ${req.params.id} is not found.`
            });
        }
        else {
            res.status(200).send(major[0]);
        }
    } catch (err) {
        if (err.name == "CastError") {
            res.status(404).json({
                "message": `Major with id ${req.params.id} is not found.`
            });
            return;
        }

        res.status(500).json({
            "message": err
        });
    }
});

router.post('/', async (req, res) => {
    try {
        req.body._id = mongoose.Types.ObjectId();
        const major = new Major (req.body);
        const result = await major.save();

        res.status(200).json({
            "message": "Major added successfully."
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
        const result = await Major.updateOne({_id: req.params.id}, {$set: req.body});
        if (result.n == 0) {
            res.status(404).json({
                'message': 'Major not found'
            });
            return;
        }

        res.json({
            'message': 'Major updated successfully'
        });
    } catch (err) {
        if (err.name == "CastError") {
            res.status(404).json({
                "message": `Major with id ${req.params.id} is not found.`
            });
            return;
        }

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
        // Check if major has linked semesters
        const major = await Major.findOne({ _id: req.params.id });

        if (!major) res.status(404).json({ "message": `Major with id ${req.params.id} is not found.` });
        if (major.linkedSemesters && major.linkedSemesters.length > 0) {
            res.status(400).json({ "message": `Cannot remove major with semester data.` });
            return;
        }

        const removedMajor = await Major.remove({ _id: req.params.id });
        
        if (removedMajor.deletedCount < 1) {
            res.status(404).json({
                "message": `Major with id ${req.params.id} is not found.`
            });
        }
        else {
            res.status(200).json({
                "message": "Major deleted successfully."
            });
        }
    } catch (err) {
        if (err.name == "CastError") {
            res.status(404).json({
                "message": `Major with id ${req.params.id} is not found.`
            });
            return;
        }

        res.status(500).json({
            "message": err
        });
    }
});

module.exports = router;