const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/course.model');
const Group = require('../models/group.model');
const courseUtils = require('../utils/courseutils');
const groupUtils = require('../utils/grouputils');

router.get('/', async (req, res) => {
    res.json({
        'message': 'Courses service is active'
    });
});

// POST new course
// --------------
// Body: refer to /models/course.model.js
// Returns: Status of the request
router.post('/', async (req, res) => {
    try {
        // Validate fields that are not automatically validated
        // Validate group ID
        const groupPrefix = await groupUtils.getGroupPrefix(req.body.group);
        if (!groupPrefix) {
            res.status(400).json({
                'message': 'Group ID is not found'
            });
            return;
        }
        // Validate given prefix
        if (!req.body.code) {
            res.status(400).json({
                'message': 'Missing \'code\' parameter'
            });
            return;
        }
        if (!req.body.code.startsWith(groupPrefix)) {
            res.status(400).json({
                'message': 'Course code does not match group\'s prefix'
            });
            return;
        }
        // Validate if course with the same id exists
        if (await courseUtils.courseCodeExists(req.body.code)) {
            res.status(409).json({
                'message': `Course code '${req.body.code}' already exists`
            });
            return;
        }

        // Add data to database
        req.body._id = mongoose.Types.ObjectId();
        const course = new Course(req.body);
        const result = await course.save();

        res.json({
            'message': 'Course created successfully'
        });

    } catch (err) {
        res.status(500).json({
            'message': `${err}`
        });
    }

});

// GET course
// --------------
// Param:
// - courseCode: target course code (required)
// Returns: Course object at specified id
router.get('/:courseCode', async (req, res) => {
    try {
        // Check if course exists
        if (!await courseUtils.courseCodeExists(req.params.courseCode)) {
            res.status(404).json({
                'message': `Course with id ${req.params.courseCode} does not exist`
            });
            return;
        }

        // Get and send course data
        const result = await Course.findOne({code: req.params.courseCode}, {});
        res.json(result);
    } catch (err) {
        res.status(500).json({
            'message': `${err}`
        });
    }

});

// GET course with specified class
// -------------------------------
// Param:
// - courseCode: target course code (required)
// - classCode: target class code (required)
// Returns: Course object at specified id with only the class specified
router.get('/:courseCode/:classCode', async (req, res) => {
    try {
        // Check if class exists
        console.log(await courseUtils.classCodeExists(req.params.courseCode, req.params.classCode));
        if (!await courseUtils.classCodeExists(req.params.courseCode, req.params.classCode)) {
            res.status(404).json({
                'message': `Class with name ${req.params.classCode} does not exist on ${req.params.courseCode}`
            });
            return;
        }

        // Get and send course data
        const result = await Course.findOne({code: req.params.courseCode}, {__v: 0});
        res.json(result);
    } catch (err) {
        res.status(500).json({
            'message': `${err}`
        });
    }

});

// PATCH course
// --------------
// Param:
// - courseCode: target course code (required)
// Returns: Course object at specified id
// router.patch()

// DELETE course
// --------------
// Param:
// - courseCode: target course code (required)
// Returns: Status of the request

module.exports = router;