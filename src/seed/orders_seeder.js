//*********************************************/
// modules used                               *
//*********************************************/

/* files used */
const db = require('../model/db_connection');

//*********************************************/

/* get the get number of order in the db from a user */
var mytotal = 0;
function total_orders(userID) {

    var sql = 'call My_Database.NumberOfOrders(?, @total);';
    db.start.query(sql, [userID], (err, results) => {

        if (err) {

            throw err;

        } else {

            mytotal = results[0][0].total;
            // log value for debuging
            console.log(">>>>>total orders : " + results[0][0].total);

        }
    });

    return mytotal;
}

/* get the get number of order in the db */
var allTotal = 0;
function all_total_orders(userID) {

    var sql = 'call My_Database.NumberOfAllOrders(@total);';
    db.start.query(sql, (err, results) => {

        if (err) {

            throw err;

        } else {

            allTotal = results[0][0].total;
            // log value for debuging
            console.log(">>>>>total orders : " + results[0][0].total);

        }
    });

    return allTotal;
}

/* order info by userID */
function get_orders(userID) {

    var total = total_orders(userID);
    var orders = new Array;
    orders = [];
    var sql = 'call My_Database.GetUserOrders(\'' + userID + '\');';
    if (total > 0) {
        db.start.query(sql, (err, results) => {
            if (err) {

                throw err;

            } else {

                // populate the order array with database      
                var status;
                for (var inx = 0; inx < total; ++inx) {
                    /* output for order status */
                    if (results[0][inx].is_active === 1) {

                        status = "Active";
                    } else {

                        status = "Inactive";
                    }
                    /* parse output for dates */
                    var pick_up = results[0][inx].date_time;
                    var placed = results[0][inx].placed_on;

                    var temp = new String(pick_up);
                    pick_up = parse_date(temp);

                    var temp2 = new String(placed);
                    placed = parse_date(temp2);

                    orders.push({
                        total_cost: results[0][inx].total_cost,
                        order_ID: results[0][inx].order_ID,
                        is_active: status,
                        date_time: pick_up,
                        placed_on: placed
                    });
                }
            }
        });
    }
    return orders;
}

/* order info fro all users */
function get_all_orders (){
    var total = all_total_orders();
    var allOrders = new Array;
    allOrders = [];
    var sql = 'call My_Database.GetAllOrders();';
    if (total > 0) {
        db.start.query(sql, (err, results) => {
            if (err) {

                throw err;

            } else {

                // populate the order array with database      
                var status;
                for (var inx = 0; inx < total; ++inx) {
                    /* output for order status */
                    if (results[0][inx].is_active === 1) {

                        status = "Active";
                    } else {

                        status = "Inactive";
                    }
                    /* parse output for dates */
                    var pick_up = results[0][inx].date_time;
                    var placed = results[0][inx].placed_on;

                    var temp = new String(pick_up);
                    pick_up = parse_date(temp);

                    var temp2 = new String(placed);
                    placed = parse_date(temp2);

                    allOrders.push({
                        user_ID: results[0][inx].user_ID,
                        order_notes: results[0][inx].order_notes,
                        total_cost: results[0][inx].total_cost,
                        order_ID: results[0][inx].order_ID,
                        is_active: status,
                        date_time: pick_up,
                        placed_on: placed
                    });
                }
            }
        });
    }
    return allOrders;
}

function parse_date(str) {
    return str.substr(0, 15);
}

module.exports = {
    get_orders,
    get_all_orders
}