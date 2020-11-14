//*********************************************/
// modules used                               *
//*********************************************/

/* files used */
const db = require('../model/db_connection');

//*********************************************/
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

function get_orders(userID) {

    var total = total_orders(userID);
    var orders = new Array;
    var sql = 'call My_Database.GetUserOrders(\'' + userID + '\');';
    db.start.query(sql,  (err, results) => {
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
                pick_up =  parse_date(temp);
                
                var temp2 = new String(placed);
                placed =  parse_date(temp2);
                
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

    return orders;
}

function parse_date(str) {
    return str.substr(0, 15);
}

module.exports = {
    get_orders
}