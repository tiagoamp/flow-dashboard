var mysql = require('mysql');

function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root', 
        password: 'admin', 
        database: 'flowdb'
    });
}

module.exports = function() {
    return createDBConnection;
}