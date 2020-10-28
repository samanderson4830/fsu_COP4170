//*********************************************/
// modules used                               *
//*********************************************/
const db = require('../model/db_connection');

//*********************************************/
var mytotal = 0;
function total_orders (id) {
    
    var sql = 'call My_Database.NumberOfOrders(?, @total);';
    db.start.query(sql, [id], (err, results) => {

        if (err) {

            throw err;

        } else {

            mytotal = results[0][0].total;
            // log value for debuging
            console.log(">>>>>results: " + results[0][0].total);

        }
    });
 
    return mytotal;
}
function get_orders(id) {

    var total = total_orders(id);
    var orders = new Array;
    var sql = 'call My_Database.GetUserOrders(?);';
    db.start.query(sql, [id], (err, results) => {
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
  
                orders.push({
                    total_cost: results[0][inx].total_cost,
                    order_ID: results[0][inx].order_ID,
                    is_active: status,
                    date_time: results[0][inx].date_time,
                    placed_on: results[0][inx].placed_on
                });
            }
        }
    });

    return orders;
}

module.exports = {
    get_orders
}