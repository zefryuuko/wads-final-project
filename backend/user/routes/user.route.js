const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const axios = require('axios');
const User = require('../models/user.model');
const Student = require('../models/student.model');
const Lecturer = require('../models/lecturer.model');
const Staff = require('../models/staff.model');

router.get('/', async (req, res) => {
    try {
        const { staff, lecturer, student } = req.query;
        
        const users = await User.find(
            (staff || lecturer || student) ? {
                'accounts.accountType': staff ? 'staff' : lecturer ? 'lecturer' : student ? 'student' : { $regex: new RegExp('', 'i') }
            } : {},
            { __v: 0, _id: 0, accounts: 0, permittedDomains: 0 }
        );
        res.send(users);
    } catch (err) {
        res.status(500).json({
            "message": err
        });
    }
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

router.post('/:id/reset-password', async (req, res) => {
    try {
        const user = await User.findOne(
            { id: req.params.id },
            { __v: 0 }
        );
        
        if (!user) {
            res.status(404).json({
                "message": `User with id ${req.params.id} is not found.`
            });
        }
        else {
            await axios.patch(`http://${process.env.AUTH_HOST}/account/${user.primaryEmail}`, {
                password: `${user.firstName.toLowerCase().split(" ")[0]}${req.params.id}`
            }); 

            res.status(200).json({
                "message": "Password changed successfully."
            });
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

        // Add user to auth db
        await axios.post(`http://${process.env.AUTH_HOST}/account/register`, {
            emailAddress: req.body.primaryEmail,
            password: `${req.body.firstName.toLowerCase().split(" ")[0]}${req.body.id}`,
            universalId: req.body.id
        });

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
            // Delete user credentials
            await axios.delete(`http://${process.env.AUTH_HOST}/account/${req.params.id}`);
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


// CRUD for user "accounts"

router.post('/:id/student', async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findOne({ id: req.params.id }, { __v: 0 });
        if (!user) {
            res.status(404).json({
                "message": `User with id ${req.params.id} does not exist`
            });
            return;
        }

        // Check if the request body contains the required parameters
        const { name } = req.body;
        if (!name) {
            res.status(400).status({
                "message": "Missing `name` parameter"
            });
            return;
        }

        // Check if the user already have the same account name
        const accountExists = await User.findOne({ id: req.params.id, 'accounts.name': req.body.name }, { __v: 0 });
        if (accountExists) {
            res.status(404).json({
                "message": `User with id ${req.params.id} already has an account named ${req.body.name}`
            });
            return;
        }

        // Create new student account
        req.body._id = mongoose.Types.ObjectId();
        const newStudent = new Student(req.body);
        const newAccount = {
            name: req.body.name,
            accountType: "student",
            metadata: newStudent
        }
        const result = await User.findOneAndUpdate(
            { id: { $eq: req.params.id } },
            { $push: { accounts: newAccount } },
            { new: true } 
        )

        res.json({
            "message": "User added successfully.",
            "id": req.body._id
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

        // Respond with internal server error
        res.status(500).json({
            'message': `${err}`
        });
    }
});

router.post('/:id/lecturer', async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findOne({ id: req.params.id }, { __v: 0 });
        if (!user) {
            res.status(404).json({
                "message": `User with id ${req.params.id} does not exist`
            });
            return;
        }

        // Check if the request body contains the required parameters
        const { name } = req.body;
        if (!name) {
            res.status(400).status({
                "message": "Missing `name` parameter"
            });
            return;
        }

        // Check if the user already have the same account name
        const accountExists = await User.findOne({ id: req.params.id, 'accounts.name': req.body.name }, { __v: 0 });
        if (accountExists) {
            res.status(404).json({
                "message": `User with id ${req.params.id} already has an account named ${req.body.name}`
            });
            return;
        }

        // Create new student account
        req.body._id = mongoose.Types.ObjectId();
        const newLecturer = new Lecturer(req.body);
        const newAccount = {
            name: req.body.name,
            accountType: "lecturer",
            metadata: newLecturer
        }
        const result = await User.findOneAndUpdate(
            { id: { $eq: req.params.id } },
            { $push: { accounts: newAccount } },
            { new: true } 
        )

        res.json({
            "message": "User added successfully.",
            "id": req.body._id
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

        // Respond with internal server error
        res.status(500).json({
            'message': `${err}`
        });
    }
});

router.post('/:id/staff', async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findOne({ id: req.params.id }, { __v: 0 });
        if (!user) {
            res.status(404).json({
                "message": `User with id ${req.params.id} does not exist`
            });
            return;
        }

        // Check if the request body contains the required parameters
        const { name } = req.body;
        if (!name) {
            res.status(400).status({
                "message": "Missing `name` parameter"
            });
            return;
        }

        // Check if the user already have the same account name
        const accountExists = await User.findOne({ id: req.params.id, 'accounts.name': req.body.name }, { __v: 0 });
        if (accountExists) {
            res.status(404).json({
                "message": `User with id ${req.params.id} already has an account named ${req.body.name}`
            });
            return;
        }

        // Create new student account
        req.body._id = mongoose.Types.ObjectId();
        const newStaff = new Staff(req.body);
        const newAccount = {
            name: req.body.name,
            accountType: "staff",
            metadata: newStaff
        }
        const result = await User.findOneAndUpdate(
            { id: { $eq: req.params.id } },
            { $push: { accounts: newAccount } },
            { new: true } 
        )

        res.json({
            "message": "User added successfully.",
            "id": req.body._id
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

        // Respond with internal server error
        res.status(500).json({
            'message': `${err}`
        });
    }
});

router.delete('/:userId/:accountId', async (req, res) => {
    try {
        const removedUser = await User.updateOne(
            { id: { $eq: req.params.userId }, 'accounts._id': { $eq: req.params.accountId } },
            { $pull: { accounts: { _id: req.params.accountId } } },
            { new: true }
        );

        if (removedUser.nModified < 1) {
            res.status(404).json({
                "message": `User account not found.`
            });
        }
        else {
            res.status(200).json({
                "message": "Account deleted successfully."
            });
        }
    } catch (err) {
        res.status(500).json({
            "message": err
        });
    }
});

module.exports = router;