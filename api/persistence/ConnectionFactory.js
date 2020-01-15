var mysql = require('mysql');

function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'tiagoamp', 
        password: '2056', 
        database: 'flowdb'
    });
}

module.exports = function() {
    return createDBConnection;
}
