const mysql = require('mysql');
require('dotenv/config');

var pool = mysql.createPool({
    host            : process.env.MYSQL_HOST,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASS,
    database        : process.env.MYSQL_DB,
    connectionLimit : process.env.MYSQL_CONNECTION_LIMIT
});

module.exports = pool;