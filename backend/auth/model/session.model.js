const db = require('../db');
const { uuid } = require('uuidv4');
const dotenv = require('dotenv/config');

class Session {
    async addSession(accountId, rememberMe) {
        try {
            const sessionId = uuid();
            const result = await db.query(
                'INSERT INTO sessions (session_id, account_id, expiry_time, remember_me) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR), ?)',
                [
                    sessionId,
                    accountId,
                    !rememberMe ? 0 : 1
                ]
            );
            if (result.length > 0) return sessionId;
            else return undefined;
        } catch (err) {
            throw err;
        }
    }

    async sessionExists(sessionId) {
        try {
            const result = await db.query(
                'SELECT session_id FROM sessions WHERE session_id = ? AND (NOW() < expiry_time OR remember_me = 1)',
                [
                    sessionId
                ]
            );
            if (result[0].length == 0) {
                await this.revokeSession(sessionId);
                return false;
            }
            else {
                db.query(
                    'UPDATE sessions SET expiry_time = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE session_id = ?',
                    [
                        sessionId
                    ]
                );
                return true;
            }
        } catch (err) {
            throw err;
        }
    }

    async revokeSession(sessionId) {
        try {
            const result = await db.query(
                'DELETE FROM sessions WHERE session_id = ?',
                [
                    sessionId
                ]
            );
            if (result[0].affectedRows > 0) return true;
            else return false;
        } catch (err) {
            throw err;
        }
    }

    async revokeSessions(accountId) {
        try {
            const result = await db.query(
                'DELETE FROM sessions WHERE account_id = ?',
                [
                    accountId
                ]
            );
            if (result[0].affectedRows > 0) return true;
            else return false;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new Session();