//*********************************************/
// modules used                               *
//*********************************************/
const mysql = require('mysql');

//*********************************************/
function my_conn() {
    let config = {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PWD,
        database: process.env.DATABASE_NAME
    };
    return config;
}

let start = mysql.createConnection(my_conn());

// init database
let pool = mysql.createPool(my_conn());

// fetch data
function RunQuery(sql, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            ShowErrors(err);
        }
        conn.query(sql, function (err, rows, fields) {
            if (err) {
                ShowErrors(err);
            }
            conn.release();
            callback(rows);
        });
    });
}

//Throw errors
function ShowErrors(err) {
    throw err;
}

module.exports = {
    RunQuery: RunQuery,
    start
};