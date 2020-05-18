const db = require('../utils/db');
const dotenv = require('dotenv/config');

class Account {
    async addCredentials(emailAddress, password, universalId) {
        try {
            const result = await db.query(
                'INSERT INTO accounts (email_address, password, universal_id) VALUES (?, SHA2(?, 512), ?)',
                [
                    emailAddress,
                    password + process.env.CRYPTO_SALT,
                    universalId
                ]
            )
            if (result[0].affectedRows == 1) return true;
            else return false;
        } catch (err) {
            if (err.code == 'ER_DUP_ENTRY') return false;
            throw err;
        }
    }

    async getAccountId(emailAddress, password) {
        try {
            const result = await db.query(
                'SELECT account_id FROM accounts WHERE email_address = ? AND password = SHA2(?, 512)',
                [
                    emailAddress,
                    password + process.env.CRYPTO_SALT
                ]
            );
            if (result[0].length == 0) return undefined;
            else return result[0][0].account_id;
        } catch (err) {
            throw err;
        }
    }

    async getUniversalId(emailAddress, password) {
        try {
            const result = await db.query(
                'SELECT universal_id FROM accounts WHERE email_address = ? AND password = SHA2(?, 512)',
                [
                    emailAddress,
                    password + process.env.CRYPTO_SALT
                ]
            );
            if (result[0].length == 0) return undefined;
            else return result[0][0].universal_id;
        } catch (err) {
            throw err;
        }
    }

    async updateCredentials(currentEmailAddress, emailAddress, password, universalId) {
        try {
            var conn = await db.getConnection();
            await conn.beginTransaction();
            if (password) {
                const result = await conn.query(
                    'UPDATE accounts SET password = SHA2(?, 512) WHERE email_address = ?',
                    [
                        password + process.env.CRYPTO_SALT,
                        currentEmailAddress
                    ]
                );
                if (result[0].affectedRows == 0) {
                    await conn.rollback();
                    return false;
                }
            }
            if (emailAddress) {
                const result = await conn.query(
                    'UPDATE accounts SET email_address = ? WHERE email_address = ?',
                    [
                        emailAddress,
                        currentEmailAddress
                    ]
                );
                if (result[0].affectedRows == 0) {
                    await conn.rollback();
                    return false;
                }
            }

            if (universalId) {
                const result = await conn.query(
                    'UPDATE accounts SET universal_id = ? WHERE email_address = ?',
                    [
                        universalId,
                        currentEmailAddress
                    ]
                );
                if (result[0].affectedRows == 0) {
                    await conn.rollback();
                    return false;
                }
            }

            await conn.commit();
            return true;
        } catch (err) {
            await conn.rollback();
            throw err;
        }
    }

    async deleteCredentials(universalId) {
        try {
            const result = await db.query(
                'DELETE FROM accounts WHERE universal_id = ?',
                [
                    universalId
                ]
            );
            if (result[0].affectedRows == 1) return true;
            else return false;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = new Account();