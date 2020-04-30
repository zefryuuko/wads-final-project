const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Major = require('../models/major.model');
const Semester = require('../models/semester.model');

router.get('/', async (req, res) => {
    // TODO: Add pagination
    res.status(400).json({
        "message": "invalid request"
    });
});

router.get('/:id', async (req, res) => {
    try {
        const semester = await Semester.find(
            { _id: req.params.id },
            { __v: 0 }
        );
        
        if (semester.length < 1) {
            res.status(404).json({
                "message": `Semester with id ${req.params.id} is not found.`
            });
        }
        else {
            res.status(200).send(semester[0]);
        }
    } catch (err) {
        if (err.name == "CastError") {
            res.status(404).json({
                "message": `Semester with id ${req.params.id} is not found.`
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
        // Check if passed majorId exists
        const major = await Major.find(
            { _id: req.body.majorId },
            { __v: 0 }
        );
        
        if (major.length < 1) {
            res.status(404).json({
                "message": `Major with id ${req.body.majorId} does not exist`
            });
            return;
        }

        // Add semester data
        req.body._id = mongoose.Types.ObjectId();
        const semester = new Semester (req.body);
        const sResult = await semester.save();

        // Add semester reference to majors
        const mResult = await Major.updateOne({ _id: req.body.majorId }, { $push: { linkedSemesters: req.body._id } });

        res.status(200).json({
            "message": "Semester added successfully."
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
        
        // Handle invalid object ids
        if (err.name == "CastError") {
            res.status(404).json({
                "message": `Major with id ${req.body.majorId} does not exist`
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
        const result = await Semester.updateOne({_id: req.params.id}, {$set: req.body});
        if (result.n == 0) {
            res.status(404).json({
                'message': 'Semester not found'
            });
            return;
        }

        res.json({
            'message': 'Semester updated successfully'
        });
    } catch (err) {
        if (err.name == "CastError") {
            res.status(404).json({
                "message": `Semester with id ${req.params.id} is not found.`
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
        // Get majorId of the semester that will be removed soon
        const semester = await Semester.find(
            { _id: req.params.id },
            { majorId: 1 }
        );
        
        // Remove reference to the semester from major
        const mResult = await Major.updateOne({ _id: semester[0].majorId }, { $pull: { linkedSemesters: req.params.id } });
        
        // Remove semester data
        const removedSemester = await Semester.deleteOne({ _id: req.params.id });
        
        if (removedSemester.deletedCount < 1) {
            res.status(404).json({
                "message": `Semester with id ${req.params.id} is not found.`
            });
        }
        else {
            res.status(200).json({
                "message": "Semester deleted successfully."
            });
        }
    } catch (err) {
        if (err.name == "CastError") {
            res.status(404).json({
                "message": `Semester with id ${req.params.id} is not found.`
            });
            return;
        }

        res.status(500).json({
            "message": err
        });
    }
});

module.exports = router;