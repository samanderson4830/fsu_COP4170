//*********************************************/
// modules used                               *
//*********************************************/
const db = require('../model/db_connection');

//*********************************************/
var mytotal = 0;
const total_orders = (id) => {
    /* get total number of orders by user_ID */
    var sql = '';
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

    var total = total_orders();
    var orders = new Array;
    var sql = '';
    db.start.query(sql, [id], (err, results) => {
        if (err) {

            throw err;

        } else {

            // populate the order array with database      
            for (var inx = 0; inx < total; ++inx) {


            }
        }
    });

    return orders;
}

module.exports = {
    get_orders
}