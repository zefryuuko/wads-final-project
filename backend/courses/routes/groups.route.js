const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Group = require('../models/group.model');

// GET group list
// --------------
// Body:
// - page  : page number to be shown
// - sortBy: sorting order of the result
// Returns: array of group objects
router.get('/', async (req, res) => {
    const { page, sortBy } = req.body;
    const itemsPerPage = 10;
    if (!page) page == 1;
    // TODO: implement sort by...
    const result = await Group.find({}, {__v: 0})
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage);
    res.json(result);
});

// POST new group
// --------------
// Body:
// - name  : name of the group (required, unique)
// - prefix: prefix for the course group (required, unique)
// Returns: Status of the request
router.post('/', async (req, res) => {
    try {
        const group = new Group({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            prefix: req.body.prefix,
        });
        const result = await group.save();
        res.json({
            'message': 'Group created successfully'
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

// GET group
// --------------
// Param:
// - id: the id of the group (required)
// Returns: Group object at specified id
router.get('/:prefix', async (req, res) => {
    try {
        const result = await Group.find({prefix: req.params.prefix}, {__v: 0});
        if (result.length == 0) {
            res.status(404).json({
                'message': 'Group not found'
            });
            return;
        }
        res.json(result);
    } catch (err) {
        // Handle invalid _id format
        if (err.name == 'CastError') {
            res.status(404).json({
                'message': 'Group not found'
            });
            return;
        }

        // Respond with internal server error
        res.status(500).json({
            'message': `${err}`
        });
    }
});

// PATCH group
// -----------
// Param:
// - id: id of the group (required)
// Body:
// - name: name of the group
// - prefix: prefix of the group
// Returns: Status of the request
router.patch('/:prefix', async (req, res) => {
    try {
        const result = await Group.updateOne({prefix: req.params.prefix}, {$set: req.body});
        if (result.n == 0) {
            res.status(404).json({
                'message': 'Group not found'
            });
            return;
        }

        res.json({
            'message': 'Group updated successfully'
        });
    } catch (err) {
        // Handle invalid _id format
        if (err.name == 'CastError') {
            res.status(404).json({
                'message': 'Group not found'
            });
            return;
        }

        // Respond with internal server error
        res.status(500).json({
            'message': `${err}`
        });
    }
});

// DELETE group
// -----------
// Param:
// - id: id of the group (required)
// Returns: Status of the request
router.delete('/:prefix', async (req, res) => {
    try {
        const result = await Group.remove({prefix: req.params.prefix})
        if (result.deletedCount == 0) {
            res.status(404).json({
                'message': 'Group not found'
            });
            return;
        }
        res.json({
            'message': 'Group deleted successfully'
        });
    } catch (err) {
        // Handle invalid _id format
        if (err.name == 'CastError') {
            res.status(404).json({
                'message': 'Group not found'
            });
            return;
        }

        // Respond with internal server error
        res.status(500).json({
            'message': `${err}`
        });
    }
});

module.exports = router;