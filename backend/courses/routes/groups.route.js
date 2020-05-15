const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Group = require('../models/group.model');
const courseUtils = require('../utils/courseutils');

// GET group list
// --------------
// Body:
// - page  : page number to be shown
// - sortBy: sorting order of the result
// Returns: array of group objects
router.get('/', async (req, res) => {
    const { page, sortBy } = req.query;
    const itemsPerPage = 10;
    if (!page) page == 1;
    // TODO: implement sort by...
    const result = await Group.find({}, {_id: 0, __v: 0, courses: 0})
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
        let result = await Group.find(
            { prefix: req.params.prefix },
            { _id: 0, __v: 0, 'courses._id': 0, 'course.id': 0 }
        );

        result = await Group.aggregate(
            [{
                $project: {
                    courses: { 
                        $map: {
                            input: '$courses',
                            as: 'c',
                            in: {
                                name: '$$c.name',
                                _id: '$$c._id',
                                id: '$$c.id',
                                code: {
                                    $concat: [ "NPRX", { $substr: [ '$$c.code', "OLDP".length, -1 ] } ] 
                                }
                            }
                        }
                    } 
                }
            }]
        )

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
        // Update group
        const result = await Group.updateOne({prefix: req.params.prefix}, {$set: req.body});
        if (result.n == 0) {
            res.status(404).json({
                'message': 'Group not found'
            });
            return;
        }
        
        // Update courses that share the same prefix
        if (req.body.prefix) {
            await courseUtils.updatePrefixes(req.params.prefix, req.body.prefix);
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

        // Handle duplicate key error
        if (err && err.code === 11000) {
            const duplicateKey = Object.keys(err.keyValue)[0];
            res.status(409).json({
                'message': `${err.keyValue[duplicateKey]} already exists`,
                'key': `${err.keyValue[duplicateKey]}`
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
        // Delete the specified group
        const result = await Group.remove({prefix: req.params.prefix})
        if (result.deletedCount == 0) {
            res.status(404).json({
                'message': 'Group not found'
            });
            return;
        }

        // Delete classes under the same prefix
        await courseUtils.deleteCourses(req.params.prefix);

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