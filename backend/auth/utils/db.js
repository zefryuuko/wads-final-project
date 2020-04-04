const mysql = require('mysql2/promise');
require('dotenv/config');

var pool = mysql.createPool({
    host            : process.env.MYSQL_HOST,
    port            : process.env.MYSQL_PORT,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASS,
    database        : process.env.MYSQL_DB,
    connectionLimit : process.env.MYSQL_CONNECTION_LIMIT
});

module.exports = pool;