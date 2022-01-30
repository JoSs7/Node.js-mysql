const mysql = require('mysql');

function insertAccount (connection, data, callback) {
    let insertQuery = "INSERT INTO account (user_id, user_email, user_pass) VALUES (?, ?, ?)";
    let query = mysql.format(insertQuery, [data.id, data.email, data.pass]);
    connection.query(query, function(err, result) {
        if(err) throw console.log("error en sentencia");
        callback(result);
        connection.end();
    });
}

function readAccounts(connection, callback) {
    connection.query('SELECT * FROM account', function (err, result) {
        if (err) throw console.log("error en sentencia");
        callback(result);
        connection.end();
    });
}

module.exports = { insertAccount, readAccounts };