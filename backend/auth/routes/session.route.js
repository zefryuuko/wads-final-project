const express = require('express');
const router = express.Router();
const account = require('../model/account.model');
const session = require('../model/session.model');

router.get('/', async (req, res) => {
    const { sessionId, universalId } = req.body;

    if (!(sessionId && universalId)) {
        res.status(400).json({
            "message": "Missing parameter(s)"
        });
        return;
    }

    try {
        const isValidSession = await session.sessionExists(sessionId, universalId);
        if (!isValidSession) {
            res.status(403).json( {
                "message": "Invalid session"
            });
            return;
        }
        res.json({
            "message": "Session is valid"
        });
    } catch (err) {
        res.status(500).json( {
            "message": `${err}`
        });
    }
});

router.post('/', async (req, res) => {
    const { emailAddress, password, rememberMe } = req.body;

    if (!(emailAddress && password)) {
        res.status(400).json({
            "message": "Missing parameter(s)"
        });
        return;
    }
    
    try {
        const accountId = await account.getAccountId(emailAddress, password);
        if (!accountId) {
            res.status(401).json({
                "message": "Invalid email and/or password"
            });
            return;
        }
        const sessionId = await session.addSession(accountId, rememberMe);
        const universalId = await account.getUniversalId(emailAddress, password);
        res.json({
            "message": "Logged in successfully",
            "sessionId": sessionId,
            "universalId": universalId
        });
    } catch (err) {
        res.status(500).json( {
            "message": `${err}`
        });
    }
});

router.delete('/', async (req, res) => {
    const { sessionId, revokeAll } = req.body;

    if (!sessionId) {
        res.status(400).json({
            "message": "Missing parameter(s)"
        });
        return;
    }

    try {
        const isRevoked = revokeAll ? await session.revokeSessions(sessionId) : await session.revokeSession(sessionId);
        if (!isRevoked) {
            res.status(404).json({
                "message": "Session not found"
            });
            return;
        }
        res.json({
            "message": "Session(s) revoked successfully"
        });
    } catch (err) {
        res.status(500).json( {
            "message": `${err}`
        });
    }
});

module.exports = router;