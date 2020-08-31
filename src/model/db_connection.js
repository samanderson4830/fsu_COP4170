//*********************************************/
// modules used                               *
//*********************************************/
const mysql = require('mysql');

//*********************************************/
exports.start = mysql.createConnection ({
    host     : 'localhost',
    user     : 'root',
    password : 'Pass12345',
    database : 'My_Database'
});

