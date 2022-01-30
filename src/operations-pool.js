const mysql = require('mysql');

function insertAccountPool (pool, data, callback) {
    let insertQuery = "INSERT INTO account (user_id, user_email, user_pass) VALUES (?, ?, ?)";
    let query = mysql.format(insertQuery, [data.id, data.email, data.pass]);
    pool.getConnection(function (err, connection) {
        if(err) throw err;
        connection.query(query, function(err, result) {
            if(err) throw console.log("error en sentencia");
            callback(result);
            connection.release();
        });
    });
}

function readAccountsPool(pool, callback) {
    pool.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query("SELECT * FROM account", function (err, result) {
            if (err) throw err;
            callback(result);
            connection.end;
        });
    });
}

module.exports = { insertAccountPool, readAccountsPool };