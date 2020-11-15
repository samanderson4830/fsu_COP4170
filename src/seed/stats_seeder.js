//*********************************************/
// modules used                               *
//*********************************************/

/* files used */
const db = require('../model/db_connection');

//*********************************************/
var mytotalActive = 0;
const total_active_orders = () => {

    var sql = 'call My_Database.NumberOfAllActive(@total);';
    db.start.query(sql, (err, results) => {

        if (err) {

            throw err;

        } else {

            mytotalActive = results[0][0].total;
        }
    });

    return mytotalActive;
}

var mytotalInactive = 0;
const total_inactive_orders  = () => {

    var sql = 'call My_Database.NumberOfAllInactive(@total);';
    db.start.query(sql, (err, results) => {

        if (err) {

            throw err;

        } else {

            mytotalInactive = results[0][0].total;
        }
    });

    return mytotalInactive;
}
//call My_Database.TotalNumberOfUsers(@total);
var myTotalUsers = 0;
const total_users  = () => {

    var sql = 'call My_Database.TotalNumberOfUsers(@total);';
    db.start.query(sql, (err, results) => {

        if (err) {

            throw err;

        } else {

            myTotalUsers = results[0][0].total;
        }
    });

    return myTotalUsers;
}

var myTotalRevenue = 0;
const total_revenue  = () => {

    var sql = 'call My_Database.GetTotalRevenue(@total);';
    db.start.query(sql, (err, results) => {

        if (err) {

            throw err;

        } else {

            myTotalRevenue = results[0][0].total;
        }
    });

    return myTotalRevenue;
}

var myTotalPotentialRevenue = 0;
const total_potential_revenue  = () => {

    var sql = 'call My_Database.GetTotalPotentialRevenue(@total);';
    db.start.query(sql, (err, results) => {

        if (err) {

            throw err;

        } else {

            myTotalPotentialRevenue = results[0][0].total;
        }
    });

    return myTotalPotentialRevenue;
}


module.exports = {
    total_active_orders,
    total_inactive_orders,
    total_users,
    total_revenue,
    total_potential_revenue
}