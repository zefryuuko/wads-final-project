const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');
const Major = require('../models/major.model');
const Semester = require('../models/semester.model');
const Class = require('../models/class.model')
const Student = require('../models/student.model');
const Lecturer = require('../models/lecturer.model');
const SharedResource = require('../models/sharedresource.model');
const Assignment = require('../models/assignment.model');
const coursesServiceEndpoint = process.env.COURSES_HOST;

router.get('/', async (req, res) => {
    // TODO: Add pagination
    res.status(400).json({
        "message": "invalid request"
    });
});

//
//  Semester routes
//

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

router.get('/searchStudentById/:id', async (req, res) => {
    try {
        const semesters = await Semester.find(
            { 'classes.students.universalId': req.params.id },
            {}
        );

        // Filter out results
        semesters.forEach(semester => {
            semester.classes = semester.classes.filter(semesterClass => {
                let isCurrentClassHasSearchedStudent = false
                semesterClass.students.forEach(student => {
                    if (student.universalId == req.params.id)
                        isCurrentClassHasSearchedStudent = true;
                })
                return isCurrentClassHasSearchedStudent;
            })
        });

        
        if (semesters.length < 1) {
            res.status(404).json({
                "message": `User with id ${req.params.id} is not registered in any courses`
            });
        }
        else {
            res.status(200).send(semesters);
        }
    } catch (err) {
        res.status(500).json({
            "message": `${err}`
        });
    }
});

router.get('/searchLecturerById/:id', async (req, res) => {
    try {
        const semesters = await Semester.find(
            { 'classes.lecturers.universalId': req.params.id },
            {}
        );

        // Filter out results
        semesters.forEach(semester => {
            semester.classes = semester.classes.filter(semesterClass => {
                let isCurrentClassHasSearchedLecturer = false
                semesterClass.lecturers.forEach(lecturer => {
                    if (lecturer.universalId == req.params.id)
                        isCurrentClassHasSearchedLecturer = true;
                })
                return isCurrentClassHasSearchedLecturer;
            })
        });

        
        if (semesters.length < 1) {
            res.status(404).json({
                "message": `User with id ${req.params.id} is not registered in any courses`
            });
        }
        else {
            res.status(200).send(semesters);
        }
    } catch (err) {
        res.status(500).json({
            "message": `${err}`
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
        const mResult = await Major.updateOne(
            { _id: semester[0].majorId }, 
            { $pull: { linkedSemesters: req.params.id } }
            );
        
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

//
//  Class routes
//

router.get('/:id/:classCode/:courseCode', async (req, res) => {
    try {
        const semester = await Semester.findOne(
            {
                _id: req.params.id,
                'classes.classCode': { $eq: req.params.classCode },
                'classes.courseCode': { $eq: req.params.courseCode }
            },
            // { 'classes.$': 1 }
        );

        if (!semester) {
            res.status(404).json({
                "message": 'One or more parameters are not found'
            });
        }
        else {
            semester.classes.forEach((element) => {
                if (element.classCode == req.params.classCode && element.courseCode == req.params.courseCode) {
                    res.status(200).send(element);
                }
            })
        }
    } catch (err) {
        if (err.name == "CastError") {
            res.status(404).json({
                "message": `Semester with id ${req.params.id} is not found.`
            });
            return;
        }

        res.status(500).json({
            "message": `${err}`
        });
    }
});

router.post('/:id', async (req, res) => {
    try {
        // Check if semester id exists
        const semester = await Semester.find(
            { _id: req.params.id },
            { __v: 0 }
        );
        
        if (semester.length < 1) {
            res.status(404).json({
                "message": `Semester with id ${req.body.majorId} does not exist`
            });
            return;
        }

        // TODO: Validate course code
        // Check if passed course and class type combination exists
        const courseMetadataUrl = `${coursesServiceEndpoint}/course/${req.body.courseCode}/${req.body.classType}`;
        const courseMetadata = await axios.get(courseMetadataUrl);

        // Prevent multiple instance of classes with the same class and course code
        const courseExists = await Semester.findOne(
            {
                _id: req.params.id,
                'classes.classCode': { $eq: req.body.classCode },
                'classes.courseCode': { $eq: req.body.courseCode }
            },
            { 'classes.$': 1 }
        );

        if (courseExists) {
            res.status(409).json({
                "message": `Class with code '${req.body.classCode}' and course '${req.body.courseCode}' already exists in this semester.`
            });
            return;
        }

        // Add class data
        req.body._id = mongoose.Types.ObjectId();
        req.body.metadata = courseMetadata.data;
        const newClass = new Class(req.body);
        const result = await Semester.updateOne(
            { _id: req.params.id }, 
            { $push: { classes: newClass } }
        );

        res.status(200).json({
            "message": "Class added successfully.",
            "classId": req.body._id
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
                "message": `Class with id ${req.body.majorId} does not exist`
            });
            return;
        }

        // Handle invalid course code and class type combination
        if (err.response && (err.response.status == 404)) {
            res.status(404).json({
                "message": `Course code and class type combination does not exist`
            });
            return;
        }

        // Respond with internal server error
        res.status(500).json({
            'message': `${err}`
        });
    }
});

router.delete('/:id/:classCode/:courseCode/shared-resources/:resourceId', async (req, res) => {
    try {
        // Pull the new data into array
        const semester = await Semester.findOneAndUpdate(
            {
                _id: req.params.id,
                classes: {
                    $elemMatch: {
                        classCode: { $eq: req.params.classCode },
                        courseCode: { $eq: req.params.courseCode }
                    }
                }
            },
            { 
                $pull: {
                    'classes.$.sharedResources': {
                        _id: mongoose.Types.ObjectId(req.params.resourceId)
                    }
                }
            },
            // { new: true, upsert: false }
        );

        if (!semester) {
            res.status(404).json({
                "message": 'One or more parameters are not found'
            });
        }
        else {
            res.status(200).json({
                "message": "Resource removed successfully"
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
            "message": `${err}`
        });
    }
});

router.post('/:id/:classCode/:courseCode/shared-resources', async (req, res) => {
    try {
        // Create and validate request body
        const { dateAdded, addedBy, name, url } = req.body;
        if (!(dateAdded && name && url && addedBy)) {
            res.status(400).json({
                "message": "One or more request body is missing. Required: dateAdded, addedBy, name, url",
                "got": req.body
            })
            return;
        }

        if (!(addedBy.name && addedBy.universalId)) {
            res.status(400).json({
                "message": "One or more fields for addedBy is missing. Required: universalId, name",
                "got": addedBy
            });
            return;
        }

        req.body._id = mongoose.Types.ObjectId();
        const newResource = new SharedResource(req.body);

        // Push the new data into array
        const semester = await Semester.findOneAndUpdate(
            {
                _id: req.params.id,
                classes: {
                    $elemMatch: {
                        classCode: { $eq: req.params.classCode },
                        courseCode: { $eq: req.params.courseCode }
                    }
                }
            },
            { 
                $push: {
                    'classes.$.sharedResources': newResource
                }
            },
            { new: true }
        );

        if (!semester) {
            res.status(404).json({
                "message": 'One or more parameters are not found'
            });
        }
        else {
            res.status(200).json({
                "message": "Resource added successfully"
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
            "message": `${err}`
        });
    }
});

router.delete('/:id/:classCode/:courseCode/assignments/:resourceId', async (req, res) => {
    try {
        // Pull the new data into array
        const semester = await Semester.findOneAndUpdate(
            {
                _id: req.params.id,
                classes: {
                    $elemMatch: {
                        classCode: { $eq: req.params.classCode },
                        courseCode: { $eq: req.params.courseCode }
                    }
                }
            },
            { 
                $pull: {
                    'classes.$.assignments': {
                        _id: mongoose.Types.ObjectId(req.params.resourceId)
                    }
                }
            },
            // { new: true, upsert: false }
        );

        if (!semester) {
            res.status(404).json({
                "message": 'One or more parameters are not found'
            });
        }
        else {
            res.status(200).json({
                "message": "Assignment removed successfully"
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
            "message": `${err}`
        });
    }
});

router.post('/:id/:classCode/:courseCode/assignments/:assignmentId/submit', async (req, res) => {
    try {
        // Validate request body
        const { universalId, name, submittedAt, fileURL } = req.body;
        if (!(universalId && name && submittedAt && fileURL)) {
            res.status(400).json({
                "message": "Missing required fields. Required: universalId, name, submittedAt, fileURL",
                "got": req.body
            })
            return;
        }

        req.body._id = mongoose.Types.ObjectId();

        // Push the new data into array
        const semester = await Semester.findOneAndUpdate(
            {
                _id: req.params.id,
                classes: {
                    $elemMatch: {
                        classCode: { $eq: req.params.classCode },
                        courseCode: { $eq: req.params.courseCode },
                        assignments: {
                            $elemMatch: {
                                _id: req.params.assignmentId
                            }
                        }
                    }
                }
            },
            {
                $push: {
                    'classes.$.assignments.$[outer].submissions': req.body
                }
            },
            { 
                new: true, 
                arrayFilters: [{
                    "outer._id": mongoose.Types.ObjectId(req.params.assignmentId)
                }] 
            }
        );

        if (!semester) {
            res.status(404).json({
                "message": 'One or more parameters are not found'
            });
        }
        else {
            res.status(200).json({
                "message": "Assignment removed successfully"
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
            "message": `${err}`
        });
    }
});

router.post('/:id/:classCode/:courseCode/assignments', async (req, res) => {
    try {
        // Create and validate request body
        const { dateAdded, submissionDeadline, name, resourceURL } = req.body;
        if (!(dateAdded && name && resourceURL && submissionDeadline)) {
            res.status(400).json({
                "message": "One or more request body is missing. Required: dateAdded, submissionDeadline, name, resourceURL",
                "got": req.body
            })
            return;
        }

        req.body._id = mongoose.Types.ObjectId();
        const newAssignment = new Assignment(req.body);

        // Push the new data into array
        const semester = await Semester.findOneAndUpdate(
            {
                _id: req.params.id,
                classes: {
                    $elemMatch: {
                        classCode: { $eq: req.params.classCode },
                        courseCode: { $eq: req.params.courseCode }
                    }
                }
            },
            { 
                $push: {
                    'classes.$.assignments': newAssignment
                }
            },
            { new: true }
        );

        if (!semester) {
            res.status(404).json({
                "message": 'One or more parameters are not found'
            });
        }
        else {
            res.status(200).json({
                "message": "Assignment added successfully"
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
            "message": `${err}`
        });
    }
});

router.patch('/:id/:classCode/:courseCode', async (req, res) => {
    try {
        // Prevent multiple instance of classes with the same class and course code
        const newClassCode = req.body.classCode ? req.body.classCode : req.query.classCode;
        const newCourseCode = req.body.courseCode ? req.body.courseCode : req.query.courseCode;
        if (req.params.classCode != newClassCode && req.params.courseCode != newCourseCode) {
            const courseExists = await Semester.findOne(
                {
                    _id: req.params.id,
                    'classes.classCode': { $eq: req.body.classCode },
                    'classes.courseCode': { $eq: req.body.courseCode }
                },
                { 'classes.$': 1 }
            );
    
            if (courseExists) {
                res.status(409).json({
                    "message": `Class with code '${req.body.classCode}' and course '${req.body.courseCode}' already exists in this semester.`
                });
                return;
            }
        }

        // Update class
        const result = await Semester.findOneAndUpdate(
            { 
                _id: req.params.id, 
                classes: {
                    $elemMatch: {
                        'classCode': { $eq: req.params.classCode },
                        'courseCode': { $eq: req.params.courseCode }
                    }
                }
            }, 
            { $setOnInsert: { 'classes.$': req.body } }                             // TODO: Fix this crap
        );

        // Update Students
        if (req.body.students) {
            const newStudentBody = req.body.students.map(element => {
                if (!element._id) element._id = mongoose.Types.ObjectId();
                element = new Student(element);
                return element;
            });
            await Semester.updateOne(
                { 
                    _id: { $eq: req.params.id }, 
                    classes: {
                        $elemMatch: {
                            'classCode': { $eq: req.params.classCode }, 
                            'courseCode': { $eq: req.params.courseCode } 
                        }
                    }
                }, 
                { $set: { 'classes.$.students': newStudentBody } },
                { new: true, upsert: true }
            );
        }

        // Update Lecturers
        if (req.body.lecturers) {
            const newLecturerBody = req.body.lecturers.map(element => {
                if (!element._id) element._id = mongoose.Types.ObjectId();
                element = new Lecturer(element);
                return element;
            });
            await Semester.updateOne(
                { 
                    _id: { $eq: req.params.id }, 
                    classes: {
                        $elemMatch: {
                            'classCode': { $eq: req.params.classCode }, 
                            'courseCode': { $eq: req.params.courseCode } 
                        }
                    }
                }, 
                { $set: { 'classes.$.lecturers': newLecturerBody } },
                { new: true, upsert: true }
            );
        }

        if (!result) {
            res.status(404).json({
                'message': 'One or more parameters are not found'
            });
            return;
        }

        res.json({
            'message': 'Class updated successfully'
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

router.delete('/:id/:classCode/:courseCode', async (req, res) => {
    try {
        // Remove class data
        const removedSemester = await Semester.findOneAndUpdate(
            { 
                _id: req.params.id, 
                'classes.classCode': { $eq: req.params.classCode }, 
                'classes.courseCode': { $eq: req.params.courseCode } 
            }, 
            { 
                $pull: {
                    'classes': {
                        'classCode': req.params.classCode, 
                        'courseCode': req.params.courseCode
                    }
                } 
            },
            { new: true }
        );

        if (!removedSemester) {
            res.status(404).json({
                "message": `One or more parameters are not found.`
            });
        }
        else {
            res.status(200).json({
                "message": "Class deleted successfully."
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
            "message": `${err}`
        });
    }
});

module.exports = router;