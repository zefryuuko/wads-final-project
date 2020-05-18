const express = require('express');
const router = express.Router();
const account = require('../model/account.model');

router.get('/', async (req, res) => {
    res.json({
        "message": "Invalid request"
    });
});

router.post('/', async (req, res) => {
    const { emailAddress, password } = req.body;

    // Check if parameter(s) are missing
    if (!(emailAddress && password)) {
        res.status(400).json( {
            "message": "Missing parameter(s)"
        });
        return;
    }

    try {
        const status = await account.getUniversalId(emailAddress, password);
        if (!status) {
            res.status(401).json({
                "message": "Invalid email and/or password"
            });
        } else {
            res.status(200).json({
                "message": "Credentials are valid",
                "universalId": status
            });
        }
    } catch (err) {
        res.status(500).json( {
            "message": `${err}`
        });
    }
});

router.post('/register', async (req, res) => {
    const { emailAddress, password, universalId } = req.body;

    // Check if parameter(s) are missing
    if (!(emailAddress && password && universalId)) {
        res.status(400).json( {
            "message": "Missing parameter(s)"
        });
        return;
    }

    try {
        const result = await account.addCredentials(emailAddress, password, universalId);
        if (!result) {
            res.status(409).json({
                "message": `User with email ${emailAddress} or ID ${universalId} is already registered`
            });
        } else {
            res.json({
                "message": "User created successfully"
            });
        }
    } catch (err) {
        res.status(500).json( {
            "message": `${err}`
        });
    } 
});

router.patch('/:emailAddress', async (req, res) => {
    const { emailAddress, password, universalId } = req.body;
    const currentEmailAddress = req.params.emailAddress;
    
    // Check if parameter(s) are missing
    if (!(emailAddress || password || universalId)) {
        res.status(400).json( {
            "message": "Missing parameter(s)"
        });
        return;
    }

    try {
        const response = await account.updateCredentials(currentEmailAddress, emailAddress, password, universalId);
        res.json({
            "status": response
        })
    } catch(err) {
        res.status(500).json({
            "message": `${err}`
        });
    }
});

router.delete('/:universalId', async (req, res) => {
    try {
        const result = await account.deleteCredentials(req.params.universalId);
        if (!result) {
            res.status(404).json({
                "message": `User with email ${req.params.universalId} not found`
            });
        } else {
            res.json({
                "message": "User deleted successfully"
            });
        }
    } catch (err) {
        res.status(500).json( {
            "message": `${err}`
        });
    }
});

module.exports = router;