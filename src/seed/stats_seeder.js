//*********************************************/
// modules used                               *
//*********************************************/
const db = require('../model/db_connection');

//*********************************************/
let myTotalActive = 0;
function total_active_orders () {
    let sql = 'call My_Database.NumberOfAllActive(@total);';
    db.start.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            myTotalActive = results[0][0].total;
        }
    });
    return myTotalActive;
}

let myTotalInactive = 0;
function total_inactive_orders () {
    let sql = 'call My_Database.NumberOfAllInactive(@total);';
    db.start.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            myTotalInactive = results[0][0].total;
        }
    });
    return myTotalInactive;
}
//call My_Database.TotalNumberOfUsers(@total);
let myTotalUsers = 0;
function total_users () {
    let sql = 'call My_Database.TotalNumberOfUsers(@total);';
    db.start.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            myTotalUsers = results[0][0].total;
        }
    });
    return myTotalUsers;
}

let myTotalRevenue = 0;
function total_revenue () {
    let sql = 'call My_Database.GetTotalRevenue(@total);';
    db.start.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            if (results[0][0].total === null) {
                myTotalRevenue = 0;
            } else {
                myTotalRevenue = results[0][0].total;
            }
        }
    });
    return myTotalRevenue.toFixed(2);;
}

let myTotalPotentialRevenue = 0;
function total_potential_revenue () {
    let sql = 'call My_Database.GetTotalPotentialRevenue(@total);';
    db.start.query(sql, (err, results) => {
        if (err) {
            throw err;
        } else {
            if (results[0][0].total === null) {
                myTotalPotentialRevenue = 0;
            } else {
                myTotalPotentialRevenue = results[0][0].total;
            }
        }
    });
    return myTotalPotentialRevenue.toFixed(2);;
}

module.exports = {
    total_active_orders,
    total_inactive_orders,
    total_users,
    total_revenue,
    total_potential_revenue
}